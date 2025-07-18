from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.routers import health, scraping, ai, jobs
from app.core import config, logging_config

logger = logging_config.logger

app = FastAPI(
    title=config.APP_TITLE,
    description=config.APP_DESCRIPTION,
    version=config.APP_VERSION
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.ALLOWED_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(health.router, prefix="/api/v1/health", tags=["Health"])
app.include_router(scraping.router, prefix="/api/v1/scrape", tags=["Scraping"])
app.include_router(ai.router, prefix="/api/v1/ai", tags=["AI Processing"])
app.include_router(jobs.router, prefix="/api/v1/jobs", tags=["Jobs"])

# Exception Handler
@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled error: {exc}")
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "Internal Server Error"}
    )