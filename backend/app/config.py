import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Thermal Sentinel AI API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./thermal_sentinel.db")
    
    # External APIs
    FIRMS_API_KEY: str = os.getenv("FIRMS_API_KEY", "")
    USE_MOCK_DATA: bool = os.getenv("USE_MOCK_DATA", "true").lower() == "true"
    
    class Config:
        case_sensitive = True

settings = Settings()