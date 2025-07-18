from fastapi import APIRouter, Query
from typing import Optional
from app.services.job_service import get_all_jobs

router = APIRouter()

@router.get('/')
def list_jobs(
    remote: Optional[bool] = Query(None, description="Filter by remote jobs"),
    min_fit_score: Optional[int] = Query(None, description="Minimum fit score")
):
    jobs = get_all_jobs(remote=remote, min_fit_score=min_fit_score)
    return {"jobs": jobs}