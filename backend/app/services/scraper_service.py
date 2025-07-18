import requests
import os
import uuid

from datetime import datetime, timezone
from app.core.supabase_client import supabase

REMOTEOK_API_URL = os.getenv("REMOTEOK_API_URL") or "https://remoteok.io/api"

# Define relevant keywords in job titles
desired_keywords = [
    "Developer", "Engineer", "Software Engineer", "Backend Developer", "Frontend Developer", 
    "Full Stack", "Python Developer", "Node.js Developer", "React Developer", "Next.js Developer",
    "Solutions Architect", "Software Architect", "Tech Lead", "Technical Lead", 
    "Data Engineer", "Platform Engineer", "Infrastructure Engineer", 
    "DevOps Engineer", "Cloud Engineer", "Site Reliability Engineer", "SRE", 
    "API Developer", "Microservices", "System Engineer"
]

def scrape_remoteok():
    response = requests.get(REMOTEOK_API_URL, headers={"User-Agent": "Mozilla/5.0"})
    if response.status_code != 200:
        raise Exception("Failed to fetch data from RemoteOK")
    
    jobs = response.json()[1:]  # Skip metadata
    jobs_scraped = 0

    for job in jobs:
        title = job.get("position") or job.get("title") or ""
        tags = job.get("tags", [])

        # Filter by relevant job titles
        if not any(keyword.lower() in title.lower() for keyword in desired_keywords):
            continue

        job_data = {
            "id": str(uuid.uuid4()),
            "title": title,
            "company": job.get("company"),
            "location": job.get("location") or "Remote",
            "remote": True,
            "seniority": None,
            "tech_stack": tags,
            "description": job.get("description"),
            "fit_score": None,
            "pitch": None,
            "source": "RemoteOK",
            "url": job.get("url"),
            "scraped_at": datetime.now(timezone.utc).isoformat(),
            "processed": False,
            "created_at": datetime.now(timezone.utc).isoformat(),
        }

        existing = supabase.table("jobs").select("id").eq("url", job_data["url"]).execute()
        if existing.data:
            continue

        supabase.table("jobs").insert(job_data).execute()
        jobs_scraped += 1

    return {"source": "RemoteOK", "jobs_scraped": jobs_scraped}

# todo: create multiple functions for each scrape


def scrape_all_sources():
    results = []
    results.append(scrape_remoteok())

    return results