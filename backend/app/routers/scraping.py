from fastapi import APIRouter
from app.services.scraper_service import scrape_jobs

router = APIRouter()

@router.post("/")
def trigger_scraping():
    jobs = scrape_jobs()
    return {"message": "Scraping completed", "jobs_found": len(jobs)}