---
id: ml-libraries
title: ML Libraries
track: ai-ml
level: beginner
version: 1.0
---

# ML Libraries

## Learning Objectives

By the end of this lesson, you will be able to:

- Explain the main Python libraries used in ML (NumPy, pandas, scikit‑learn, and plotting).  
- Use these libraries to load, transform, and train simple models.  
- Choose the right library for each task in a Flow‑style lab.  
- Integrate basic model training into your Jupyter notebooks.

## Introduction

Machine learning in Python is powered by **libraries** — reusable code that implements algorithms and tools.  
You do not need to write everything from scratch.  
Instead, you:

- **Choose** the right library,  
- **Import** it, and  
- **Call functions** that do the hard work.

In this lesson, you will learn how to use the core **ML stack**:

- `numpy` for arrays,  
- `pandas` for data,  
- `scikit-learn` for models,  
- and visualization libraries (`matplotlib`/`seaborn`).

This is the **practical toolkit** you will reuse in Flow‑style labs.

---

## Setting Up Your Environment

To use these libraries, make sure they are installed:

```bash
pip install numpy pandas scikit-learn matplotlib seaborn
```

Then, import them in your notebook:

```python
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
```

This gives you everything you need for:

- data handling,  
- model training, and  
- evaluation.

---

## NumPy

NumPy is the **foundation** for numerical computing in Python.  
It provides:

- **arrays** for numeric data,  
- **functions** for mathematical operations.

Example:

```python
# Create a 1D array
x = np.array()[1][2][3][4]

# Compute mean
print(np.mean(x))
```

NumPy is used by almost every ML library.  
If you understand arrays and basic operations, you can work with ML data structures.

---

## pandas

pandas is the **standard library** for data analysis and manipulation.  
It provides:

- **DataFrames** for tabular data (like spreadsheets),  
- **Series** for single columns.

Example:

```python
# Create a DataFrame
data = pd.DataFrame({
    "x":,[2][3][4][1]
    "y":[4][5][6][2]
})

# View first few rows
print(data.head())
```

pandas is often the **first tool** you use to load and explore a dataset.

---

## scikit‑learn

scikit‑learn is the **workhorse** for classical ML in Python.  
It provides:

- **algorithms** for classification, regression, clustering, and more,  
- **tools** for model evaluation, cross‑validation, and hyperparameter tuning.

Example: training a simple linear regression model:

```python
# Prepare data
X = data[["x"]]
y = data["y"]

# Split into train and test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate
mse = mean_squared_error(y_test, y_pred)
print("MSE:", mse)
```

scikit‑learn is where you will start if you are learning ML, because it is **simple and powerful**.

---

## Visualization Libraries

Visualization is essential for understanding data and models.  
Common libraries include:

- **matplotlib** for simple, low‑level plots.  
- **seaborn** for higher‑level, statistical plots.

You already saw examples of histograms, bar plots, scatter plots, and line plots.  
These libraries let you visualize everything from data distributions to model performance.

---

## Why This Matters for Flow Engineers

Flow‑style engineers will:

- Use these libraries to **build and experiment** with ML models.  
- Work in **Jupyter notebooks** and **scripts**.  
- Need to **install, manage, and version** these libraries.

Understanding these libraries helps you:

- see the **big picture** of ML tools,  
- choose the right library for each task,  
- and avoid fragmentation and confusion.

In African‑centric contexts, this is especially important when:

- You are **building or sharing** ML tools with others.  
- You need to **deploy** models in production.  
- You must **keep** dependencies manageable and **secure**.

---

## Practical Exercises

### Exercise 1: Train a Model

Use a dataset from a Flow‑style lab:

- Load it into a notebook.  
- Train a simple model (e.g., linear regression, decision tree).  
- Evaluate its performance using scikit‑learn metrics.

### Exercise 2: Visualize the Results

After training the model:

- Plot the predictions vs. the true values.  
- Plot the loss or error over time.  
- Write a short Markdown cell describing the results.

### Exercise 3: Compare Libraries

Compare NumPy, pandas, and scikit‑learn:

- For each library, write one sentence describing its purpose.  
- For each library, write one sentence describing when you would use it.

---

## Self‑Assessment

Rate yourself from 1 to 5:

- I understand the main Python libraries for ML.  
- I can import and use them in a notebook.  
- I can train a simple model using scikit‑learn.  
- I can visualize the results using matplotlib/seaborn.

Action item: write a short note in your lab repo describing which library you used most in a Flow‑style lab and why.

## Next Steps

- Read `04-linear-models.md` next to learn how to use linear models for supervised learning.  
- Use these libraries as your **core toolkit** for ML work.  
- Treat them as the **practical environment** for ML.

---

*This lesson gives Flow Initiative trainees an overview of the core ML libraries in Python, focusing on NumPy, pandas, scikit‑learn, and visualization tools as the building blocks for ML work.*