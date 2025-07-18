from app.core.supabase_client import supabase

def get_all_jobs(
    remote: bool = None,
    min_fit_score: int = None,
    tech_stack: str = None,
    limit: int = 10,
    offset: int = 0,
    sort_by: str = "fit_score",
    sort_order: str = "desc"
):
    query = supabase.table("jobs").select("*").eq("processed", True)

    if remote is not None:
        query = query.eq("remote", remote)

    if min_fit_score is not None:
        query = query.gte("fit_score", min_fit_score)

    if tech_stack:
        query = query.contains("tech_stack", [tech_stack])

    # Sorting
    if sort_by:
        ascending = True if sort_order.lower() == "asc" else False
        query = query.order(sort_by, desc=not ascending)

    # Pagination
    query = query.range(offset, offset + limit - 1)

    response = query.execute()
    return response.data