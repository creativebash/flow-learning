---
id: reinforcement-learning
title: Reinforcement Learning
track: ai-ml
level: advanced
version: 1.0
---

# Reinforcement Learning

## Learning Objectives

By the end of this lesson, you will be able to:

- Explain what **reinforcement learning (RL)** is and how it differs from supervised learning [web:286][web:289].  
- Identify the core components: **agent**, **environment**, **state**, **action**, **reward**, and **policy** [web:282][web:285].  
- Describe the feedback loop: agent–environment interaction over time, maximizing cumulative reward [web:282][web:288].  
- Sketch a minimal RL‑style learning loop for a Flow‑style sequential decision problem.

## Introduction

Most of this curriculum focuses on **supervised learning** (map inputs → labels) and **architectures** (transformers, GNNs, etc.).  
**Reinforcement learning (RL)** is a different paradigm: the model (**agent**) learns by **interacting with an environment**, taking actions, and receiving **reward** signals [web:282][web:288].

From a Flow‑engineer perspective, RL is useful when decisions:

- unfold over time,  
- affect future states, and  
- need to be **optimized by trial and feedback**, not just static labels.

In this lesson, you will see RL as a **pattern** for systems that learn by doing, with delayed feedback and long‑term planning.

---

## What Is Reinforcement Learning?

In **reinforcement learning**, there is no fixed dataset of input–label pairs.  
Instead there is a **feedback loop** between two entities [web:282][web:285]:

- **Agent**: the learner and decision‑maker (e.g., a policy‑driven controller).  
- **Environment**: everything the agent interacts with (e.g., a simulated world, a platform’s state, or a governance‑proposal‑flow).

At each timestep `t`:

1. The **agent observes a state** `s_t`.  
2. The **agent chooses an action** `a_t` based on its **policy** `π`.  
3. The **environment transitions** to a new state `s_{t+1}` and returns a **reward** `r_t`.  
4. The **agent updates its policy** (or value estimates) using `r_t` and `s_{t+1}`.

The goal of RL is not to classify or predict one snapshot, but to learn a **policy** `π` that maximizes **cumulative reward** over time [web:282][web:288].

---

## Core Concepts

### 1. Agent

The **agent** is the decision‑making entity.  
It can be:

- a simple rule‑based controller,  
- a neural network,  
- or a more complex program that incorporates memory and learning.

The agent’s job is to select **actions** in each **state** to maximize long‑term reward.

### 2. Environment

The **environment** defines:

- what states are possible,  
- what actions are allowed in each state,  
- how the state evolves after an action, and  
- what rewards are returned.

Environments can be:

- discrete (e.g., grid‑worlds, turn‑based games),  
- continuous (e.g., robotics, control systems),  
- simulated (e.g., learning‑platform states, governance‑workflows).

### 3. State, Action, and Reward

- **State `s`**: a description of the environment at a point in time (e.g., which lesson a learner is on, what phase a proposal is in).  
- **Action `a`**: a decision the agent can take (e.g., “suggest lesson X”, “promote proposal Y”, “wait”).  
- **Reward `r`**: a scalar signal that tells the agent how well the action worked. Positive for good outcomes, negative for bad ones.

The agent does **not** know the “right” action for each state; it must **discover good policies by trial and feedback** [web:282][web:287].

### 4. Policy and Value

- **Policy `π(s) → a`**: a mapping from states to actions. The policy is what the agent learns.  
- **Value function `V(s)` or `Q(s, a)`**: estimates how good it is to be in a state (or to take a specific action in that state), in terms of expected future reward [web:281][web:282].

By learning good value functions, the agent can choose actions that look good not just immediately, but over the long run.

---

## How RL Differs from Supervised Learning

In **supervised learning**:

- You are given pairs `(x, y)`.  
- The model learns to map `x → y` to minimize prediction error (e.g., classification or regression) [web:286][web:289].

In **reinforcement learning**:

- There are no explicit correct‑action labels for each state.  
- Feedback comes as **scalar rewards** (often delayed and sparse) after sequences of actions.  
- The goal is to **maximize cumulative reward**, not match a label [web:286][web:288].

In short:

- **Supervised learning** = learn from labeled examples.  
- **Reinforcement learning** = learn from trial‑and‑error feedback over time.

---

## The RL Feedback Loop

A simple RL‑style loop looks like this:

1. **Initialize** the agent’s policy and value estimates.  
2. **For many episodes or timesteps**:

   a. Observe current state `s_t`.  
   b. Choose action `a_t` using the current policy (often with some exploration).  
   c. Execute `a_t` in the environment.  
   d. Observe new state `s_{t+1}` and reward `r_t`.  
   e. Update the policy or value estimates using `(s_t, a_t, r_t, s_{t+1})`.

3. **Repeat** until the agent’s policy performs well on the task.

This is very similar to supervised learning in that:

- there is a training loop,  
- the model is updated based on feedback.

But the feedback is **delayed, cumulative, and contextual**, so the agent must think in **sequences**.

---

## When to Use RL

RL is powerful for **sequential decision‑making** problems where:

- decisions affect future states,  
- the “right” action is not obvious from static labels, and  
- you have a way to simulate or observe rewards over time.

In Flow‑style contexts, RL can be useful for:

- **learning‑path optimization** — suggesting sequences of lessons that maximize long‑term learning outcomes.  
- **governance‑workflow assistants** — deciding which proposals to push first in a pipeline.  
- **personalized engagement** — choosing interventions that balance short‑term and long‑term user health.

However, RL is often **complex and data‑hungry** compared with supervised learning, so it should not be the default choice.

---

## Practical Exercises

### Exercise 1: Sketch an RL‑Style Problem

Pick a Flow‑style process that unfolds over time (e.g., a learning‑path suggestion flow or a proposal‑triage workflow):

- Define:  
  - agent,  
  - environment,  
  - state,  
  - actions,  
  - and reward.  
- Write a short note describing the RL‑style loop for this problem.

### Exercise 2: Translate to a Simple RL‑Loop

Using a simple tabular or approximate RL algorithm (e.g., Q‑learning) or a framework (e.g., `gymnasium`, `rl‑env`, or a custom simulator):

- Implement a small RL‑style loop that:

  - observes state,  
  - chooses an action,  
  - observes reward and next state,  
  - and updates an estimate of action value.

- Run this in a simple environment (e.g., a grid, a small process graph).

This gives you a minimal “RL‑style” intuition outside of full‑scale deep RL.

### Exercise 3: Compare Supervised and RL Approaches

For the same problem:

- Write a short note comparing:  
  - A **supervised** approach (e.g., predict the “best next action” from a fixed dataset),  
  - and an **RL** approach (learn from rewards over time).

Reflect on when each is more appropriate.

---

## Self‑Assessment

Rate yourself from 1 to 5:

- I can explain what reinforcement learning is and how it differs from supervised learning.  
- I can identify the core components: agent, environment, state, action, reward, and policy.  
- I can describe the RL feedback loop and sketch a minimal RL‑style training loop.  
- I can see where RL fits into Flow‑style sequential‑decision problems.

Action item: write a short note in your lab repo describing one RL‑style problem you might tackle in a Flow‑style system and why RL is better than a static supervised‑learning model.

## Video

<div style={{position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%'}}>
  <iframe
    src="https://www.youtube.com/embed/1OI0uuz9jkI"
    title="Intro to Reinforcement Learning Made Simple"
    style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0}}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  />
</div>

---

## Next Steps

- Read `01-paper-replication.md` next to explore how to study and implement RL‑related research.  
- Use RL as a **tool** for sequential, feedback‑based decision‑making, not as a universal default.  
- Keep the Flow‑style view: **environment → state → action → reward → policy update**.

---

*This lesson gives Flow Initiative trainees an advanced‑level understanding of reinforcement learning in ML systems, focusing on the agent–environment feedback loop, core concepts like state, action, reward, and policy, and how RL fits into Flow‑style sequential‑decision problems.*