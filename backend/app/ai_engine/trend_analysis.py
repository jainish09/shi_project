"""Persistent vs sudden thermal anomaly analysis."""

from __future__ import annotations

from typing import Iterable, List

import numpy as np


def analyze_thermal_trend(historical_values: Iterable[float], current_intensity: float) -> dict:
    """Return trend metrics for a hotspot timeline.

    The analysis distinguishes between repeated persistent heating and sudden
    deviations relative to the baseline, while remaining explainable.
    """
    history: List[float] = [float(v) for v in (historical_values or [])]
    if not history:
        history = [float(current_intensity) * 0.8, float(current_intensity) * 0.9, float(current_intensity)]

    historical_average = float(np.mean(history))
    current = float(current_intensity)
    deviation = current - historical_average
    deviation_percent = 0.0 if historical_average == 0 else (deviation / historical_average) * 100.0

    persistence_count = int(sum(1 for value in history if value >= historical_average * 0.75))
    recent_window = history[-3:] if len(history) >= 3 else history
    trend_direction = "Rising"
    if recent_window and len(recent_window) > 1:
        if recent_window[-1] < recent_window[0]:
            trend_direction = "Falling"
        elif recent_window[-1] > recent_window[0]:
            trend_direction = "Rising"
        else:
            trend_direction = "Stable"

    if current >= max(history) * 1.35 or deviation_percent >= 50.0:
        pattern = "Sudden"
    elif persistence_count >= max(2, len(history) - 1):
        pattern = "Persistent"
    else:
        pattern = "Sudden" if deviation_percent >= 0 else "Persistent"

    abnormality_metric = abs(deviation_percent) * 0.65 + max(0.0, (current / max(historical_average, 1.0)) * 20.0)
    abnormality_score = max(0.0, min(100.0, abnormality_metric))

    return {
        "pattern": pattern,
        "historical_average": round(historical_average, 2),
        "current_intensity": round(current, 2),
        "deviation_percent": round(deviation_percent, 2),
        "persistence_count": persistence_count,
        "trend_direction": trend_direction,
        "abnormality_score": round(abnormality_score, 2),
    }
