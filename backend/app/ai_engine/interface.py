class AIEngineInterface:
    """Wrapper interface to communicate with Backend Member 2's AI classifier."""
    
    @staticmethod
    def classify_hotspot(raw_features: dict) -> dict:
        # Passes features to Backend Member 2's model: frp, temp, landcover distance, etc.
        # Fallback/Mock logic shown until Backend Member 2 merges their final ML pipeline
        frp = raw_features.get("frp", 0.0)
        dist = raw_features.get("distance_to_facility", 9999)

        if dist < 500:
            classification = "Industrial Fire"
            confidence = 94
            risk_score = 88
            severity = "Critical"
        elif frp > 100:
            classification = "Wildfire"
            confidence = 89
            risk_score = 75
            severity = "High"
        else:
            classification = "Agricultural Burn"
            confidence = 82
            risk_score = 40
            severity = "Low"

        return {
            "classification": classification,
            "confidence": confidence,
            "risk_score": risk_score,
            "severity": severity,
            "explainable_evidence": f"Proximity to industrial hub: {dist}m, FRP: {frp}MW"
        }