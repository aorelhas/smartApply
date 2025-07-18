from datetime import datetime, timezone
from app.core.supabase_client import supabase
import uuid

def scrape_jobs():
    # Mocked data for now

    jobs = [
        {
            "title": "Backend Developer",
            "company": "Acme Corp",
            "location": "Remote",
            "remote": True,
            "seniority": "Mid-level",
            "tech_stack": ["Python", "FastAPI", "PostgreSQL"],
            "description": "Build and maintain backend services...",
            "source": "MockSource",
            "url": "https://example.com/job/backend-developer",
            "scraped_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "title": "Frontend Engineer",
            "company": "NextGen UI",
            "location": "Remote",
            "remote": True,
            "seniority": "Senior",
            "tech_stack": ["React", "Next.js", "Tailwind CSS"],
            "description": "Develop engaging user interfaces...",
            "source": "MockSource",
            "url": "https://example.com/job/frontend-engineer",
            "scraped_at": datetime.now(timezone.utc).isoformat()
        }
    ]

    # Insert each job into Supabase
    for job in jobs:
        supabase.table("jobs").insert({
            "id": str(uuid.uuid4()),
            **job,
            "processed": False
        }).execute()

    return jobs
