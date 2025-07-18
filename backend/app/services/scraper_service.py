import requests
from datetime import datetime, timezone
from app.core.supabase_client import supabase
import uuid

REMOTEOK_API_URL = "https://remoteok.io/api"

def scrape_remoteok():
    response = requests.get(REMOTEOK_API_URL, headers={"User-Agent": "Mozilla/5.0"})
    if response.status_code != 200:
        raise Exception("Failed to fetch data from RemoteOK")
    
    jobs = response.json()[1:] # In order to skip metadata

    for job in jobs:
        job_data = {
            "id": str(uuid.uuid4()),
            "title": job.get("position") or job.get("title"),
            "company": job.get("company"),
            "location": job.get("location") or "Remote",
            "remote": True,
            "seniority": None,
            "tech_stack": job.get("tags", []),
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

    return {"source": "RemoteOK", "jobs_scraped": len(jobs)}

# todo: create multiple functions for each scrape


def scrape_all_sources():
    results = []
    results.append(scrape_remoteok())

    return results