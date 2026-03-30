---
id: ci-cd-for-models
title: CI/CD for Models
track: ai-ml
level: intermediate
version: 1.0
---

# CI/CD for Models

## Learning Objectives

By the end of this lesson, you will be able to:

- Explain what **CI/CD** means in the context of ML models (not just apps).  
- Describe the core stages: code linting, data and feature tests, model training, evaluation, and deployment gates.  
- Sketch a minimal CI/CD pipeline for a Flow‑style model (e.g., a classification or regression model).  
- Identify when a CI/CD setup is over‑engineered for a given lab.

## Introduction

In software engineering, **CI/CD** (Continuous Integration / Continuous Delivery) is the practice of:

- automatically building, testing, and (optionally) deploying code on every change.  

For ML, **CI/CD for models** extends this idea: you automate **data checks, training, evaluation, and deployment decisions** so that models are treated as **reproducible artifacts**, not one‑off scripts.

In Flow‑style labs, you will not always need a GitHub Actions–style CI/CD monster.  
But you *will* benefit from understanding the **pattern**:

- push a change → run tests → train/evaluate → optionally deploy.

This lesson focuses on the **mental model and light‑weight practices**, not vendor‑specific YAML files.

---

## What CI/CD for Models Means

### Continuous Integration (CI)

**CI** for ML usually means:

- Every time you push code or data changes, the system:

  1. **Lints and checks** your code (style, tests, import safety).  
  2. **Validates** datasets or features (schema, nulls, expected ranges).  
  3. Optionally **trains and evaluates** the model on a small or sampled dataset.

The goal is early feedback: you want to know fast if a change breaks:

- the data pipeline,  
- feature logic, or  
- basic model behavior.

### Continuous Delivery (CD)

**CD** is the idea that:

- Once the CI checks pass, the system can **deliver** the model (or artifacts) to a staging or production environment, subject to extra gates.

Delivery can be:

- **Automatic** (e.g., if metrics pass).  
- **Manual approval** (human‑in‑the‑loop).

For ML, “delivery” often means:

- registering a new model version in a registry,  
- updating a model server or API endpoint, or  
- flipping a feature flag that routes traffic to the new model.

The key idea: **you push the change; the pipeline decides what to do with it.**

---

## Typical Stages in a CI/CD Pipeline for Models

Here is a minimal flow you can adapt to Flow‑style labs:

### 1. Code and Data Validation

When code is pushed:

- Run linters (`flake8`, `ruff`, `black`‑style checks) and unit tests.  
- Validate that:

  - importable modules exist,  
  - config files are valid,  
  - environment variables or paths are present.

- Validate data/features:

  - schema didn’t change unexpectedly.  
  - no new columns or removed columns.  
  - no large spikes in missing values.

These checks are fast and rely on small samples or metadata.

### 2. Model Training (Optional, On Demand)

In many real‑world setups:

- CI trains a model **on every push or PR**, but on a small or sampled dataset to keep latency low.  
- Full training on large data is triggered separately or overnight.

In a Flow‑style context, you can:

- run a **quick training run** to ensure the training script still works,  
- without waiting for a full epoch‑heavy train.

### 3. Evaluation and Validation

After training (or on a test‑only run), evaluate with:

- **metrics**: accuracy, precision, recall, F1, MSE, etc.  
- **bounds**: ensure performance doesn’t drop below a threshold.  
- **consistency checks**: features + model → stable predictions.

You can encode:

- “model cannot be promoted if F1 drops below 0.7.”  
- “data cannot be merged if nulls exceed 5%.”

This turns evaluation into **automation‑driven gates**.

### 4. Model Registration and Artifact Storage

If the model passes:

- Save the trained model (e.g., `pickle`, `joblib`, or a standard format) to a **versioned store**.  
- Register metadata:

  - commit hash,  
  - dataset version,  
  - hyperparameters,  
  - metrics on the test set.

This is your **model registry pattern** in simple form.

### 5. Deployment Gates

Finally, decide what to do with the model:

- **Staging**  
  - Deploy to a staging endpoint and run canary or A/B tests.  
- **Production**  
  - Only promote if the model beats the current one or meets safety checks.

In practice you might:

- swap a symbolic link to the latest model file,  
- update a config file used by a Flask/FastAPI model service, or  
- update a feature flag that routes traffic.

---

## Why This Matters for Flow Engineers

For ML‑backed services in the Flow Initiative, CI/CD for models:

- Turns **models into reproducible artifacts** (not fragile notebooks).  
- Reduces risk of breaking production with a bad train or data change.  
- Makes it easier to **roll back** to a previous model when something breaks.  
- Builds trust with stakeholders who need to see **repeatable processes**.

In African‑centric and public‑goods contexts, this is particularly important when:

- Models influence **governance**, **education**, or **reward‑based systems**.  
- Errors are more than theoretical; they can affect people’s outcomes.  
- You want transparent, verifiable processes for updates.

---

## What You Can Do in a Flow‑Style Lab

Even without a full CI/CD platform, you can adopt **CI/CD‑style disciplines**:

- **Version control everything** (code, data pointers, configs).  
- **Wrap training in a script** (e.g., `train.py`) that outputs a model artifact.  
- **Add a `run_evaluation.py`** script that:

  - loads the model,  
  - runs it on a test set,  
  - prints metrics, and  
  - exits with a non‑zero code if metrics are too low.

Then, in a more “real” setting, you would:

- wire this script into GitHub Actions / GitLab CI / Jenkins,  
- and gate model deployment on its exit status.

For learning, that local‑style discipline is the core.

---

## Common Anti‑Patterns

### 1. “No‑op” CI

- Having a CI job that only runs `echo "OK"` or a trivial test.  
- It gives an illusion of automation but provides no guardrails.

### 2. Training Everything in CI

- Letting CI run full training on full‑size data for every PR.  
- This makes the pipeline **slow** and frustrating.

### 3. No Model Versioning

- Overwriting a single `model.pkl` file.  
- You cannot reproduce or roll back old models.

### 4. No Clear Deployment Gates

- Nobody knows what triggers a “production update.”  
- People update models manually, inconsistently.

---

## Practical Exercises

### Exercise 1: Sketch a Minimal CI/CD Flow

Pick a small Flow‑style supervised learning lab:

- Sketch a CI/CD pipeline as a list:

  - code/data validation,  
  - quick training,  
  - evaluation,  
  - model storage,  
  - deployment gate.

Write this as a markdown note, not as YAML.

### Exercise 2: Write a Local “CI” Script

Create a simple script (e.g., `ci_model.py`):

- It lints your code,  
- runs a small test‑only evaluation of the model on a held‑out set,  
- and prints metrics plus a pass/fail message.

Think of this as a “stand‑in” for a real CI job.

### Exercise 3: Design a Model Versioning Scheme

For the same lab:

- Decide how to version models (e.g., `model_v1.pkl`, `model_v2.pkl`, or `model_{timestamp}_{hash}.pkl`).  
- Write down:

  - how you would store metadata along with each model,  
  - how you would choose which version to serve in production.

---

## Self‑Assessment

Rate yourself from 1 to 5:

- I can explain what CI/CD for models means.  
- I can sketch a pipeline that includes data, training, evaluation, and deployment gates.  
- I can see how to turn a local training script into a CI‑style automation.  
- I can avoid typical anti‑patterns like opaque or over‑heavy CI jobs.

Action item: write a short note in your lab repo describing a simple CI/CD‑style setup you would like to apply to your next Flow‑style ML project.

## Next Steps

- Read `02-monitoring-model-performance.md` next to learn how to track models in production and feed that back into CI/CD.  
- Use this CI/CD‑thinking habit whenever you design a model‑backed service.  
- Treat **model CI/CD** as a **first‑class engineering practice**, not a side‑product of ML.

---

*This lesson gives Flow Initiative trainees an intermediate‑level understanding of CI/CD for ML models, focusing on how to treat models as versioned artifacts, automate training and evaluation, and gate deployment decisions in a disciplined way.*