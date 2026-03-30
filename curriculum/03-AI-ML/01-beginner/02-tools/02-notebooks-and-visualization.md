---
id: notebooks-and-visualization
title: Notebooks and Visualization
track: ai-ml
level: beginner
version: 1.0
---

# Notebooks and Visualization

## Learning Objectives

By the end of this lesson, you will be able to:

- Explain the role of **Jupyter notebooks** in the ML workflow.  
- Load and explore a dataset in a notebook.  
- Create simple **plots and visualizations** (line, bar, histogram, scatter).  
- Use visualization to **debug data quality and model behavior**.  
- Save and share notebooks as part of your Flow‑style lab work.

## Introduction

A machine learning project is not just code. It is:

- data,  
- experiments,  
- visualizations, and  
- explanations.

**Jupyter notebooks** are the standard tool for combining these pieces in one place.  
In a notebook, you can:

- load data,  
- train a model,  
- plot results, and  
- write explanations — all in the same document.

This is extremely useful for:

- exploratory data analysis,  
- debugging, and  
- sharing your work with other engineers or mentors.

In the Flow Initiative, you will use notebooks to:

- explore curriculum datasets,  
- prototype models, and  
- create visual dashboards for your labs.

## What Is a Jupyter Notebook?

A **Jupyter notebook** is an interactive document made of **cells**:

- **Code cells** run Python (or other languages).  
- **Markdown cells** let you write text, lists, and math (`y = wx + b`).  
- **Output cells** show printed results, plots, or errors.

You can run cells one at a time, revise them, and re‑run them.  
This makes notebooks perfect for **experimentation** and **quick iteration**.

---

## Setting Up a Notebook for ML

Before you start, you usually:

1. Import the libraries you need:

   ```python
   import numpy as np
   import pandas as pd
   import matplotlib.pyplot as plt
   import seaborn as sns
   ```

2. Set up visualization style (optional):

   ```python
   plt.style.use("default")
   sns.set_palette("husl")
   ```

3. Load a dataset:

   ```python
   data = pd.read_csv("path/to/your/data.csv")
   ```

Once the data is loaded, you are ready to explore.

---

## Exploring Data with Plots

Visualization helps you **see the data** instead of just reading numbers.  
Common plots for ML include:

### 1. Histograms

A **histogram** shows the distribution of a numeric variable (e.g., scores, ages, prices).

```python
plt.hist(data["score"], bins=20)
plt.xlabel("Score")
plt.ylabel("Frequency")
plt.title("Distribution of Scores")
plt.show()
```

A histogram can show:

- whether the data is skewed,  
- if there are outliers,  
- or if most values cluster in a narrow range.

### 2. Bar Plots

A **bar plot** shows counts or averages for categorical variables (e.g., subjects, cities, categories).

```python
value_counts = data["subject"].value_counts()
value_counts.plot(kind="bar")
plt.xlabel("Subject")
plt.ylabel("Count")
plt.title("Number of Students by Subject")
plt.show()
```

Bar plots help you see which categories are dominant or missing.

### 3. Scatter Plots

A **scatter plot** shows the relationship between two numeric variables.

```python
plt.scatter(data["hours_studied"], data["score"])
plt.xlabel("Hours Studied")
plt.ylabel("Score")
plt.title("Hours Studied vs. Score")
plt.show()
```

Scatter plots can reveal:

- trends (e.g., more study → higher scores),  
- clusters, or  
- unusual patterns (e.g., high study but low score).

### 4. Line Plots

A **line plot** shows how a value changes over time or index.

```python
plt.plot(data["week"], data["average_score"])
plt.xlabel("Week")
plt.ylabel("Average Score")
plt.title("Average Score Over Time")
plt.show()
```

Line plots are useful for tracking model performance or learning curves.

---

## Using Visualization to Debug Data Quality

Visualization is not just for “nice charts.” It is a **debugging tool**.

### 1. Check for Missing Values

```python
missing = data.isna().sum()
missing.plot(kind="bar")
plt.title("Missing Values per Column")
plt.show()
```

If some columns have many missing values, you may need to clean or impute them.

### 2. Detect Outliers

```python
plt.boxplot(data["score"].dropna(), vert=False)
plt.xlabel("Score")
plt.title("Boxplot of Scores")
plt.show()
```

Boxplots show outliers and extreme values. You can decide whether to remove or correct them.

### 3. Compare Train and Test Data

```python
plt.hist(data["target_train"], bins=20, alpha=0.5, label="Train")
plt.hist(data["target_test"], bins=20, alpha=0.5, label="Test")
plt.xlabel("Target")
plt.ylabel("Frequency")
plt.title("Train vs. Test Target Distribution")
plt.legend()
plt.show()
```

If the distributions are very different, the model may not generalize well.

---

## Why This Matters for Flow Engineers

Flow‑style engineers will:

- Use notebooks to **explore and understand** real‑world data.  
- Create **visualizations** for dashboards and reports.  
- Share notebooks with mentors, collaborators, or communities.

Visualization helps you:

- **communicate** complex ideas simply.  
- **find** issues in the data.  
- **show** the value of your models to non‑technical stakeholders.

In African‑centric contexts, this is especially important when:

- Data is noisy or fragmented.  
- Models must be **transparent and explainable**.  
- You need to **build trust** with users and communities.

---

## Practical Exercises

### Exercise 1: Explore a Dataset

Pick a dataset from a Flow‑style lab:

- Load it into a notebook.  
- Create a histogram, bar plot, and scatter plot for different columns.  
- Write a short Markdown cell describing what each plot shows.

### Exercise 2: Debug Missing Values

Add some missing values to a dataset (or use a dataset with missing values):

- Visualize the missing values per column.  
- Decide how to handle them (e.g., drop or impute).  
- Show the data before and after.

### Exercise 3: Plot a Model’s Loss

Train a simple model (e.g., linear regression) in a notebook:

- Plot the loss over epochs.  
- Add a horizontal line for the final loss.  
- Write a short description of the loss curve.

---

## Self‑Assessment

Rate yourself from 1 to 5:

- I can explain what a Jupyter notebook is.  
- I can load a dataset and plot it in a notebook.  
- I can use visualization to debug data quality.  
- I can share a notebook as part of my lab work.

Action item: write a short note in your lab repo describing one visualization you created and what it taught you.

## Next Steps

- Read `03-model-evaluation.md` next to learn how to evaluate models using metrics and visualizations.  
- Use notebooks and visualization as core tools for your ML‑backed projects.  
- Treat visualization as a **first‑class debugging and communication skill**, not just decoration.

## Video

<div style={{position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%'}}>
  <iframe
    src="https://www.youtube.com/embed/9QBSkiYqPxs"
    title="Notebooks and Visualization for Machine Learning"
    style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0}}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  />
</div>

---

*This lesson gives Flow Initiative trainees an engineer‑style understanding of notebooks and visualization in ML systems, focusing on Jupyter, data exploration, and using plots to debug and communicate.*