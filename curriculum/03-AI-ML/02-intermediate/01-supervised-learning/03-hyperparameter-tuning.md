---
id: hyperparameter-tuning
title: Hyperparameter Tuning
track: ai-ml
level: intermediate
version: 1.0
---

# Hyperparameter Tuning

## Learning Objectives

By the end of this lesson, you will be able to:

- Distinguish **model parameters** from **hyperparameters**.  
- Explain common hyperparameter‑tuning methods: grid search, random search, and basic pruning.  
- Apply `GridSearchCV` or `RandomizedSearchCV` in scikit‑learn to a Flow‑style problem.  
- Interpret tuning trade‑offs: computation cost vs. performance gain.

## Introduction

Once you have chosen a model type and features, the next step is **tuning** its behavior.  
In supervised learning, **hyperparameters** are the knobs you set before training:

- how complex the model is,  
- how fast it learns,  
- how much regularization it applies.

Tuning them well can make the difference between a barely‑working model and one that adds real value in a Flow‑style lab.  
The goal here is to move from “use the defaults” to **intentional tuning**.

---

## Parameters vs. Hyperparameters

### Model parameters

These are learned **from the data** during training:

- weights in a linear model (`w` in `y = wx + b`),  
- splits and leaf values in a decision tree.

You do not choose them directly; the algorithm learns them.

### Hyperparameters

These are chosen **by the engineer** before training:

- model complexity (e.g., `max_depth` in a tree),  
- regularization strength (e.g., `C` in LogisticRegression, `alpha` in Ridge),  
- learning rate or `n_estimators` in ensembles.

Your job is to **search** over a set of plausible hyperparameter values and pick the combination that performs best on a held‑out set.

---

## Common Tuning Methods

### 1. Grid Search

**Grid search** tries all combinations of hyperparameters in a predefined grid.

```python
from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestClassifier

# Define the model
model = RandomForestClassifier(random_state=42)

# Define the grid
param_grid = {
    "n_estimators":,[1][2][3]
    "max_depth": [5, 10, 15, None],
    "min_samples_split":,[4][5][6]
}

# Run grid search with cross‑validation
grid_search = GridSearchCV(
    estimator=model,
    param_grid=param_grid,
    cv=5,
    scoring="f1",
    n_jobs=-1,
)
grid_search.fit(X_train, y_train)

# Get best parameters
best_params = grid_search.best_params_
print("Best parameters:", best_params)

# Use best model on test set
best_model = grid_search.best_estimator_
y_pred = best_model.predict(X_test)
```

**Pros**:

- exhaustive (no blind spots in the grid).  
- easy to understand.

**Cons**:

- slow when the grid is large.  
- scales exponentially with the number of hyperparameters.

### 2. Random Search

**Random search** samples a fixed number of hyperparameter combinations at random from ranges.

```python
from sklearn.model_selection import RandomizedSearchCV
from scipy.stats import randint, uniform

model = RandomForestClassifier(random_state=42)

param_dist = {
    "n_estimators": randint(50, 300),
    "max_depth": randint(3, 20),
    "min_samples_split": randint(2, 20),
    "max_features": uniform(0.5, 0.5),  # proportion of features
}

random_search = RandomizedSearchCV(
    estimator=model,
    param_distributions=param_dist,
    n_iter=50,
    cv=5,
    scoring="f1",
    random_state=42,
    n_jobs=-1,
)
random_search.fit(X_train, y_train)

best_params = random_search.best_params_
print("Best parameters:", best_params)
```

**Pros**:

- often finds good points faster than grid search.  
- more scalable to many hyperparameters.

**Cons**:

- not guaranteed to try every corner of the space.  
- can miss optimal values if you sample too few points.

### 3. Simple Early‑Stopping Style Pruning (Concept)

Some tooling (e.g., in advanced libraries) supports **pruning**:

- training partial runs,  
- cutting off unpromising candidates early.

In practice with scikit‑learn you usually just:

- use **Cross‑validation** (`cv=5`, `cv=10`) to reduce noise,  
- limit total number of combinations (`n_iter` for randomized search, small grids for grid search),  
- and interpret the trade‑off: “more tuning = more compute = modest gains.”

---

## What to Tune (Typical Patterns)

For common supervised models in Flow‑style labs, focus on:

- **Trees and forests**:
  - `max_depth`  
  - `n_estimators`  
  - `min_samples_split` / `min_samples_leaf`  
  - `max_features`

- **Linear / Regularized models**:
  - `C` (inverse regularization strength)  
  - `alpha` (L1/L2 regularization parameter)  
  - polynomial degree / feature complexity

- **Ensembles and others**:
  - learning rate  
  - subsample / sampling ratios  
  - number of boosting rounds (if you later use `XGBoost`‑style stacks)

Avoid tuning **everything at once**.  
Pick 2–4 most influential hyperparameters and tune them first, then optionally refine.

---

## Choosing the Right Metric and Validation Strategy

Hyperparameter tuning is only as good as its **evaluation**:

- **Binary classification** → `f1`, `precision`, `recall`, `roc_auc`, depending on business priority.  
- **Multiclass classification** → `accuracy`, `f1_macro`, `precision_macro`.  
- **Regression** → `neg_mean_squared_error`, `neg_mean_absolute_error`, sometimes `r2`.

Always:

- use **cross‑validation** (`cv` in `GridSearchCV`/`RandomizedSearchCV`) so the search is stable.  
- keep a **held‑out test set** untouched until the *final* evaluation, to avoid over‑optimistic scores.

Example metric‑aware search:

```python
grid_search = GridSearchCV(
    estimator=model,
    param_grid=param_grid,
    cv=5,
    scoring="f1",
    n_jobs=-1,
)
```

Here, the search procedure internally uses `f1` on cross‑validation folds to compare parameter sets.

---

## When to Stop Tuning

Hyperparameter tuning is an **engineering choice**, not a magic button.  
Ask:

- How much performance gain are you getting per extra core‑hour / GPU‑hour?  
- Are you chasing marginal gains on a small dataset or a noisy target?  
- Does the team understand the tuned model better or worse?

In Flow‑style contexts, it is often better to:

- tune once to a **good enough** configuration,  
- then invest time in features, data quality, and deployment,  
- rather than exhaustively scraping the last 0.5% of performance.

---

## Practical Exercises (Intermediate)

### Exercise 1: Tune a Flow‑Style Model

Take a supervised learning lab from the Flow‑style curriculum:

- Choose a model (e.g., `RandomForestClassifier`, `LogisticRegression`, `XGBClassifier` if available).  
- Define a small but sensible grid or distribution of hyperparameters.  
- Run `GridSearchCV` or `RandomizedSearchCV` and compare the best‑scoring model to your default one.

### Exercise 2: Compare Grid vs. Random

On the same dataset and model:

- Run one tuning with `GridSearchCV` (small grid).  
- Run another with `RandomizedSearchCV` (similar number of points).  
- Compare:  
  - best‑scored performances,  
  - wall‑time,  
  - and how many of the “good” configurations they found.

Write a short note on which strategy you prefer and why.

### Exercise 3: Design a Tuning Plan

For your **next** Flow‑style supervised problem (e.g., “predict course completion”):

- Write a short tuning plan:  
  - Which model you will tune,  
  - Which 2–4 hyperparameters matter most,  
  - Which validation metric you will optimize,  
  - How much compute time you will allow.

This becomes the outline you can plug into `GridSearchCV` or `RandomizedSearchCV` later.

---

## Self‑Assessment

Rate yourself from 1 to 5:

- I can explain the difference between parameters and hyperparameters.  
- I can apply `GridSearchCV` or `RandomizedSearchCV` to a Flow‑style model.  
- I can choose a meaningful metric and validation strategy for tuning.  
- I can recognize when to stop tuning and move to other work.

Action item: write a short note in your lab repo describing the **best hyperparameter set** you found for one Flow‑style model and how it changed performance.

## Next Steps

- Read `04-evaluation-and-bias.md` next to learn how to evaluate tuned models and diagnose bias or unfair‑looking behavior.  
- Use hyperparameter tuning as a **routine step** in supervised learning labs, not an afterthought.  
- Treat “tuning” as a **budgeted engineering task**: you tune to an acceptable threshold, then move on.

---

*This lesson gives Flow Initiative trainees an intermediate‑level understanding of hyperparameter tuning in supervised ML systems, focusing on when to tune, which methods to use, and how to connect tuning to metrics and validation in Flow‑style labs.*