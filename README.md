# TechPulse — Frontend

Frontend application for TechPulse, a structured AI platform for company intelligence,
talent assessment, and market analysis.

This repository contains the **frontend application only**.

All AI logic, models, prompts, and decision rules are implemented server-side
and maintained in private repositories.

---

## Overview

The TechPulse frontend handles:

- User interaction and input collection
- Visualization of structured AI outputs
- Navigation across analysis modules
- Presentation of qualified results produced by the backend

The frontend does **not** perform inference or decision-making.

---

## Capabilities

| Capability | Output |
|------------|--------|
| Company Analysis | Risk and opportunity assessments |
| Trend Analysis | Market signals and emerging patterns |
| Predictions | Structured forecasts |
| Talent Intelligence | Skills and positioning insights |
| Reality Check | Validation-oriented outputs |

All outputs are rendered exactly as returned by the backend.

---

## Architecture

TechPulse follows a strict separation of concerns.

| Layer | Responsibility |
|-------|----------------|
| Frontend (this repo) | UI, input handling, visualization |
| Backend Services | Validation, orchestration, inference |
| Governance Layer | Output qualification |

Frontend receives only qualified outputs.
No raw model responses are exposed to the UI.

---

## Related

- TechPulse Backend (private repository)
- IFX vs KQR — Governance Infrastructure (concept documentation)

---

## License

Proprietary — TechPulse © 2025

