"""Model loading contract for the Thermal Sentinel AI engine.

This module isolates model selection and versioning so a real trained model can
replace the prototype without changing the rest of the application integration.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict, Optional


@dataclass
class LoadedModel:
    """Container for whichever model implementation is active."""

    name: str
    backend: str
    version: str
    metadata: Dict[str, Any]
    estimator: Any


class ModelLoader:
    """Prototype model registry and loader.

    The default implementation uses a transparent rule-based classifier so the
    project can run without training artifacts while remaining compatible with a
    future trained estimator.
    """

    def __init__(self, model_name: str = "prototype_rule_based") -> None:
        self.model_name = model_name

    def load(self) -> LoadedModel:
        """Return the active model wrapper."""
        return LoadedModel(
            name=self.model_name,
            backend="rule_based",
            version="demo-v1",
            metadata={
                "description": "Transparent prototype classifier for demo and integration use.",
                "note": "Not a validated physical model; intended as a replaceable engine placeholder.",
            },
            estimator={"type": "rule_based", "prototype": True},
        )

    def get_active_model(self) -> Optional[LoadedModel]:
        return self.load()
