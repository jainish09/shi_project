"""Analytics helpers for thermal hotspot time series and event summaries."""

from __future__ import annotations

from typing import Iterable, List, Sequence

import numpy as np


def calculate_baseline(history: Sequence[float]) -> float:
    values = [float(v) for v in history if v is not None]
    if not values:
        return 0.0
    return float(np.mean(values))


def compute_abnormality_index(history: Iterable[float], current_intensity: float) -> float:
    values = [float(v) for v in history]
    if not values:
        return 0.0
    baseline = calculate_baseline(values)
    if baseline == 0:
        return 0.0
    deviation = ((current_intensity - baseline) / baseline) * 100.0
    return max(0.0, min(100.0, abs(deviation) * 0.7 + (max(0.0, current_intensity - baseline) / max(baseline, 1.0)) * 35.0))


def summarize_thermal_event(history: Sequence[float], current_intensity: float) -> dict:
    values: List[float] = [float(v) for v in history]
    baseline = calculate_baseline(values)
    deviation = 0.0 if baseline == 0 else ((current_intensity - baseline) / baseline) * 100.0
    return {
        "baseline": round(float(baseline), 2),
        "current_intensity": round(float(current_intensity), 2),
        "deviation_percent": round(float(deviation), 2),
        "abnormality_index": round(float(compute_abnormality_index(values, current_intensity)), 2),
        "persistence_count": len([v for v in values if v >= baseline * 0.75]),
    }
