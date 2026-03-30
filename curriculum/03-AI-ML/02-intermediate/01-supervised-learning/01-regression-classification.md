---
id: regression-classification
title: Regression and Classification
track: ai-ml
level: intermediate
version: 1.0
---

# Regression and Classification

## Learning Objectives

By the end of this lesson, you will be able to:

- Clearly distinguish between **regression** and **classification** problems and their canonical use cases.  
- Choose the right problem type and metric for a given Flow‑style task.  
- Train and evaluate simple regression and classification models with scikit‑learn.  
- Connect these models to the broader ML workflow (data pipelines, evaluation, deployment).

## Introduction

At the intermediate level, “regression” and “classification” are not just labels; they are **modeling choices** that shape how you:

- define the target,  
- choose metrics, and  
- interpret results.

In practice:

- **Regression** is for predicting **continuous numeric** outputs (e.g., price, score, latency).  
- **Classification** is for predicting **discrete labels or classes** (e.g., pass/fail, spam/ham, low/medium/high).

Your job is to recognize which pattern fits the Flow‑style problem you are solving and wire it correctly into the full ML stack.

---

## Regression: Predicting Continuous Values

### When to use regression

Use regression when:

- The target is numeric and **continuous** (or at least interval‑scale).  
- You care about **how far off** predictions are, not just the sign.

Common examples:

- predicting exam scores over the full range `0–100`,  
- predicting user engagement time,  
- predicting token‑health scores or reward amounts.

### Core idea

A regression model tries to fit a function like:

`y = wx + b`

or a more complex nonlinear mapping, so that predictions `y_pred` are as close as possible to true `y` in some numeric sense (e.g., squared error).

### Typical models and workflows

- **Linear regression**, **Ridge**, **Lasso** → start‑here for simple numeric targets.  
- **Tree‑based** (e.g., `RandomForestRegressor`) → when you want non‑linear relationships without heavy feature engineering.

A minimal pattern in a Flow lab:

```python
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score

# 1. Prepare data
X = data[["feature_1", "feature_2"]]
y = data["score"]

# 2. Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. Train
regressor = LinearRegression()
regressor.fit(X_train, y_train)

# 4. Predict
y_pred = regressor.predict(X_test)

# 5. Evaluate
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
print("MSE:", mse, "R²:", r2)
```

### Typical metrics

- **Mean Squared Error (MSE)** / **RMSE** for raw error magnitude.  
- **R²** for how much of the variance the model explains.  
- **Mean Absolute Error (MAE)** when you care about human‑readable “average error” in the same units as `y`.

---

## Classification: Predicting Discrete Labels

### When to use classification

Use classification when:

- The target is **categorical** (e.g., binary: 0/1, or multi‑class).  
- You care about **correct class assignment**, not a numeric value.

Common examples:

- predicting whether a student will pass or fail.  
- classifying user behavior into low/medium/high risk.  
- labeling records into governance categories.

### Core idea

A classification model maps inputs `x` to:

- a **class label** (e.g., `"pass"`, `"fail"`), or  
- a **probability** over classes (e.g., `P(pass) = 0.9`).

A common starting point:

`p = sigmoid(wx + b)`

then threshold `p` at 0.5 to get `0/1` labels.

### Typical models and workflows

- **Logistic Regression** → interpretability and linearity.  
- **RandomForestClassifier**, **GradientBoostingClassifier** → stronger performance without heavy tuning.

A minimal pattern:

```python
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, classification_report

# 1. Prepare data (assume binary target)
X = data[["feature_1", "feature_2"]]
y = data["passed"]  # 0 or 1

# 2. Split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. Train
classifier = LogisticRegression()
classifier.fit(X_train, y_train)

# 4. Predict
y_pred = classifier.predict(X_test)

# 5. Evaluate
acc = accuracy_score(y_test, y_pred)
prec = precision_score(y_test, y_pred)
rec = recall_score(y_test, y_pred)

print("Accuracy:", acc)
print("Precision:", prec)
print("Recall:", rec)
print("\nDetailed report:")
print(classification_report(y_test, y_pred))
```

### Typical metrics

- **Accuracy**: for balanced problems.  
- **Precision / Recall / F1**: when you care about false positives vs false negatives.  
- **AUC‑ROC**: for ranking quality when the model outputs probabilities.

---

## When to Choose Regression vs. Classification

### Mapping to real‑world problems

| Flow‑style problem idea                     | Likely type        | Why                                   |
|--------------------------------------------|--------------------|---------------------------------------|
| Predict exam score `0–100`                 | Regression         | numeric continuous target             |
| Predict pass/fail (binary)                 | Binary classification | discrete label                        |
| Predict low/medium/high engagement         | Multi‑class classification | categorical, ordered or not           |
| Predict reward amount in tokens            | Regression         | numeric value                         |
| Predict whether a governance proposal passes | Binary classification | boolean outcome                         |

Sometimes you can **frame the same idea as either**:

- **classification** (e.g., “high‑risk” vs “not‑high‑risk”), or  
- **regression** (e.g., “risk score” from 0 to 100).

The choice affects:

- which **metrics** matter,  
- how you **communicate results**, and  
- what kind of **model bias** you accept.

---

## Practical Exercises (Intermediate‑Style)

### Exercise 1: Frame a Problem

Pick a Flow‑style idea (e.g., “predict which learners will dropout”):

- Frame it as **regression** (e.g., predict a risk score).  
- Then reframe it as **classification** (e.g., predict dropout‑yes/no).  
- For each framing, write one metric you would monitor.

### Exercise 2: Train a Flow‑Flavored Model

Use a dataset from a Flow‑style lab:

- Choose whether the problem is regression or classification.  
- Train a `LinearRegression` or `LogisticRegression` model.  
- Log the performance metrics and write a short note on what they imply for the product.

### Exercise 3: Trade‑off Note

Write a one‑page note:

- When you would prefer **regression** over classification in a Flow context.  
- When you would prefer **classification**.  
- How each choice affects stakeholders’ understanding and trust.

---

## Self‑Assessment

Rate yourself from 1 to 5:

- I can clearly distinguish regression and classification.  
- I can choose the right type for a Flow‑style problem.  
- I can train and evaluate a simple model of each type.  
- I can map these to metrics and stakeholder needs.

Action item: write a short note in your lab repo describing which type (regression or classification) you would use for your **next** Flow‑style AI project and why.

## Next Steps

- Read `02-tree-based-models.md` next to go deeper into decision trees and forests.  
- Use regression and classification as your **go‑to building blocks** for Flow‑style prediction tasks.  
- Treat the choice between them as a **modeling design decision**, not an afterthought.

---

*This lesson gives Flow Initiative trainees an intermediate‑level understanding of regression and classification in ML systems, focusing on how to map Flow‑style problems to the right model type, choose metrics, and train/evaluate with scikit‑learn.*