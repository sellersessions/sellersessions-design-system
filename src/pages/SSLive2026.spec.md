# SSLive2026 Page Spec

> Read this file BEFORE editing any content in `SSLive2026.tsx`.
> Every section has a purpose, voice, and constraints. Respect all three.

---

## Content Update Workflow

```
1. READ this spec for the target section
2. DRAFT content (validate against constraints below)
3. VALIDATE: limits met? conversion job served? signal not noise?
4. EDIT the TSX
5. BUILD: npm run build (catch errors)
6. SCREENSHOT: Playwright capture of the changed section
7. REVIEW: show Danny before/after
```

---

## 4MAT Structure

The page follows the 4MAT learning cycle. Each section lives in one phase.
Edits must not drift a section into a different phase.

```
WHY  (motivation)  -->  Sections 1-3
WHAT (information)  -->  Sections 4, 8, 9
HOW  (application)  -->  Sections 5-7
WHAT IF (outcomes)  -->  Sections 10-14
```

---

## Section 1: Hero

- **4MAT:** WHY (motivation)
- **Conversion job:** Stop the scroll. Identity + scarcity. Visitor thinks "this is serious, and it sells out."
- **Voice:** Confident, factual, short. No hype adjectives.
- **Layout:** Full-viewport background video, centred stack: date badge, logo, headline, subheadline, inline video, dual CTA
- **Constraints:**
  - Date badge: format `Month D, YYYY | Venue, City` -- max 60 chars
  - Headline: max 2 lines, max 50 chars per line
  - Subheadline: single line, max 45 chars
  - Primary CTA: max 30 chars (including price)
  - Secondary CTA: max 15 chars
- **Data source:** Event details (date, venue, price) from Danny or `/tmp/ssl-2026/` reference files
- **Signal test:** Does this make an experienced seller stop scrolling and want to know more?

---

## Section 2: Built for Innovators

- **4MAT:** WHY (motivation)
- **Conversion job:** Belonging. Visitor thinks "I'm one of these people."
- **Voice:** Aspirational but grounded in data. Stats do the talking.
- **Layout:** Centred heading + paragraph, then 3-column stat cards (md:grid-cols-3)
- **Constraints:**
  - Section heading: max 2 lines, max 30 chars per line
  - Intro paragraph: 30-45 words
  - Stat number: max 6 chars (e.g. "47.5%", "80%", "6x")
  - Stat label: max 60 chars (must fit single card without overflow)
  - Must be exactly 3 stat cards (grid balance)
- **Data source:** Historical event data (return rates, sellout speed, editions count)
- **Signal test:** Does each stat make the visitor feel they'd be joining something proven?

---

## Section 3: This Room Is For / Not For

- **4MAT:** WHY (motivation)
- **Conversion job:** Qualification filter. Self-select in or out. Reduces refund risk.
- **Voice:** Direct, punchy. Short declarative phrases. Identity statements, not descriptions.
- **Layout:** 2-column cards (md:grid-cols-2), equal height. Left = "For", Right = "Not For"
- **Constraints:**
  - Card heading: max 35 chars
  - List items: exactly 5 per card (visual balance)
  - Each item: max 45 chars
  - "For" items: use active verbs ("Build", "Want", "Learn", "Think", "Lead")
  - "Not For" items: use "You" address pattern
- **Data source:** Danny's positioning. Content-research-writer skill for rewording.
- **Signal test:** Would a serious 7-figure seller see themselves in the left column?

---

## Section 4: Modular Format

- **4MAT:** WHAT (information)
- **Conversion job:** Structure clarity. Visitor thinks "I understand how the day flows."
- **Voice:** Informational, clean. Time-of-day framing.
- **Layout:** Centred heading + subtitle + paragraph, then 2x2 grid of phase cards (md:grid-cols-2)
- **Constraints:**
  - Section heading: max 20 chars
  - Subtitle: max 50 chars
  - Intro paragraph: 25-40 words
  - Must be exactly 4 phase cards (Morning / Midday / Afternoon / Evening)
  - Phase label: single word, max 10 chars
  - Phase description: max 55 chars (single line on desktop)
  - Closing paragraph: max 30 words
- **Data source:** Day schedule from Danny or `/tmp/ssl-2026/reference/`
- **Signal test:** Can a visitor explain the day structure to a friend after reading this?

---

## Section 5: Innovation & Atmosphere (Crowd Image)

- **4MAT:** HOW (application -- the vibe)
- **Conversion job:** Emotional contrast. "This isn't a boring hotel conference."
- **Voice:** Provocative one-liner. Anti-corporate energy.
- **Layout:** Full-width background image (400-500px height), centred overlay text
- **Constraints:**
  - Heading: max 30 chars
  - Subline: max 55 chars
  - No body text -- this is a visual break, not a content section
- **Data source:** Existing crowd imagery. Text from Danny's brand positioning.
- **Signal test:** Does this image + text make the visitor feel the energy of the room?

---

## Section 6: Hands-On Workshop

- **4MAT:** HOW (application)
- **Conversion job:** Logistics clarity. Visitor thinks "I know what to bring and what I'll have."
- **Voice:** Practical, instructional. No selling -- just facts about setup.
- **Layout:** Centred heading, then 3 icon cards in a row (md:grid-cols-3)
- **Constraints:**
  - Section heading: max 2 lines, max 30 chars per line
  - Must be exactly 3 cards (grid balance)
  - Card text: max 65 chars (fits single card without wrapping to 4+ lines)
  - Icons: from lucide-react, must visually relate to the item
- **Data source:** Workshop logistics from Danny
- **Signal test:** Does the visitor know exactly what to bring after reading this?

---

## Section 7: Why This Format Works

- **4MAT:** HOW (application)
- **Conversion job:** Differentiation. Visitor thinks "no one else does it this way."
- **Voice:** Confident authority. Comparison to typical conferences (without naming them).
- **Layout:** Centred heading, then 3x2 grid of feature cards (lg:grid-cols-3), closing paragraph
- **Constraints:**
  - Section heading: max 55 chars (including span)
  - Must be exactly 6 feature cards (3x2 grid balance)
  - Card title: max 30 chars
  - Card description: 25-35 words (card height consistency across the grid)
  - Closing paragraph: max 35 words
  - Icons: from lucide-react
- **Data source:** Danny's differentiation points. Previous SSL feedback.
- **Signal test:** Would a conference-weary seller read this and think "finally, something different"?

---

## Section 8: Speakers

- **4MAT:** WHAT (information)
- **Conversion job:** Establish credibility. Visitor thinks "these people know their stuff."
- **Voice:** Direct facts. Credentials, not hype. No "we're thrilled to announce."
- **Layout:** 1 featured full-width card (host) + 2x2 grid (4 speakers)
- **Constraints:**
  - Speaker name: max 25 chars
  - Role label: max 20 chars (e.g. "Session 2", "Host + Session 1")
  - Time slot: format `HH:MM - HH:MM`
  - Host bio: 35-50 words
  - Speaker bio: 30-45 words (card height consistency across the 2x2 grid)
  - Must be exactly 4 grid speakers (2x2 balance) + 1 host
  - Image: 120px circle (host), 80px circle (others)
- **Data source:** `/tmp/ssl-2026/reference/speaker-bios.md`
- **Signal test:** Does this bio tell the visitor why they should listen to this person?

---

## Section 9: Agenda

- **4MAT:** WHAT (information)
- **Conversion job:** Completeness. Visitor thinks "I know exactly what happens when."
- **Voice:** Timetable format. Minimal prose. Times + labels + names.
- **Layout:** Centred heading + subtitle, then vertical timeline list
- **Constraints:**
  - Time: format `HH:MM`, monospace, max 5 chars
  - Label: max 50 chars
  - Speaker name: max 30 chars
  - Sessions get purple left-border, breaks get muted border, evening gets gold
  - Timeline items should match speaker section (same names, same times)
- **Data source:** Day schedule, must stay in sync with Section 8 times
- **Signal test:** Could a visitor build their travel plan from this alone?

---

## Section 10: Written Testimonials

- **4MAT:** WHAT IF (outcomes -- peer proof)
- **Conversion job:** Social proof via text. Real words from real delegates.
- **Voice:** Authentic quotes only. Never rewrite testimonials. Light formatting (punctuation, typos) is OK.
- **Layout:** 2x2 grid of quote cards (md:grid-cols-2)
- **Constraints:**
  - Must be exactly 4 testimonials (2x2 grid balance)
  - Quote: 20-60 words (balanced card heights -- avoid one 15-word card next to one 60-word card)
  - Name: max 25 chars
  - No role/company unless the person requested it
  - Quotes must be from real past delegates
- **Data source:** Danny's testimonial collection. Never fabricate.
- **Signal test:** Would a sceptical 7-figure seller find this credible?

---

## Section 11: Event Details Card

- **4MAT:** WHAT IF (outcomes -- decision point)
- **Conversion job:** Consolidate key facts for the "ready to buy" visitor. One card, one decision.
- **Voice:** Clean, factual. Date, venue, price. No selling -- the page already did that.
- **Layout:** Single centred card (max-w-600px), logo + details + price box + CTA
- **Constraints:**
  - Date format: `Month D, YYYY`
  - Venue: full name + city, max 40 chars
  - Price: single number with currency symbol
  - Price subtitle: max 50 chars
  - CTA label: max 20 chars
  - Scarcity note: max 55 chars
  - Must match Section 1 (same date, venue, price)
- **Data source:** Event details -- keep in sync with Hero section
- **Signal test:** Does this card contain everything needed to make the purchase decision?

---

## Section 12: Video Testimonials

- **4MAT:** WHAT IF (outcomes -- emotional proof)
- **Conversion job:** Emotional validation. Video is harder to fake than text.
- **Voice:** N/A (video content). Card labels should be name + role only.
- **Layout:** `<VideoTestimonials>` component -- horizontal scroll or grid
- **Constraints:**
  - Name: max 25 chars
  - Role: max 25 chars
  - Thumbnail: optional (component handles fallback)
  - Videos must be from real past delegates
  - Video URLs must be valid WordPress media library links
- **Data source:** Danny's video testimonial library
- **Signal test:** Does this person's enthusiasm feel genuine on camera?

---

## Section 13: FAQ

- **4MAT:** WHAT IF (outcomes -- anxiety reduction)
- **Conversion job:** Objection handling. Every question maps to a buying objection.
- **Voice:** Conversational but precise. Answer the question directly in the first sentence, then elaborate.
- **Layout:** `<FAQ>` component -- accordion style
- **Constraints:**
  - Question: max 50 chars (fits single line on mobile)
  - Answer: 30-80 words (long enough to be useful, short enough to scan)
  - No duplicate topics across questions
  - Group by theme: qualification, logistics, what's included, travel, admin
  - Contact details (email, phone) must be current
- **Data source:** Real questions from past delegates + Danny's objection handling
- **Signal test:** Does this FAQ answer the question a visitor hovering over the buy button would ask?

---

## Section 14: Final CTA

- **4MAT:** WHAT IF (outcomes -- close)
- **Conversion job:** Last chance. For visitors who scrolled the whole page and need one more nudge.
- **Voice:** Urgent but not pushy. Confidence, not desperation.
- **Layout:** `<CTASection>` component -- centred heading + description + dual buttons
- **Constraints:**
  - Title: max 25 chars
  - Description: max 100 chars (1-2 sentences)
  - Primary CTA: max 30 chars (including price)
  - Secondary CTA: max 20 chars
  - Must match Hero CTA text and href
- **Data source:** Same price/link as Hero and Event Details sections
- **Signal test:** If someone read only this section, would they understand what they're buying?

---

## Cross-Section Rules

These apply to ALL sections:

1. **Grid parity:** Any grid (2x2, 3x1, 3x2) must have exactly the right number of items. Never leave an odd card dangling.
2. **Card height balance:** Within a grid row, text lengths should be within 20% of each other. If one card has 25 words and another has 50, rewrite the shorter one or trim the longer one.
3. **Data consistency:** Date, venue, price, speaker names, and session times must match across ALL sections that reference them (Hero, Agenda, Speakers, Event Details, CTA).
4. **No orphan changes:** If you update a speaker's name in Section 8, check Section 9 (Agenda) too.
5. **Mobile-first check:** Any content change must still work at 375px width. Character limits above are set for mobile safety.
6. **Brand voice hierarchy:** Sections closer to WHY use identity language. Sections closer to WHAT IF use proof language. Never mix.
