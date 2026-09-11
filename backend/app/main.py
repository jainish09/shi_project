from fastapi import FastAPI

app = FastAPI(
    title="Thermal Sentinel AI",
    description="AI-powered GIS platform for thermal incident detection and risk assessment.",
    version="0.1.0",
)


@app.get("/")
def root():
    return {
        "message": "Thermal Sentinel AI Backend is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }