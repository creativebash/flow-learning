---
id: deployment-patterns
title: Deployment Patterns
track: ai-ml
level: intermediate
version: 1.0
---

# Deployment Patterns

## Learning Objectives

By the end of this lesson, you will be able to:

- Recognize common **model deployment patterns** (batch, online API, embedded, ensemble).  
- Choose the right pattern for a given Flow‑style problem (e.g., batch analytics vs real‑time recommendation).  
- Connect model deployment back to CI/CD and monitoring (registry, rollbacks, A/B).  
- Sketch a simple deployment setup for a Flow‑style service.

## Introduction

Training a model is only one piece of the puzzle.  
Even the best model is useless if it cannot be **invoked** when and where it is needed.

**Deployment patterns** answer questions like:

- Is the model used in **batch** or **real‑time**?  
- Who calls it (backend services, front‑end, cron jobs)?  
- How are versions and rollbacks handled?

In the Flow Initiative, these patterns help you turn notebooks into **services** that feed into education, governance, and analytics dashboards.

---

## Batch Scoring

### What it is

In **batch scoring**, you run the model periodically on a large dataset and store the results:

- `inputs → model → outputs` in a big batch.  
- Then push results into a database, data lake, or dashboard.

Typical patterns:

- nightly or weekly reports,  
- batch recommendations or rankings,  
- data‑transformation jobs that enrich a dataset with predictions.

### When to use it

Use batch deployment when:

- Latency is not critical (you can wait minutes or hours).  
- You process many records at once.  
- You feed an analytics or admin dashboard, not a live user interface.

In Flow‑style systems, this is common for:

- cohort reports,  
- intervention‑risk lists for mentors,  
- aggregated governance‑health summaries.

### Simple example

```python
# train or load model (offline)
model = load_model("model_latest.pkl")

# load data in batch
data = pd.read_csv("users_to_score.csv")
X = data[["feature_1", "feature_2"]]

# score
y_pred = model.predict(X)
data["risk_score"] = y_pred

# write back
data.to_csv("scored_users.csv", index=False)
```

You can then import `scored_users.csv` into a dashboard or database.

---

## Online / API Serving

### What it is

In **online serving**, you expose the model as an **API endpoint** that:

- receives a request,  
- runs a prediction,  
- returns a response in near real‑time.

Typical stack:

- a web framework (e.g., Flask, FastAPI, Express)  
- that loads the model once and reuses it for many requests.

### When to use it

Use online deployment when:

- you need low latency (sub‑second to a few seconds).  
- each request is small but frequent.  
- the model is part of a live user‑facing product.

In Flow‑style systems, this is common for:

- real‑time recommendations (e.g., “next lesson to attempt”),  
- risk‑or‑intervention alerts,  
- governance or proposal‑scoring APIs.

### Minimal structure

```python
# app.py
from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()

# load model at startup
model = joblib.load("model_latest.pkl")

class Features(BaseModel):
    hours_studied: float
    quiz_score: float

@app.post("/predict")
def predict(feature_inputs: Features):
    X = np.array([[feature_inputs.hours_studied, feature_inputs.quiz_score]])
    y_pred = model.predict(X)
    proba = model.predict_proba(X) if hasattr(model, "predict_proba") else None

    return {
        "prediction": int(y_pred),
        "confidence": proba.tolist() if proba is not None else None,
    }
```

You then run this server and call it from a front‑end or other backend service.

### Connection to CI/CD and monitoring

- **Model registry** → the `model_latest.pkl` is the **newest version** from CI/CD.  
- **Monitoring** → you log latency, error rate, and input/output distributions for this endpoint.  
- **Rollbacks** → if the new model is bad, point the service to an older `model_v1.pkl` file or environment‑specific symlink.

---

## Embedded / On‑Device Models

### What it is

In **embedded** deployment, models run:

- in a mobile‑app,  
- in a browser, or  
- in a desktop or IoT device.

Typical patterns:

- lightweight models (e.g., tree‑based or small neural nets).  
- models compiled to efficient formats (e.g., ONNX, TensorFlow Lite, Core ML).

### When to use it

Use embedded deployment when:

- network latency or connectivity is unreliable.  
- privacy is important (data must stay on‑device).  
- responses must be extremely fast (e.g., UI feedback).

In Flow‑style systems, this is relevant for:

- mobile learning apps that recommend next actions offline,  
- field‑based governance or capacity‑building tools.

### Trade‑offs

- **Pros**: low latency, privacy, offline use.  
- **Cons**: harder to update, version control, and monitoring.

---

## Ensemble / A/B and Canary Deployments

### Ensemble deployment

You can deploy **multiple models at once** and:

- average or blend their predictions,  
- or use them as independent “voters.”

This is common to:

- improve robustness,  
- hedge against one model’s weaknesses.

Example blend:

`y_blend = 0.7 * y_model1 + 0.3 * y_model2`

#### A/B and canary patterns

In **A/B or canary deployment**:

- you route a fraction of traffic to a **new model** (B),  
- the rest stays on the **old model** (A).  

You observe:

- metrics for A vs B,  
- and decide whether to promote B to 100%.

In Flow‑style contexts, this is useful when:

- you want to test a new curriculum‑recommendation engine on a small cohort,  
- or roll out a governance‑risk‑model without exposing all users.

You can implement this in:

- the front‑end (random assignment),  
- or the backend (e.g., `model_A` vs `model_B` based on a rollout flag).

---

## Practical Exercises

### Exercise 1: Choose a Pattern

Pick a Flow‑style problem (e.g., “predict whether a learner will drop out”):

- Decide whether the solution is **batch**, **online‑API**, or **embedded**‑style.  
- Sketch:

  - who calls the model,  
  - when it runs,  
  - and how results are stored or used.

### Exercise 2: Design a Minimal API

Using a small model from a Flow‑style lab:

- Wrap it in a FastAPI or Flask service that exposes a `POST /predict` endpoint.  
- Write a short client script that calls this endpoint with sample data.

This gives you a concrete deployment‑style habit.

### Exercise 3: Sketch an A/B Plan

For the same lab:

- Write an A/B plan:  
  - which version is A, which is B,  
  - what metric you will track,  
  - and how you will decide when to promote B.

---

## Self‑Assessment

Rate yourself from 1 to 5:

- I can name the main deployment patterns (batch, online‑API, embedded, ensemble‑style).  
- I can choose the right pattern for a Flow‑style problem.  
- I can connect deployment to CI/CD and monitoring (versioning, rollbacks, A/B).  
- I can sketch a simple deployment setup for a model.

Action item: write a short note in your lab repo describing one deployment pattern you plan to use for your next Flow‑style ML project and why.

## Next Steps

- Read `04-evaluation-and-bias.md` next to learn how deployment and monitoring influence how you evaluate and revise models.  
- Use these deployment patterns as a **first‑class design step** for every ML‑backed service in the Flow curriculum.  
- Treat **model deployment** as the **bridge** between experiments and impact.

---

*This lesson gives Flow Initiative trainees an intermediate‑level understanding of model deployment patterns in ML systems, focusing on batch scoring, online/API serving, embedded deployment, and A/B‑style setups, and how to connect them to CI/CD and monitoring in Flow‑style systems.*