from fastapi import APIRouter
from app.services.ai_service import process_jobs

router = APIRouter()

@router.post("/process")
def processed_jobs_endpoint():
    processed = process_jobs()
    return {"message": "AI processing completed", "jobs_processed": len(processed)}