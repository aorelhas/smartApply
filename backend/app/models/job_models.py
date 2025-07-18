from typing import List, Optional
from pydantic import BaseModel

class JobResponse(BaseModel):
    id: str
    title: str
    company: str
    location: Optional[str]
    remote: Optional[bool]
    seniority: Optional[str]
    tech_stack: Optional[List[str]]
    description: Optional[str]
    fit_score: Optional[int]
    pitch: Optional[str]
    source: Optional[str]
    url: Optional[str]
    scraped_at: Optional[str]
    processed: Optional[bool]
    created_at: Optional[str]