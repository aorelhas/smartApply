from fastapi import APIRouter
from app.services.scraper_service import scrape_all_sources

router = APIRouter()

@router.post("/all")
def trigger_all_sources_scraping():
    results = scrape_all_sources()
    return {"message": "Scraping completed for all resources", "details": results}