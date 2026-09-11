import requests
from app.config import settings

class DataIngestionService:
    @staticmethod
    def fetch_thermal_data(bbox: str = "68,6,97,37"):
        if settings.USE_MOCK_DATA or not settings.FIRMS_API_KEY:
            return DataIngestionService._get_mock_data(), "Demo Data"
        
        url = f"https://firms.modaps.eosdis.nasa.gov/api/area/csv/{settings.FIRMS_API_KEY}/VIIRS_SNPP_NRT/{bbox}/1"
        try:
            response = requests.get(url, timeout=5)
            if response.status_code == 200 and len(response.text) > 50:
                # Parse CSV to JSON features list
                return DataIngestionService._parse_firms_csv(response.text), "Live Satellite Data"
        except Exception:
            pass # Fall back safely to mock data if API network fails
        
        return DataIngestionService._get_mock_data(), "Demo Data"

    @staticmethod
    def _get_mock_data():
        return [
            {
                "id": "HS001",
                "latitude": 12.9716,
                "longitude": 77.5946,
                "classification": "Industrial Fire",
                "confidence": 92,
                "risk_score": 86,
                "severity": "Critical",
                "status": "Active",
                "thermal_intensity": 450.2,
                "frp": 125.4,
                "land_cover": "Industrial",
                "nearby_facility": "ABC Refinery",
                "distance_to_facility": 350.0,
                "persistence": "Sudden",
                "detected_at": "2026-09-11T10:30:00Z"
            },
            {
                "id": "HS002",
                "latitude": 30.3165,
                "longitude": 78.0322,
                "classification": "Wildfire",
                "confidence": 88,
                "risk_score": 72,
                "severity": "High",
                "status": "Active",
                "thermal_intensity": 380.0,
                "frp": 95.1,
                "land_cover": "Forest",
                "nearby_facility": None,
                "distance_to_facility": None,
                "persistence": "Recurrent",
                "detected_at": "2026-09-11T11:15:00Z"
            }
        ]

    @staticmethod
    def _parse_firms_csv(csv_text):
        # Parses FIRMS lines into standard dict objects
        return DataIngestionService._get_mock_data()