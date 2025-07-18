from fastapi import APIRouter, Query
from typing import Optional, List
from app.services.job_service import get_all_jobs
from app.models.job_models import JobResponse

router = APIRouter()

@router.get("/", response_model=List[JobResponse])
def list_jobs(
    remote: Optional[bool] = Query(None, description="Filter by remote jobs"),
    min_fit_score: Optional[int] = Query(None, description="Minimum fit score"),
    tech_stack: Optional[str] = Query(None, description="Filter by tech stack keyword"),
    limit: int = Query(10, ge=1, le=100, description="Limit number of jobs returned"),
    offset: int = Query(0, ge=0, description="Offset for pagination"),
    sort_by: Optional[str] = Query("fit_score", description="Field to sort by"),
    sort_order: Optional[str] = Query("desc", description="Sort order: asc or desc"),
):
    jobs = get_all_jobs(
        remote=remote,
        min_fit_score=min_fit_score,
        tech_stack=tech_stack,
        limit=limit,
        offset=offset,
        sort_by=sort_by,
        sort_order=sort_order
    )
    return jobs