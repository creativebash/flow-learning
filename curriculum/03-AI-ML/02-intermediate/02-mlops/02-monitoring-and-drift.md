---
id: monitoring-and-drift
title: Monitoring and Drift
track: ai-ml
level: intermediate
version: 1.0
---

# Monitoring and Drift

## Learning Objectives

By the end of this lesson, you will be able to:

- Explain why **monitoring** models in production is as important as training them.  
- Recognize common types of **data drift** and **concept drift**.  
- Implement basic monitoring ideas for predictions, data, and performance.  
- Decide when a model needs to be retrained or improved after deployment.

## Introduction

Once a model is deployed, its environment keeps changing.  
Data sources shift, user behavior evolves, and system conditions vary.  
If you treat the model as “set and forget,” it will slowly degrade into **silent failure**.

**Monitoring** is the practice of:

- observing model inputs, outputs, and performance over time, and  
- alerting or reacting when something goes out of bounds.

**Drift** is the term used when the underlying data or relationships start to change so the model’s behavior deteriorates.

In this lesson you will learn how to treat models as **live services**, not one‑off experiments.

---

## Why Monitoring Matters

In production:

- Training data represents the **past**, deployment data is the **present**.  
- If the present differs from the past, the model’s predictions may be worse, biased, or just plain wrong.

Monitoring helps you:

- Detect **performance degradation** early.  
- Find **data‑quality issues** (e.g., missing features, corrupted values).  
- Catch **unintended side effects** (e.g., a model starting to favor certain groups).  

For Flow‑style systems, where models may influence education, governance, or rewards, this is not optional; it is a **responsibility**.

---

## What to Monitor

### 1. Data Distribution

Track the **inputs** the model receives:

- feature distributions (e.g., histograms of `hours_studied` over time).  
- missing‑value rates.  
- schema changes (new or missing columns).

If the shape of the data changes significantly since training, that is a **data‑drift** warning.

### 2. Prediction Distribution

Track the **outputs**:

- distribution of predicted scores or probabilities.  
- rate of extreme predictions (e.g., very high or very low risk).  
- prediction‑stability over time.

Sudden jumps in the average prediction or in the mix of classes are red flags.

### 3. Performance Over Time

If you can observe ground‑truth labels in production, track:

- accuracy, precision, recall, F1, MSE, etc., over time.  
- compare current performance to a **baseline** (e.g., training‑time metrics or a previous model).

If performance drops below a threshold, you may need to retrain or investigate.

### 4. System Metrics

Monitor the **infrastructure layer**:

- latency of the model service.  
- error rates and retries.  
- throughput (requests per second).

Poor performance at the system level can corrupt user experience even if the model is technically “fine.”

---

## What Is Drift?

### Data Drift

**Data drift** occurs when the **distribution of input features** changes over time.

Examples:

- After a curriculum redesign, students spend more time on videos and less on reading.  
- After a network outage, some logging fields are empty that used to always be filled.

Indicators:

- feature ranges shift (`mean`, `std`, `min`, `max`).  
- new or missing features.  

For Flow‑style engineers, this means the **features** your model learned on are no longer representative.

### Concept Drift

**Concept drift** occurs when the **relationship between inputs and outputs** changes.

Examples:

- A “high‑engagement learner” used to reliably complete courses, but now engagement is noisy and completion rates drop.  
- A governance‑proposal‑success pattern shifts after a structural reform.

Indicators:

- model performance drops even though feature distributions look similar.  
- in‑practice calibration is wrong (e.g., predicted probabilities no longer match observed outcomes).

Concept drift is usually harder to detect than data drift because it shows up in **performance** or **calibration**, not just raw data.

---

## How to Detect Drift

You do not need to build a full‑blown platform to start.

### 1. Statistical Comparisons

Compare current data to a reference (e.g., training data or a recent window):

- For numeric features:  
  - compare distributions via Kolmogorov‑Smirnov or simple distance on quantiles.  
- For categorical features:  
  - compare frequency distributions.

You can also:

- monitor **summary statistics** over time and alert if they move far from a baseline.

### 2. Prediction‑Based Monitoring

Track:

- average prediction per day/week.  
- fraction of users assigned to high‑risk bucket.  
- dispensation‑like patterns (e.g., “why did this group suddenly get low scores?”).

Large shifts in these aggregates suggest something changed in the model’s view of the world.

### 3. Performance Monitoring

If you have labels in production:

- Compute metrics on a rolling window.  
- Plot them over time and flag if they cross thresholds.

Example:

- an alert if accuracy drops below `0.75` for three consecutive days.

---

## What to Do When Drift Appears

When you detect drift, you have several options:

1. **Investigate**:  
   - Check data quality, logging, and feature pipelines.  
   - Look for upstream changes (UI redesigns, curriculum changes).

2. **Retrain**:  
   - Collect recent labeled data.  
   - Retrain the model with fresher data and redeploy.

3. **Update Features**:  
   - If the world changed, old features may no longer be predictive.  
   - Add or remove features to reflect new behavior.

4. **Roll Back**:  
   - If the latest model is clearly worse, switch back to a previous version.

5. **Introduce Fallbacks**:  
   - For critical systems, have a “safeguard” behavior (e.g., human‑in‑the‑loop, default rules) when the model’s reliability is in question.

---

## Practical Exercises

### Exercise 1: Sketch a Monitoring Plan

Pick a Flow‑style model you have deployed or are about to deploy:

- List 3–5 things to monitor (e.g., data features, prediction distribution, performance metric).  
- For each, write how you would compute it (e.g., log a metric every day).  
- Choose a simple threshold that would trigger an alert.

### Exercise 2: Simulate Drift

Using a small dataset and model:

- Train a model on a subset of the data.  
- Introduce artificial drift (e.g., shift a feature’s mean or drop a feature).  
- Predict on the drifted data and observe how performance degrades.  
- Record what you would do in a real‑world setting.

### Exercise 3: Update a Model Post‑Drift

After simulating drift:

- Retrain the model on a newer, drifted dataset.  
- Compare performance before and after on a held‑out test set.  
- Write a short note assessing whether the retrained model effectively adapts to the new data.

---

## Self‑Assessment

Rate yourself from 1 to 5:

- I can explain why monitoring models in production is important.  
- I can distinguish data drift from concept drift.  
- I can design a simple monitoring plan for a Flow‑style model.  
- I can decide whether to retrain or roll back a model after observing drift.

Action item: write a short note in your lab repo describing one monitoring metric and one drift detection rule you would apply to your next Flow‑style ML project.

## Next Steps

- Read `03-model-registry-and-rollback.md` next to learn how to version and manage model rollbacks.  
- Use monitoring and drift‑detection as **core practices** for every model you deploy.  
- Treat every deployed model as a **live service** that must be watched and maintained.

---

*This lesson gives Flow Initiative trainees an intermediate‑level understanding of model monitoring and drift in ML systems, focusing on how to track data, predictions, and performance over time, detect when a model is degrading, and decide when to retrain or roll back.*