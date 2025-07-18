import os
from dotenv import load_dotenv

load_dotenv()

APP_TITLE = "SmartApply Backend API"
APP_DESCRIPTION = "Backend API for SmartApply — your personal job search assistant."
APP_VERSION = "0.1.0"

ALLOWED_ORIGINS = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")