"""Human-readable explanations produced by the Atlas Engine."""

from __future__ import annotations

from .models import AthleteMetrics, Explanation, TrainingState


def build_explanation(state: TrainingState, metrics: AthleteMetrics) -> Explanation:
    """Build an actionable explanation for a classified training state."""
    reasons = _build_reasons(metrics)
    explanations = {
        TrainingState.UNKNOWN: Explanation(
            title="Données insuffisantes",
            summary="Atlas ne dispose pas encore des données nécessaires.",
            recommendation="Synchronisez vos activités puis réessayez plus tard.",
            reasons=reasons,
        ),
        TrainingState.RECOVERY: Explanation(
            title="Récupération nécessaire",
            summary="La fatigue accumulée est très importante.",
            recommendation="Privilégiez le repos ou une récupération très légère.",
            reasons=reasons,
        ),
        TrainingState.HIGH_FATIGUE: Explanation(
            title="Fatigue élevée",
            summary="Votre charge récente génère une fatigue importante.",
            recommendation="Évitez une nouvelle séance très intense aujourd'hui.",
            reasons=reasons,
        ),
        TrainingState.BUILDING: Explanation(
            title="Construction de la forme",
            summary="Vous développez votre condition avec une charge soutenue.",
            recommendation="Maintenez la progression en surveillant la récupération.",
            reasons=reasons,
        ),
        TrainingState.PRODUCTIVE: Explanation(
            title="Charge productive",
            summary="Votre équilibre charge-récupération est favorable.",
            recommendation="Vous pouvez poursuivre l'entraînement prévu.",
            reasons=reasons,
        ),
        TrainingState.FRESH: Explanation(
            title="État de fraîcheur",
            summary="La fatigue est faible et votre organisme semble disponible.",
            recommendation="Une séance de qualité peut être envisagée.",
            reasons=reasons,
        ),
        TrainingState.PEAK: Explanation(
            title="Pic de fraîcheur",
            summary="Vous êtes particulièrement frais après une baisse de charge.",
            recommendation="Profitez de cet état pour une compétition ou un test.",
            reasons=reasons,
        ),
    }
    return explanations[state]


def _build_reasons(metrics: AthleteMetrics) -> list[str]:
    """Build concise reasons from available metrics."""
    reasons: list[str] = []
    if metrics.form is not None:
        reasons.append(f"Forme : {metrics.form:.1f}")
    if metrics.fitness is not None:
        reasons.append(f"Fitness : {metrics.fitness:.1f}")
    if metrics.fatigue is not None:
        reasons.append(f"Fatigue : {metrics.fatigue:.1f}")
    return reasons
