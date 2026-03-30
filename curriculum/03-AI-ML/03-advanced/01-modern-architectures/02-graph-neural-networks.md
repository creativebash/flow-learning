---
id: graph-neural-networks
title: Graph Neural Networks
track: ai-ml
level: advanced
version: 1.0
---

# Graph Neural Networks

## Learning Objectives

By the end of this lesson, you will be able to:

- Explain what a **graph** is in the ML context: nodes, edges, and structure [web:263][web:273].  
- Describe the **message‑passing (neighbourhood aggregation)** idea behind Graph Neural Networks (GNNs) [web:263][web:269].  
- Distinguish key GNN families: GCNs, GATs, and GraphSAGE‑style approaches [web:264][web:269].  
- See where GNNs differ from transformers and where they complement each other [web:267][web:273].  
- Sketch a minimal GNN‑style pipeline for a Flow‑style relational problem.

## Introduction

In many real‑world Flow‑style problems, data is not just rows in a table or tokens in a sequence; it is **relational**.  
Students, lessons, proposals, and community nodes form **networks** of connections, not isolated instances.

**Graph Neural Networks (GNNs)** are architectures designed to learn from **graph‑structured data**: nodes (entities) and edges (relationships) [web:263][web:269].  
They generalize ideas from CNNs and transformers to structured, relational settings.

In this lesson you will see GNNs as a **pattern** for turning graphs into rich, context‑aware node, edge, or graph‑level representations.

---

## What Is a Graph?

In ML, a **graph** is a structure containing:

- **Nodes** (vertices) — entities such as students, lessons, proposals, or governance actions.  
- **Edges** (links) — relationships such as “is enrolled in”, “depends on”, “follows”, or “co‑author”.

Mathematically, a graph is often written as `G = (V, E)`, where:

- `V` is the set of nodes,  
- `E` is the set of edges [web:263].

Each node can have features (e.g., a student’s engagement score), and each edge can have weights or types (e.g., “strong influence”, “weak dependency”).

---

## Why Graphs Matter

Many problems become clearer when you model them as graphs:

- **Social / learning networks** — students connected by collaborations, mentorship, or shared paths.  
- **Knowledge graphs** — lessons, prerequisites, and outcomes linked together.  
- **Infrastructure networks** — governance‑proposals depending on each other, or services forming a dependency graph.

Traditional models treat each student or lesson as an isolated record.  
GNNs can instead **follow the links** between entities, learning how local neighborhoods influence behavior.

---

## The Core Idea: Message Passing

### Intuition

In a **graph**, information flows along edges:

- each node gathers signals from its neighbors,  
- updates its own representation,  
- and passes new messages outward.

This is called **message passing** or **neighbourhood aggregation** [web:263][web:273].

In simple terms, a GNN block does:

- take each node’s features,  
- aggregate features from its immediate neighbors,  
- combine them into a new node embedding,  
- repeat over several layers so information can reach farther nodes.

---

### How It Works (Conceptual)

Roughly, for each node `v` in the graph [web:263][web:269]:

1. Collect the current embeddings of all neighbors `u` of `v`.  
2. Apply a transformation (e.g., a small neural net) to each neighbor embedding.  
3. Aggregate these transformed embeddings (often via sum, mean, or max).  
4. Combine this aggregated message with node `v`’s own embedding.  
5. Optionally normalize the result and store it as the new embedding for `v`.

After several layers, each node’s embedding reflects not only its own features, but also the structure of its neighborhood and the attributes of nearby nodes.

---

## Variants of GNNs

Different GNN families tweak the “how do I aggregate?” rule.

### 1. Graph Convolutional Networks (GCNs)

GCNs extend the intuition of convolution to graphs [web:263][web:264].  
Each node aggregates a **weighted average** of its neighbors’ features, where the weights are often determined by the graph structure.

GCNs are good for tasks where:

- the local topology (who is connected to whom) matters a lot,  
- and the relationships are relatively uniform (no need to dynamically weight neighbors).

### 2. Graph Attention Networks (GATs)

GATs add **attention** over neighbors [web:264][web:265].  
Instead of a fixed averaging rule, each node learns to assign **importance scores** to its neighbors and then aggregates only the most relevant ones.

This is conceptually similar to transformer self‑attention, but with a key difference:

- transformers typically treat the sequence as a **fully connected graph** (any token can attend to any token),  
- GATs restrict attention to the **explicit graph edges** (so you can’t attend to nodes that are not connected) [web:267][web:270].

### 3. GraphSAGE‑Style Models

GraphSAGE‑style approaches sample neighbors instead of using the full neighborhood.  
They learn how to aggregate a **fixed‑size neighborhood sample**, which makes them scalable to large graphs where a node may have many neighbors.

These are good for:

- massive interaction graphs (e.g., social or recommendation graphs),  
- settings where you want to control memory and computation per node.

---

## How GNNs Differ from Transformers

Transformers and GNNs both deal with **structured data**, but they make different assumptions [web:267][web:273].

### Transformers

- Assume **sequences** of tokens connected by positions.  
- Use **global self‑attention**: every token can attend to every other token, more or less independently of an explicit graph.  
- Are great for text, code, and time‑series where order and global context matter.

### GNNs

- Assume **explicit graphs** (nodes + edges).  
- Use **local‑neighbourhood aggregation**: each node primarily talks to its graph‑neighbors, possibly with attention.  
- Are great for relational systems, such as networks of students, lessons, and proposals.

One way to think about it:

- A **sequence is a special kind of graph** (linear chain of nodes with edges between consecutive tokens).  
- In that view, **transformers are a kind of GNN**, but with a very dense (fully connected) adjacency matrix and special handling of order and masking [web:267][web:273].

---

## GNNs in the Flow‑Style Pipeline

From a Flow‑engineer perspective, a GNN‑based model maps:

`graph data → node/edge features → message‑passing layers → aggregated embeddings → prediction`

At each stage:

- **Graph construction** converts your domain objects (students, lessons, proposals) into nodes and edges.  
- **Feature assignment** gives each node and edge meaningful attributes.  
- **Message‑passing layers** propagate information along edges, enriching node embeddings.  
- **Aggregation** summarizes the final embeddings (per‑node, per‑edge, or per‑graph).  
- **Head** is a small network layer that produces the final output (e.g., prediction of student risk, lesson difficulty, or proposal success).

This is very similar to the earlier supervised‑learning and transformer pipelines: **data → transformation → representation → decision**.  
GNNs just add the **graph layer** in the middle.

---

## When to Use GNNs

GNNs shine when your data is inherently relational and you want to exploit links between entities [web:263][web:269].

In Flow‑style systems, consider GNNs for:

- **Learning‑network analysis** — students linked by collaborations, co‑enrollment, or mentorship.  
- **Knowledge‑graph‑style systems** — lessons, prerequisites, and learning paths as a graph.  
- **Governance‑proposal‑dependency graphs** — proposals that depend on each other or share common authors.

However, for simple tabular or sequential tasks, classic models (or transformers for sequences) may be simpler and sufficient.

---

## Practical Exercises

### Exercise 1: Sketch a GNN Pipeline

Pick a Flow‑style relational problem (e.g., a student‑collaboration or lesson‑prerequisite graph):

- Sketch the pipeline:

  - graph construction → node/edge features → message‑passing layers → aggregation → prediction head.  
- Write a short note describing how message passing helps compared to ignoring the graph.

### Exercise 2: Explore a Simple GNN

Using a library like `PyTorch Geometric` or `Deep Graph Library`:

- Load a small graph dataset (e.g., a small collaboration graph).  
- Train a simple GCN or GAT to predict node labels or edge properties.  
- Inspect the learned node embeddings and reflect on how they differ from non‑relational features.

### Exercise 3: Compare GNNs and Transformers

- Think of a sequence‑style problem and a graph‑style problem.  
- For each, write a short note explaining whether a transformer, a GNN, or both are appropriate, and why.

---

## Self‑Assessment

Rate yourself from 1 to 5:

- I can explain what a graph is and why it matters for ML.  
- I can explain the message‑passing / neighbourhood‑aggregation idea in GNNs.  
- I can distinguish GCNs, GATs, and GraphSAGE‑style models.  
- I can see where GNNs differ from and complement transformers.  
- I can sketch a GNN‑style pipeline for a Flow‑style relational problem.

Action item: write a short note in your lab repo describing one GNN‑style model you might use in a Flow‑style project and why it is better than a non‑relational model.

## Video

<div style={{position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%'}}>
  <iframe
    src="https://www.youtube.com/embed/xFMhLp52qKI"
    title="Graph Neural Networks: A gentle introduction"
    style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0}}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  />
</div>

---

## Next Steps

- Read `03-reinforcement-learning.md` next to explore how sequential decision‑making and environments extend these ideas further.  
- Use GNNs as a **tool** for relational problems, not a universal default.  
- Keep the Flow‑style view: **entities → relationships → message‑passing → rich representations → prediction**.

---

*This lesson gives Flow Initiative trainees an advanced‑level understanding of Graph Neural Networks in ML systems, focusing on how message‑passing works, how different GNN families behave, and how they fit into the Flow‑style pipeline for relational problems.*