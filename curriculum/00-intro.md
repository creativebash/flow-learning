---
id: curriculum-intro
title: About this curriculum
track: overview
level: none
---

# About this curriculum

## Who this is for

This curriculum is for **engineers, builders, and learners** who want to design and operate **real‑world stack‑style systems** that combine:

- **distributed and protocol‑style coordination**,  
- **AI‑driven automation and analytics**,  
- and **public‑goods‑style governance and infrastructure**.

You do not need to be an expert in all three areas yet; you just need:

- basic programming comfort,  
- curiosity about how **systems and incentives** shape behavior,  
- and a desire to build **practical, socially‑visible infrastructure**, not just toy demos.

This is a **“build‑with‑principles”** path, not a “tutorial‑chain” that stops at “make a simple app.”  
By the end, you should be able to:

- design protocols,  
- run or integrate with models,  
- and reason about governance, security, and regulatory‑style constraints in a unified way.

---

## How this curriculum is structured

The curriculum is organized into a **hierarchical “stack” of tracks and levels**:

- **Tracks** represent **domains of competence** (e.g., Foundations, Blockchain, AI‑ML, Protocol Engineering).  
- **Levels** under each track move from:

  - `01‑beginner` → `02‑intermediate` → `03‑advanced`.

Within each level you will usually find:

- conceptual lessons that frame the domain,  
- then practice‑style or implementation‑style lessons that get you building.

---

### 1. 01 – Foundations

Before you dive into protocols or models, this track lays down:

- how to **learn**,  
- how to **take notes and read rigorously**,  
- and how to **build a public portfolio** of work.

Key folders:

- `01‑concepts`: framing topics like **learning hierarchy**, **Maieutics and Flow‑style thinking**, and **student‑vs‑engineer mindset**.  
- `02‑practice`: **reading comprehension**, **effective notes**, and **building a portfolio** (i.e., “how to turn learning into public‑facing work”).  
- `03‑tooling`: **Markdown and documentation**, **version control (Git‑style)**, **and collaboration workflows** (e.g., pull‑requests, code reviews).

This is your **on‑ramp** into the rest of the curriculum.

---

### 2. 02 – Blockchain

Here you learn how **blockchain‑style systems work**, from high‑level concepts to intermediate‑style smart‑contracts and security, then to advanced‑style protocol‑engineering and scalability topics.

#### Beginner tier

- `01‑fundamentals`:  
  - `01‑what‑is‑blockchain.md`,  
  - `02‑key‑terms‑and‑models.md`,  
  - `03‑consensus‑overview.md`.
- `02‑ecosystem`:  
  - `01‑layer‑1‑vs‑layer‑2.md`,  
  - `02‑tokens‑and‑economic‑incentives.md`,  
  - `03‑decentralized‑identity.md`.

This tier gives you a **conceptual map** of the blockchain landscape, not a language‑specific deep‑dive.

#### Intermediate tier

- `01‑smart‑contracts` (Solidity / Vyper‑style basics, design patterns, testing and deployment).  
- `02‑security` (common vulnerabilities, code‑audit practices, pen‑test workflows).

You emerge knowing how to:

- inspect, write, and secure simple smart‑contracts,  
- and how to look for red‑flags in on‑chain logic.

#### Advanced tier

- `01‑protocol‑engineering` (protocol‑style architecture, consensus‑tuning, governance‑mechanisms).  
- `02‑scalability` (state‑channels, rollups and sharding, interoperability‑design).

This is where you step from “I can build a contract” to “I can help design or critique entire *protocol‑layers*” and “how chains can talk to each other.”

---

### 3. 03 – AI‑ML

This track teaches you to **understand, use, and govern AI‑driven components** in systems, not just “train a model and deploy it.”

#### Beginner tier

- `01‑foundations`:

  - `01‑math‑for‑ml.md`,  
  - `02‑data‑pipelines‑basics.md`,  
  - `03‑model‑lifecycle.md`.
  
- `02‑tools`:

  - `01‑python‑ecosystem.md`,  
  - `02‑notebooks‑and‑visualization.md`,  
  - `03‑ml‑libraries.md`.

You come out knowing how to:

- frame an ML‑style problem,  
- pull together a basic pipeline,  
- and use standard libraries without drowning in math.

#### Intermediate tier

- `01‑supervised‑learning`:

  - regression / classification, feature‑engineering, hyperparameter‑tuning.
- `02‑MLOps`:

  - `01‑ci‑cd‑for‑models.md`,  
  - `02‑monitoring‑and‑drift.md`,  
  - `03‑deployment‑patterns.md`.

This is your **“production‑ready ML”** toolkit, including how to keep models healthy in the long run.

#### Advanced tier

- `01‑modern‑architectures`:

  - `01‑transformers.md`,  
  - `02‑graph‑neural‑networks.md`,  
  - `03‑reinforcement‑learning.md`.
- `02‑research‑in‑practice`:

  - `01‑paper‑replication.md`,  
  - `02‑large‑model‑alignment.md`,  
  - `03‑ethics‑and‑responsibility.md`.

Here you move from “use existing models” to:

- reproducing published work,  
- aligning large‑language‑style models to human‑values,  
- and thinking like an **ethics‑and‑responsibility‑minded ML engineer**.

---

### 4. 04 – Protocol Engineering

This track is the **“core operating system” layer** of the stack: how to design, implement, and evolve reusable, interoperable protocols that systems can talk over.

#### Beginner tier

- `01‑protocol‑concepts`:

  - `01‑protocol‑vs‑application.md` (what is a protocol vs an app),  
  - `02‑state‑machines.md` (how to model behavior over time),  
  - `03‑communication‑patterns.md` (request–response, pub/sub, queues).
- `02‑standards`:

  - `01‑specification‑writing.md`,  
  - `02‑versioning‑strategies.md`,  
  - `03‑interoperable‑design.md`.

You come out able to:

- describe protocols text‑plus‑diagram,  
- version them cleanly,  
- and design them so that many implementations and applications can plug into them.

#### Intermediate tier

- `01‑implementation`:

  - `01‑testing‑protocol‑compatibility.md` (interop and conformance‑style tests),  
  - `02‑scaling‑design.md` (replication, sharding, batching, state‑minimization),  
  - `03‑resilience‑patterns.md` (timeouts, retries, circuit‑breakers, idempotency, fallbacks).

- `02‑governance‑and‑ecosystem`:

  - `01‑upgrade‑paths.md` (how to move from v1 to v2 without breaking everyone),  
  - `02‑interchain‑protocols.md` (how chains and ledgers talk to each other),  
  - `03‑community‑feedback.md` (how to let stakeholders and builders shape the protocol over time).

This is the **“real‑world protocol engineer”** tier: systems that scale, survive failures, and evolve with communities.

#### Advanced tier

- `01‑lead‑architect`:

  - `01‑optimizing‑latency.md` (p95/p99‑style performance, latency‑budgets, tail mitigation),  
  - `02‑consensus‑economics.md` (how rewards, penalties, and stake‑style incentives shape behavior),  
  - `03‑security‑modeling.md` (trust boundaries, threat‑style analysis, STRIDE‑style thinking).

- `02‑global‑adoption`:

  - `01‑regulatory‑compliance.md` (GDPR‑style, CCPA‑style, and sector‑style rules mapped to design decisions),  
  - `02‑performance‑auditing.md` (how to systematically audit latency and throughput and write reports),  
  - `03‑enterprise‑integration.md` (how to plug protocols into ERPs, CRMs, identity‑providers, and legacy‑style systems safely and cleanly).

Here you step into the **“lead‑architect / systems‑steward”** role: responsible not just for correctness, but for **security, incentives, regulation, and integration** at scale.

---

## How to think about the “stack” between tracks

Although these tracks live in different folders, they are **designed to be used together**.

For example, a typical **Flow‑style system** might combine:

- **Blockchain** track ideas (e.g., consensus‑style governance‑mechanisms, tokens, identity)  
- **AI‑ML** track ideas (e.g., models that score learners, detect risky proposals, or suggest interventions),  
- **Protocol Engineering** track ideas (e.g., state‑machines, event‑driven communication, upgrade‑paths, community‑feedback, enterprise‑style integration).

In practice, you can:

- follow a **vertical path** through one track (e.g., `04‑Protocol Engineering → beginner → intermediate → advanced`)  
- while **skimming relevant parts** of the others (e.g., `02‑Blockchain → security` when you care about on‑chain attacks, or `03‑AI‑ML → large‑model‑alignment.md` when you care about governance‑style assistants).

Or you can:

- work on **one concrete project** (e.g., a governance‑style proposal‑and‑reward‑system)  
- and, for each lesson you read, ask:

  - “How would this idea show up in *my* system?”

This is how the curriculum turns into a **coherent stack‑style mental model**, not just a list of PDFs.

---

## How to use this as a learner

### 1. If you’re just starting out

- Begin with **`01‑Foundations`** and do:

  - `01‑concepts/01‑learning‑hierarchy.md` and `02‑maieutics‑and‑flow‑thinking.md`  
  - and `02‑practice/01‑reading‑comprehension.md` and `02‑effective‑notes.md`.

- Then pick **one track** to go deep in first:

  - if you want **system‑style, “hard‑core” engineering**, start with **`04‑Protocol Engineering`**.  
  - if you want **algorithm‑style reasoning**, start with **`03‑AI‑ML`**.  
  - if you want **economic‑style and on‑chain‑style thinking**, start with **`02‑Blockchain`**.

Use the **exercises** at the end of each lesson to build a **lab‑style portfolio** you can show others.

### 2. If you’re experienced but new to this stack

- Feel free to **skip** beginner‑tier content you already know.  
- Use the curriculum as a **structured way to fill gaps**:

  - for example, if you are a “backend systems engineer,”  
  - start with:

    - `04‑Protocol Engineering → intermediate` (scalability, resilience)  
    - and `03‑AI‑ML → MLOps` and `ethics‑and‑responsibility.md`.

### 3. If you’re building a real project

For any project you care about (e.g., governance‑tool, mentor‑matching, reward‑system):

- Open a single lab repo and **map it into the tracks**:

  - which **blockchain‑style patterns** will you use (e.g., governance‑mechanism, identity)?  
  - which **ML‑style components** will you add (e.g., scoring, ranking, filtering)?  
  - which **protocol‑style design** decisions (e.g., state‑machines, event‑streams, upgrade‑paths) will you lock in?

Then, walk the curriculum **cross‑wise** rather than front‑to‑back: every time you finish a lesson that feels relevant, go back and **refactor** your spec or diagrams and check in the change.

---

## Expectations and norms

This curriculum assumes:

- you are **willing to write, diagram, and code** as you go,  
- you are comfortable with **iterative, incremental work**,  
- and you care about **not just “it works,” but also maintainability, understandability, and social‑legibility**.

You do **not** need:

- a PhD,  
- or a fancy job title.

You do need:

- the habit of **shipping small, explicit artifacts** (specs, tests, diagrams, blog‑style notes) that show what you’ve learned.

---

## Next steps

If you’re ready to dive in, choose your **first ladder**:

- `01‑Foundations/01‑concepts/01‑learning‑hierarchy.md` if you want to ground your *how* to learn.  
- or jump straight into a track:

  - `03‑AI‑ML/01‑beginner/01‑foundations/01‑math‑for‑ml.md`  
  - or `04‑Protocol Engineering/01‑beginner/01‑protocol‑concepts/01‑protocol‑vs‑application.md`  
  - or `02‑Blockchain/01‑beginner/01‑fundamentals/01‑what‑is‑blockchain.md`.

Then, for each track, move **forward along the numeric ladder** (`01 → 02 → 03`) and **vertically through levels** (`beginner → intermediate → advanced`) while continuously linking ideas back to **your own projects and lab repo**.

This is how the curriculum becomes not just a library, but your **personal stack‑style operating‑system**.