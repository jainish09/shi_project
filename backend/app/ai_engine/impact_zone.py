"""Illustrative impact-zone generation for thermal incidents."""

from __future__ import annotations

import math
from typing import Any, Dict, List, Tuple


def _to_radians(degrees: float) -> float:
    return degrees * math.pi / 180.0


def _destination_point(lat: float, lon: float, bearing_deg: float, distance_km: float) -> Tuple[float, float]:
    earth_radius_km = 6371.0
    angular_distance = distance_km / earth_radius_km
    lat1 = _to_radians(lat)
    lon1 = _to_radians(lon)
    bearing = _to_radians(bearing_deg)

    lat2 = math.asin(
        math.sin(lat1) * math.cos(angular_distance)
        + math.cos(lat1) * math.sin(angular_distance) * math.cos(bearing)
    )
    lon2 = lon1 + math.atan2(
        math.sin(bearing) * math.sin(angular_distance) * math.cos(lat1),
        math.cos(angular_distance) - math.sin(lat1) * math.sin(lat2),
    )
    return math.degrees(lat2), math.degrees(lon2)


def generate_impact_zone(
    latitude: float,
    longitude: float,
    wind_direction_deg: float,
    wind_speed_kmh: float,
    risk_level: str,
) -> Dict[str, Any]:
    """Generate an illustrative directional GeoJSON polygon.

    This output is intentionally labeled as an illustrative potential impact zone and
    is not a validated atmospheric dispersion model.
    """
    risk_map = {"Low": 3, "Medium": 8, "High": 12, "Critical": 16}
    base_radius_km = risk_map.get(str(risk_level).title(), 8)
    speed_factor = max(1.0, min(2.0, wind_speed_kmh / 20.0))
    radius_km = base_radius_km * speed_factor

    direction = float(wind_direction_deg)
    points: List[Tuple[float, float]] = []
    for offset in range(0, 360, 45):
        bearing = direction + offset - 180
        point_lat, point_lon = _destination_point(latitude, longitude, bearing, radius_km)
        points.append((point_lat, point_lon))

    # Create a closed polygon around the hotspot in the direction of the wind.
    polygon_points = [
        [lon, lat] for lat, lon in points
    ]
    polygon_points.append(polygon_points[0])

    return {
        "type": "Feature",
        "properties": {
            "label": "Illustrative Potential Impact Zone",
            "risk_level": str(risk_level).title(),
            "wind_direction_deg": float(wind_direction_deg),
            "wind_speed_kmh": float(wind_speed_kmh),
            "note": "Illustrative Potential Impact Zone — not a validated smoke-dispersion model.",
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [polygon_points],
        },
    }
