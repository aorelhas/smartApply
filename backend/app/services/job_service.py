from app.core.supabase_client import supabase

def get_all_jobs(remote: bool = None, min_fit_score: int = None):
    query = supabase.table("jobs").select("*").eq("processed", True)

    if remote is not None:
        query = query.eq("remote", remote)

    if min_fit_score is not None:
        query = query.gte("fit_score", min_fit_score)

    response = query.execute()
    return response.data