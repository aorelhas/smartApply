import json
import os
from datetime import datetime, timezone
from groq import Groq
from app.core.supabase_client import supabase

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

USER_PROFILE_ID = os.getenv("USER_PROFILE_ID")

def get_user_profile():
    response = supabase.table("user_profile").select("*").eq("id", USER_PROFILE_ID).single().execute()
    return response.data

def get_unprocessed_jobs():
    response = supabase.table("jobs").select("*").eq("processed", False).execute()
    return response.data

def generate_job_analysis(description, user_profile):
    profile_summary = f"""
    Skills: {', '.join(user_profile.get('skills', []))}
    Languages: {', '.join(user_profile.get('languages', []))}
    Preferred Seniority: {', '.join(user_profile.get('preferred_seniority', []))}
    Preferred Tech Stacks: {', '.join(user_profile.get('preferred_tech_stacks', []))}
    Preferred Methodologies: {', '.join(user_profile.get('preferred_methodologies', []))}
    Remote Only: {user_profile.get('remote_only', False)}
    """

    prompt = f"""
    Analyze the following job description and return a JSON response with:
    - tech_stack: string[]
    - seniority: string
    - remote: boolean
    - fit_score: integer between 0-100 (how well this job matches the user profile)
    - pitch: A 2-line personalized pitch for this job

    USER PROFILE:
    {profile_summary}

    JOB DESCRIPTION:
    {description}

    Only respond in JSON format with keys: tech_stack, seniority, remote, fit_score, pitch
    """

    response = client.chat.completions.create(
        model="llama3-70b-8192",
        messages=[{"role": "user", "content": prompt}]
    )

    content = response.choices[0].message.content
    return content

def process_jobs():
    user_profile = get_user_profile()
    if not user_profile:
        raise Exception("User profile not found!")

    jobs = get_unprocessed_jobs()
    processed_jobs = []

    for job in jobs:
        try:
            ai_response = generate_job_analysis(job["description"], user_profile)
            ai_data = json.loads(ai_response)

            supabase.table("jobs").update({
                "tech_stack": ai_data.get("tech_stack"),
                "seniority": ai_data.get("seniority"),
                "remote": ai_data.get("remote"),
                "fit_score": ai_data.get("fit_score"),
                "pitch": ai_data.get("pitch"),
                "processed": True,
                "scraped_at": job.get("scraped_at", datetime.now(timezone.utc).isoformat())
            }).eq("id", job["id"]).execute()

            processed_jobs.append(job["id"])
            print(f"Processed job {job['id']} with AI data: {ai_data}")

        except Exception as e:
            print(f"Failed processing job {job['id']}: {e}")

    return processed_jobs