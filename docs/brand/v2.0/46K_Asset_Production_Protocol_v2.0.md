# 46K Asset Production Protocol v2.0

> EXECUTION FILE. This protocol controls HOW an AI turns the 46K brand
> system into an actual asset. Do not jump directly from a user request
> to generation. Required workflow: **READ → CLASSIFY → EXTRACT → BRIEF
> → PRODUCE → VERIFY**

## 0. PURPOSE

The full 46K Production Spec is a source of truth, not a single giant
image prompt.

For each task, compile only the relevant brand rules into an
asset-specific production brief before creating the asset.

The AI must distinguish:

1.  **content truth** — what the asset must communicate
2.  **brand constraints** — how 46K must behave
3.  **format constraints** — what the medium requires
4.  **generative freedom** — where creative interpretation is allowed

Never let generative freedom alter content truth or locked brand
constraints.

------------------------------------------------------------------------

# PHASE 1 — READ

Before producing anything:

1.  Read `46K_AI_Quick_Context_v2.0.md`.
2.  Consult `46K_AI_Production_Spec_v2.0.md` for any rule relevant to
    the task.
3.  Read the user's current task carefully.
4.  Inspect any supplied visual references and their status in
    `46K_Visual_Reference_Index_v2.0.md`.
5.  Inspect any locked production assets relevant to the task: logo,
    template, finished test UI, approved graphic, photo guide, etc.

Do not assume that a visual reference is authoritative merely because it
exists.

Written locked rules override accidental details in AI-generated
prospect images.

------------------------------------------------------------------------

# PHASE 2 — CLASSIFY

Internally classify the task before creating.

## A. Asset type

Choose one primary type:

- copy/text
- social post
- article
- research communication
- presentation
- report
- player profile
- UI/product screen
- infographic/information model
- photo-led visual
- campaign/key visual
- video concept/storyboard
- website section
- other

## B. Audience

Choose primary audience:

- player
- coach
- scout
- academy/club
- parent
- researcher/psychologist
- mixed

## C. Purpose

Choose the dominant purpose:

- teach
- explain
- provoke thought
- assess
- develop
- narrate
- sell
- build brand
- create competitive relevance

## D. Dominant gear

Choose ONE dominant gear:

- EDITORIAL
- CORE
- PERFORMANCE

A secondary gear may contribute limited elements.

Do not create an equal three-way blend unless the task is specifically
demonstrating the brand system.

### Gear selection rule

If mainly ideas / research / perspective / 2046 → **EDITORIAL**

If mainly assessment / information model / data / player profile /
recommendations / development system → **CORE**

If mainly training / match / player-facing performance / perception in
action → **PERFORMANCE**

## E. Evidence status

For substantive claims, classify:

- WE KNOW
- EVIDENCE SUGGESTS
- WE THINK
- mixed

------------------------------------------------------------------------

# PHASE 3 — EXTRACT

Create an internal **Relevant Rule Set**.

Do not carry every brand rule into every task. Extract only what can
materially affect the output.

At minimum extract:

### Brand

- core message relevant to the task
- dominant gear
- personality boundaries

### Visual

- palette
- typography role
- logo rule
- photography rule if relevant
- graphic-language rule if relevant
- materiality rule if relevant

### Scientific

- evidence level
- claim limitations

### Content

- exact text/data/information that must remain unchanged
- desired reaction/action

### Anti-patterns

Select the 3–8 most likely failure modes for this task.

Example for a Core infographic:

- Core typography must be thin/light, never condensed
- Gold = marker only
- use Paper/Pitch/Graphite as world
- visualize information, not generic football
- do not use gaming HUD
- do not use glowing brain
- do not let decoration change the information hierarchy
- development should be visible if assessment is involved

------------------------------------------------------------------------

# PHASE 4 — BRIEF

Before production, compile the task into this structure internally.

## 46K ASSET BRIEF

**Asset:**  
\[exact deliverable\]

**Audience:**  
\[primary audience\]

**Purpose:**  
\[dominant purpose\]

**Dominant gear:**  
\[Editorial / Core / Performance\]

**Secondary gear, if any:**  
\[gear + exactly what is borrowed\]

**Evidence level:**  
\[WE KNOW / EVIDENCE SUGGESTS / WE THINK / mixed\]

**Primary message:**  
\[one sentence\]

**Desired reaction/action:**  
\[one sentence\]

**Content that must be exact:**  
\[headlines, labels, sequence, values, quotes, structure\]

**Visual hierarchy:**

1.  \[primary\]
2.  \[secondary\]
3.  \[supporting\]
4.  \[action, if any\]

**Required 46K rules:**  
\[task-specific extracted rules\]

**Reference assets:**  
\[list each reference and its role/status\]

**Must avoid:**  
\[task-specific failure modes\]

**Format constraints:**  
\[size, platform, duration, orientation, file type\]

**Production method:**  
\[deterministic layout / image generation / hybrid / text only /
code/UI\]

Do not proceed until the brief is internally coherent.

------------------------------------------------------------------------

# PHASE 5 — CHOOSE THE PRODUCTION METHOD

This is critical.

## A. Use deterministic production when exactness dominates

Prefer code/layout tools, SVG, HTML/CSS, presentation software, document
tools or other deterministic methods for:

- exact diagrams
- information models
- exact text
- exact labels
- tables
- charts
- UI
- slide layouts
- reports
- typography-sensitive assets
- brand-logo placement
- precise spacing/alignment
- exact color values

## B. Use image generation when visual interpretation dominates

Image generation is appropriate for:

- photography
- cinematic scenes
- mood
- conceptual visuals
- editorial collage
- visual texture
- player/training imagery
- atmospheric key visuals
- illustrative perception effects

## C. Use hybrid production when both matter

For many 46K assets, **hybrid is the preferred method**.

Example:

1.  Generate or select the photographic/background layer.
2.  Create information structure, text, diagram, typography and logo
    deterministically.
3.  Composite them.
4.  Verify against the brand.

### Mandatory hybrid rule for information graphics

If an asset contains an exact conceptual model, sequence, labels,
arrows, values or hierarchy:

**DO NOT delegate the information architecture to an image generator.**

An image model may create supporting imagery or texture.  
The exact information layer must be controlled separately.

------------------------------------------------------------------------

# PHASE 6 — SPECIAL PROTOCOL FOR IMAGE GENERATION

Never send “make this in the 46K brand” as the only visual instruction.

Compile a specific prompt.

Use this order:

1.  purpose + dominant gear
2.  subject + football context
3.  composition
4.  palette
5.  light/contrast
6.  typography role if relevant
7.  information/graphic overlays
8.  materiality
9.  negative constraints
10. logo handling

## Image-generation prompt rule

The prompt must describe the **visible result**, not merely brand
concepts.

Bad: “Make it Core, premium, scientific and football-native.”

Better: “Warm Paper background with Graphite and Pitch information
layers; one older teenage/young adult football player in calm profile;
sparse test-inspired dots and thin lines; one restrained Gold marker;
thin/light uppercase display typography with normal proportions;
generous negative space; no gaming HUD, no neon, no brain imagery.”

## Exact text rule

Do not rely on image generation for exact long text.

If exact copy matters:

- generate the visual without critical text, then
- add text deterministically.

## Exact logo rule — v2.0

Use only the four official `LOCKED_ASSET` PNGs defined in `46K_Official_Logo_Asset_Protocol_v2.0.md`. Do not rely on image generation for the 46K logo, or on previous logo SVGs. Generate supporting visuals without the mark and composite the exact PNG afterward. If the file is unavailable, request it. Verify the final exported asset on the intended background.

------------------------------------------------------------------------

# PHASE 7 — SPECIAL PROTOCOL FOR INFORMATION MODELS

Use this for circles, process models, frameworks, diagrams and
conceptual maps.

## Step 1: Freeze content before styling

Write the model as plain structure first:

- exact number of nodes
- exact node names
- exact order
- exact direction of flow
- exact relationships
- exact supporting text
- what sits in the center, if anything
- what is outside the model, if anything

Do not style until this is correct.

## Step 2: Choose semantic geometry

Geometry must express the model.

Examples:

- cycle = circular flow with clear return
- hierarchy = vertical or nested structure
- parallel factors = aligned peers
- feedback loop = explicit return arrow
- central construct = center + satellites only if conceptually true

Do not use circles merely because they look scientific.

## Step 3: Apply 46K

For most analytical models:

- dominant gear = Core
- use Paper / Graphite / Pitch
- Gold only for the most important marker, active point or directional
  cue
- thin/light uppercase display labels where appropriate
- functional sans for explanatory text
- generous space
- simple lines
- no pseudo-data
- no decorative HUD

## Step 4: Add football context only if useful

Possible:

- restrained player silhouette/photo
- pitch fragment
- perception cue
- subtle ball/player markers

Do not let football imagery obscure the conceptual model.

## Step 5: Verify exactness

Before delivery, compare the finished model against the frozen content
structure node by node.

If any node, label, direction or relationship changed: **reject and
rebuild.**

------------------------------------------------------------------------

# PHASE 8 — SPECIAL PROTOCOL FOR COPY

Before drafting:

1.  identify audience
2.  identify evidence level
3.  identify one main point
4.  decide whether the task needs Editorial, Core or Performance
    language
5.  write
6.  remove jargon, hype and filler
7.  verify claims
8.  connect back to football

For content pieces, use when useful:

**HOOK → INSIGHT → EVIDENCE → 46K TAKE → APPLICATION**

Do not force this structure when it harms the format.

------------------------------------------------------------------------

# PHASE 9 — VERIFY

Verification is mandatory.

Do not merely ask “does it look good?”

Run three checks.

## A. CONTENT CHECK

- Is every required label present?
- Is exact copy exact?
- Is the order correct?
- Are relationships correct?
- Are numbers/data unchanged?
- Is the evidence level correct?
- Did visual styling accidentally change meaning?

## B. BRAND CHECK

- Is one dominant gear identifiable?
- Does the gear match the content?
- Are the locked colors respected?
- Is Gold a marker?
- Is typography in the correct role?
- Is the logo exact?
- Are relevant photography rules respected?
- Does the asset visualize information rather than generic tech?
- Is development visible when relevant?

## C. ANTI-PATTERN CHECK

Check the task-specific rejection list.

If a prohibited pattern appears: revise before delivery.

------------------------------------------------------------------------

# PHASE 10 — VISUAL REFERENCE HANDLING

Visual references are useful, but they do not all have equal authority.

Every reference should have one status:

## LOCKED_ASSET

Authoritative production asset.

Examples:

- final logo
- approved vector mark
- final template
- finished test UI
- approved icon

Instruction: **Use exactly. Do not reinterpret.**

## STYLE_REFERENCE

Authoritative for visual feeling or a defined aspect.

Examples:

- approved photo guide
- approved Graphic Language board
- approved Applications board
- approved color/materiality prospect

Instruction: **Match the identified qualities, not accidental
AI-generated details.**

## EXAMPLE

Useful illustration of an idea, but not binding.

Instruction: **Learn from it; do not copy it literally and do not treat
details as rules.**

## NEGATIVE_REFERENCE

Shows what not to do.

Instruction: **Identify the failure and avoid it.**

### Written rules vs reference images

If a STYLE_REFERENCE contains:

- misspelled text
- invented data
- wrong font label
- malformed logo
- accidental layout detail

the written specification wins.

If a visual reference reveals a look/feel that is difficult to express
verbally and does not conflict with written rules, use the visual
reference.

------------------------------------------------------------------------

# PHASE 11 — FAILURE RECOVERY

If a generated result is off-brand, do not simply ask the generator to
“make it more 46K”.

Diagnose the failure.

Classify it as:

- wrong gear
- wrong palette
- wrong typography
- wrong photography
- too generic sporttech
- too academic
- too macho
- too gaming-like
- too luxurious
- too decorative
- information hierarchy failure
- content accuracy failure
- logo failure
- insufficient development connection

Then regenerate/rebuild with a correction targeted at that failure.

------------------------------------------------------------------------

# FINAL EXECUTION RULES

**READ → CLASSIFY → EXTRACT → BRIEF → PRODUCE → VERIFY**

**THE FULL BRAND GUIDE IS A SOURCE OF TRUTH, NOT AN IMAGE PROMPT.**

**COMPILE THE RELEVANT RULES BEFORE PRODUCTION.**

**USE DETERMINISTIC TOOLS FOR EXACT INFORMATION.**

**USE GENERATIVE TOOLS FOR VISUAL INTERPRETATION.**

**USE HYBRID PRODUCTION WHEN BOTH ARE REQUIRED.**

**THE GEAR FOLLOWS THE CONTENT — NOT THE CHANNEL.**

**IF EXACTNESS AND BEAUTY CONFLICT, PRESERVE THE INFORMATION FIRST, THEN
SOLVE THE DESIGN.**
