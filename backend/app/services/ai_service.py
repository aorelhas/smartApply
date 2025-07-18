import json, os, openai
from datetime import datetime

from app.core.supabase_client import supabase

openai.api_key = os.getenv("OPENAI_API_KEY")

if not openai.api_key:
    raise EnvironmentError("OPENAI_API_KEY not set in the environment variables.")

def get_unprocessed_jobs():
    response = supabase.table("jobs").select("*").eq("processed", False).execute()
    return response.data

def generate_job_analysis(description, user_profile=None):
     # MOCKED response for development
    return json.dumps({
        "tech_stack": ["Python", "FastAPI", "PostgreSQL"],
        "seniority": "Mid-level",
        "remote": True,
        "fit_score": 85,
        "pitch": "You are a great fit given your backend expertise."
    })

    # prompt = f"""
    # Analyze the following job description and return:
    # 1. Tech Stack (as an array)
    # 2. Seniority level
    # 3. Is the job remote? (true/false)
    # 4. Fit score between 0-100 based on the following user skills: {user_profile or 'No user profile provided'}
    # 5. A 2-line personalized pitch.

    # Job Description:
    # {description}

    # Respond in JSON with keys: tech_stack, seniority, remote, fit_score, pitch
    # """

    # response = openai.ChatCompletion.create(
    #     model="gpt-4o",
    #     messages=[{"role": "user", "content": prompt}]
    # )

    # return response.choices[0].message.content

def process_jobs():
    jobs = get_unprocessed_jobs()
    processed_jobs = []

    for job in jobs:
        try:
            ai_response = generate_job_analysis(job["description"])
            ai_data = json.loads(ai_response)

            # Update job record
            supabase.table("jobs").update({
                "tech_stack": ai_data.get("tech_stack"),
                "seniority": ai_data.get("seniority"),
                "remote": ai_data.get("remote"),
                "fit_score": ai_data.get("fit_score"),
                "pitch": ai_data.get("pitch"),
                "processed": True,
                "scraped_at": job.get("scraped_at", datetime.now().isoformat())
            }).eq("id", job["id"]).execute()

            processed_jobs.append(job["id"])
        except Exception as e:
            print(f"Failed processing job {job['id']}: {e}")

    return processed_jobs