---
id: feature-engineering
title: Feature Engineering
track: ai-ml
level: intermediate
version: 1.0
---

# Feature Engineering

## Learning Objectives

By the end of this lesson, you will be able to:

- Explain what feature engineering is and why it matters more than tuning algorithms.  
- Apply common techniques like scaling, encoding, interaction features, and time‑based features.  
- Spot places in a Flow‑style lab where feature engineering can improve performance.  
- Treat features as a first‑class design concern, not “just data cleaning.”

## Introduction

In supervised learning, your model only sees **features**, not raw reality.  
**Feature engineering** is the process of:

- choosing which information to represent,  
- how to represent it, and  
- how to transform it so that the model can learn more effectively.

In practice, **good features often matter more than a fancy algorithm**.  
Your goal in this lesson is to move from “just using raw columns” to **intentionally shaping features** for regression and classification.

---

## What Is Feature Engineering?

**Feature engineering** is the design of:

- which **inputs** (features) the model receives,  
- how those inputs are **encoded**, and  
- how they are **combined** or **transformed**.

It sits between:

- the **data pipeline** (previous lessons) and  
- the **model** (regression/classification, trees, etc.).

For Flow‑style engineers, think of features as the **bridge** between messy real‑world signals and clean numeric inputs the model can train on.

---

## Why Feature Engineering Matters

Model quality is limited by:

- how informative the features are,  
- how well they match the model’s assumptions.

If you:

- encode a categorical variable as a single number even when order doesn’t matter,  
- give the model raw timestamps instead of engineered time‑based features,  
- or omit meaningful interactions between variables,

then even the best model will struggle.

Conversely, well‑engineered features:

- reduce noise,  
- expose structure, and  
- make it easier for the model to learn.

---

## Common Feature Engineering Tasks

### 1. Scaling and Normalization

Many algorithms (e.g., linear models, gradient‑based optimizers) expect features on a **similar scale**.

Common patterns:

- **StandardScaler**:  
  converts each feature to `z‑score`,  
  with mean `0` and unit variance.

  ```python
  from sklearn.preprocessing import StandardScaler

  scaler = StandardScaler()
  X_scaled = scaler.fit_transform(X)
  ```

- **MinMaxScaler**:  
  scales each feature to `[0, 1]`.

  ```python
  from sklearn.preprocessing import MinMaxScaler

  scaler = MinMaxScaler()
  X_scaled = scaler.fit_transform(X)
  ```

In Flow‑style labs, use scaling when:

- combining features with very different units (e.g., age vs. clicks).  
- using algorithms sensitive to scale (e.g., linear models, clustering).

### 2. Encoding Categorical Variables

Categorical variables (e.g., country, course, role) must be mapped to numbers.

- **One‑hot encoding**:  
  creates a binary column for each category.

  ```python
  X_encoded = pd.get_dummies(X, columns=["country"])
  ```

- **Label encoding / target encoding**:  
  numeric encoding used when the variable has ordinal meaning or when you want compactness.

In Flow‑style contexts, be careful:

- **Avoid treating one‑hot encoded features as ordered**; use them only as indicators.  
- For high‑cardinality categories (e.g., ID‑like strings), consider bucketing or target encoding.

### 3. Interaction and Polynomial Features

Sometimes the relationship is **multiplicative** or **non‑linear**.

You can create:

- **Interaction terms**:  
  `x1 * x2`  
  to capture synergy between features.

- **Polynomial features**:  
  `x`, `x**2`, `x**3`  
  for curve‑like behavior.

```python
from sklearn.preprocessing import PolynomialFeatures

poly = PolynomialFeatures(degree=2, include_bias=False)
X_poly = poly.fit_transform(X)
```

Use this when:

- you suspect non‑linear relationships in your Flow‑style task (e.g., diminishing returns).  
- you want to push a simple model’s performance without changing the algorithm.

### 4. Time‑Based Features

For time‑series‑like or session‑based data:

- **Day‑of‑week, hour‑of‑day, weekend flag**.  
- **Time since last event** (e.g., days since last quiz).  
- **Rolling statistics**: moving average, rolling sum.

Example:

```python
data["day_of_week"] = data["timestamp"].dt.dayofweek
data["is_weekend"] = data["day_of_week"].isin().astype(int)[1][2]
```

These features can significantly improve models for:

- user engagement prediction,  
- churn or dropout risk,  
- or governance‑activity forecasting.

### 5. Aggregation Features

Aggregating event‑level data into person‑ or period‑level summaries is often the most powerful engineering.

For example:

- **Per‑user features**:  
  - average time spent per lesson,  
  - total number of quizzes completed,  
  - average score over the last 7 days.

- **Per‑period features**:  
  - weekly active users,  
  - transactions per day.

```python
user_features = (
    data
    .groupby("user_id")
    .agg(
        avg_score=("score", "mean"),
        n_quizzes=("quiz_id", "count"),
        last_activity=("timestamp", "max"),
    )
    .reset_index()
)
```

These aggregates often carry more signal than raw event logs.

### 6. Binning and Discretization

Sometimes it is better to **discretize** a continuous variable into bins:

- **quantiles** (e.g., low/medium/high),  
- **fixed thresholds** (e.g., < 50 points → “low”).

```python
bins =[3][4][5]
labels = ["low", "medium", "high"]
data["score_band"] = pd.cut(data["score"], bins=bins, labels=labels)
```

This is useful when:

- you want interpretable buckets for stakeholders.  
- the relationship is piecewise rather than smooth.

---

## Feature Engineering as a Design Process

At the intermediate level, feature engineering is not “just preprocessing.” It is a **design loop**:

1. **Hypothesize**:  
   - What relationships matter?  
   - What features might expose them?

2. **Build**:  
   - Add the feature to the data pipeline.  
   - Persist it for reuse.

3. **Evaluate**:  
   - Compare model performance with and without the feature.  
   - Check for overfitting and leakage.

4. **Iterate**:  
   - Drop noisy or redundant features.  
   - Tune the encoding or granularity.

For Flow‑style engineers, this means:

- documenting your features as clearly as you document code.  
- versioning feature definitions alongside models.

---

## Pitfalls and Best Practices

### Common Pitfalls

- **Data leakage**:  
  using future or target‑dependent information as a feature (e.g., event after the target time).  
  This creates unrealistic performance.

- **Over‑fitting via too many features**:  
  creating many highly granular, id‑specific features that work only on the training set.

- **Ignoring domain context**:  
  choosing features that are mathematically clever but meaningless to stakeholders.

### Best Practices

- **Make features reproducible and versioned** (part of the data pipeline).  
- **Log transformations and decisions** so others can audit them.  
- **Keep features interpretable** when possible (e.g., “days since last login” vs. an opaque embedding).  
- **Check for leakage** by asking: “Could the model see this at prediction time?”

---

## Practical Exercises (Intermediate‑Level)

### Exercise 1: Enrich a Flow‑Style Dataset

Pick a Flow‑style dataset with user or course‑interaction events:

- Add at least three engineered features (e.g., time‑based, aggregations, interactions).  
- Train a simple model (e.g., `RandomForestClassifier` or `LinearRegression`) before and after.  
- Measure and compare performance.

### Exercise 2: Spot Leakage

Take a dataset and a target you care about (e.g., “will dropout next week”):

- Write down all candidate features.  
- Identify which ones might leak future information.  
- Rewrite them to avoid leakage.

### Exercise 3: Design a Feature Set

For a Flow‑style supervised problem of your choice (e.g., “predict course completion”):

- Write a short feature spec:  
  - 5–10 features,  
  - their sources in the data pipeline,  
  - and how they relate to the business question.  
- Turn this into a repeatable transformation function (e.g., a `compute_features(...)` function).

---

## Self‑Assessment

Rate yourself from 1 to 5:

- I can explain what feature engineering is.  
- I can apply at least three common techniques (scaling, encoding, aggregations).  
- I can recognize feature leakage and avoid it.  
- I can design a feature set for a Flow‑style supervised problem.

Action item: write a short note in your lab repo describing one engineered feature you added and how it changed model performance.

## Next Steps

- Read `03-evaluation-and-bias.md` next to learn how to evaluate models and features more deeply.  
- Use feature engineering as a **core design activity** in every supervised learning lab.  
- Treat features as **first‑class artifacts** in your Flow‑style data‑ML pipeline.

---

*This lesson gives Flow Initiative trainees an intermediate‑level understanding of feature engineering in supervised ML systems, focusing on scaling, encoding, time‑based and aggregation features, and how to design features that improve model performance without leakage or over‑fitting.*