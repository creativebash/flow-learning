---
id: transformers
title: Transformers
track: ai-ml
level: advanced
version: 1.0
---

# Transformers

## Learning Objectives

By the end of this lesson, you will be able to:

- Explain what a **transformer** is and why it is a “drop‑in” replacement for RNNs in many ML tasks [web:252][web:259].  
- Describe the core idea of **self‑attention** and how it captures long‑range dependencies in sequences [web:252][web:258].  
- Sketch the overall **encoder‑decoder** and **decoder‑only** transformer patterns used in models like BERT and GPT‑family LLMs [web:253][web:259].  
- Connect transformers to the Flow‑style view of ML: **data → embeddings → attention → prediction**.

## Introduction

**Transformers** are a class of neural architectures that have become the backbone of modern language models, vision‑based models, and other sequence‑style systems [web:252][web:259].  
Unlike older recurrent networks that process data step‑by‑step, transformers use an **attention mechanism** to weigh the importance of every element in the input relative to every other element [web:252][web:258].

In practice, this means:

- they can learn **long‑range relationships** in text, code, or sequences,  
- they can be trained **in parallel** (much faster than RNNs),  
- and they generalize to many downstream tasks via fine‑tuning.

For Flow engineers, transformers are not magic; they are a **pattern** for turning sequences into structured, context‑aware representations.

---

## Why Transformers Exist

Before transformers, many sequence tasks used:

- **RNNs** (Recurrent Neural Networks),  
- **LSTMs**, or **GRUs**.

These models process one token at a time and pass a “hidden state” forward. This has two big problems [web:253][web:259]:

1. **They are slow to train** because each step must wait for the previous one.  
2. **Long‑range dependencies are hard**; the hidden state can forget distant tokens.

Transformers were introduced to fix this. The core idea: instead of relying on hidden‑state propagation, let **each token talk to all the others** through attention.

---

## The Core Idea: Self‑Attention

### Intuition

In **self‑attention**, every token in a sequence asks:

- “Which other tokens should I pay attention to in order to understand my own meaning?”

Each token produces a **context‑aware embedding** that mixes information from the entire sequence, not just nearby neighbors [web:252][web:258].

### Mechanism (Conceptual)

Roughly, for each token in the sequence:

1. Convert it into three vectors:  
   - **Query** (`Q`) — what this token is “looking for”.  
   - **Key** (`K`) — how well this token matches other queries.  
   - **Value** (`V`) — what this token contains to share.

2. For token `i`, compute scores against every token `j` using `Q_i` and `K_j` (often a dot product).  
3. Normalize these scores into attention weights (e.g., via softmax).  
4. Weight the `V` vectors of all tokens by these attention weights and sum them.  
5. The result is a new embedding for token `i` that incorporates information from the whole sequence.

In pseudo‑math, the attention output for one token is:

`attention_output = sum(attention_weights_j * V_j)`

This is often called **scaled dot‑product attention**, and it is repeated in multiple “heads” (multi‑head attention) to let the model capture different kinds of relationships at once [web:252][web:255][web:258].

### Why It Works

Self‑attention lets the model:

- focus on **distant tokens** when necessary (e.g., the subject of a sentence far away),  
- avoid the “forgetting” problems of RNNs, and  
- learn **parallelizable patterns** that speed up training and inference.

---

## Transformer Architecture (Encoder‑Decoder)

The classic transformer is an **encoder‑decoder** architecture [web:252][web:259]:

### 1. Tokenization & Embedding

- The input sequence (e.g., a sentence) is split into **tokens**.  
- Each token is mapped to a **word embedding** vector and combined with a **positional embedding** (so the model knows the order of tokens) [web:252][web:259].

These embeddings are then passed through several identical **transformer blocks** in both encoder and decoder.

### 2. Encoder

The **encoder** takes the input sequence and:

- repeatedly applies **self‑attention** to build rich, context‑aware representations,  
- passes these through a **feed‑forward network** (e.g., a small MLP) to refine the representations.

Each encoder block:

- attends to all tokens in the input,  
- learns how each token relates to the others,  
- and outputs a stack of refined embeddings.

The encoder’s final output is a contextualized representation of the input, often used as “context” for tasks like translation or summarization.

### 3. Decoder

The **decoder** generates the output sequence, such as a translated sentence or a completion.

It:

- also uses self‑attention on the output tokens it has generated so far,  
- uses **cross‑attention** to attend back to the encoder’s outputs (this is how the decoder “remembers” the input),  
- then applies a feed‑forward network.

Because the decoder generates tokens one at a time, it is often **auto‑regressive**: the prediction for token `t` depends on the outputs for tokens `1` to `t-1` [web:253][web:259].

---

## Variants: Only‑Encoder and Only‑Decoder

In practice, people often use **subsets** of the full transformer pattern.

### Only‑Encoder (e.g., BERT‑style)

- You keep the **encoder** part and drop the decoder.  
- You feed the context‑aware embeddings into a task‑specific head (e.g., classification, NER, or QA).  
- Training often uses objectives like **masked language modeling** (predicting masked tokens), which forces the model to understand context.

This is common for tasks such as:

- document classification,  
- named‑entity recognition,  
- sentence similarity.

### Only‑Decoder / Decoder‑Only (e.g., GPT‑style)

- You keep the **decoder** part and train it to predict the next token in a sequence, given the previous ones.  
- This is typically **auto‑regressive**: each token is generated based on all prior tokens.

This pattern is the backbone of many large language models (LLMs) and tools that generate text, code, or explanations.

---

## How Transformers Fit Into the Flow‑Style Pipeline

From a Flow‑engineer perspective, a transformer‑based model can be viewed as a pipeline:

`input sequence → tokenizer → embeddings → attention layers → feed‑forward layers → prediction`

At each stage:

- **Tokenization** converts text or structure into a sequence of tokens.  
- **Embeddings** map tokens into vectors.  
- **Attention** mixes information across the entire sequence.  
- **Feed‑forward** layers refine and transform the representations.  
- **Head** is a small network layer on top that produces the final output (e.g., a class, a next token, or a continuous value).

This is very similar to the supervised‑learning pattern you already know:

- features → transformation → representation → decision.

Transformers simply bring **sequence‑aware representations** and **attention‑style mixing** into the middle of that pipeline.

---

## When to Use Transformers

Transformers are powerful but not always necessary.  
They shine when you have:

- **Sequences of data** (text, code, time‑series, logs, etc.),  
- **Long‑range dependencies** that are hard to capture with simple models,  
- or tasks that benefit from **context‑aware embeddings** (e.g., language understanding, code comprehension, or complex recommendation logic).

In Flow‑style systems, transformers are useful:

- for **language‑style problems** (e.g., explaining learning‑progress, governance‑policy reasoning, or conversation‑style assistants).  
- for **structured‑text problems** (e.g., logs, reports, or code‑quality‑related tasks).

However, for simple tabular problems, classic supervised‑learning models may be faster, easier, and sufficient.

---

## Practical Exercises

### Exercise 1: Sketch a Transformer Pipeline

Pick a Flow‑style task that involves sequences (e.g., text‑based learning explainers):

- Sketch the pipeline:

  - input → tokenize → embed → attention → feed‑forward → output head.  
- Write a short note describing how attention helps in this task compared to treating the sequence as a flat bag of words.

### Exercise 2: Explore a Simple Transformer‑Style Model

Using a small library like `transformers` (from Hugging Face) or a minimal example:

- Load a pre‑trained encoder‑only model (e.g., a BERT‑style tokenizer and model).  
- Pass a short sentence through it and inspect the contextual embeddings.  
- Reflect on how the embeddings differ from a simple bag‑of‑words vector.

### Exercise 3: Design a Minimal Use Case

For the same lab:

- Design a minimal use case where a transformer would improve performance over a non‑sequence model.  
- List the data, the task, and the expected benefits.

---

## Self‑Assessment

Rate yourself from 1 to 5:

- I can explain what a transformer is and how it differs from RNNs.  
- I can explain self‑attention in simple terms.  
- I can sketch the encoder‑decoder transformer architecture and describe its stages.  
- I can see where transformers fit into the Flow‑style ML pipeline.

Action item: write a short note in your lab repo describing one transformer‑style model you might use in a Flow‑style project and why it is better than a non‑sequence model.

## Next Steps

- Read `02-graph-neural-networks.md` next to explore how graph‑based architectures extend the idea of “relational” representations to non‑sequence structures.  
- Use transformers as a **tool** for sequence‑rich problems, not as a universal default.  
- Keep the Flow‑style view: **data → embeddings → attention/relational representation → prediction**.

---

*This lesson gives Flow Initiative trainees an advanced‑level understanding of transformers in ML systems, focusing on how self‑attention works, how transformers are architected, and how they fit into the Flow‑style pipeline for sequence‑rich problems.*