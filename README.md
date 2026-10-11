# Kanso Flow

**Bilingual AI phone handling for cafés and restaurants.**

Kanso Flow helps hospitality teams handle routine inbound calls—especially when staff are busy serving guests. Its initial use case is a voice assistant that answers common questions, captures pickup orders, and hands a clear summary to staff, with Arabic and English support.

**Website:** https://usekansoflow.com  
**Primary demo persona:** Zara  
**Current project stage:** Website and interactive front-end prototype. A real production phone agent and operational integrations must be configured and verified separately.

## The problem

Cafés and restaurants can miss calls or interrupt front-of-house staff during rush periods. Callers often want quick answers about opening hours, menu items, pickup orders, reservations, or catering. If these calls go unanswered, the business may lose an order or a useful lead.

Kanso Flow is designed to handle those repeatable conversations and pass structured details to the team—without pretending to replace staff judgment or the restaurant's point-of-sale system.

## Primary use case: inbound café phone calls

A caller phones a café. Zara answers in Arabic or English, responds using the business's configured information, and can guide the caller through a pickup order. Before an order is handed off, it should repeat the important details for confirmation. The team receives a structured summary through a configured channel.

### Initial workflow

1. **Answer:** greet the caller and identify the café.
2. **Understand:** detect whether the caller has a menu question, pickup order, reservation request, or catering inquiry.
3. **Respond or collect:** answer from approved café information; capture the required order details or lead information.
4. **Confirm:** repeat the captured details and ask the caller to confirm or correct them.
5. **Hand off:** send the structured summary to the restaurant's configured staff channel, or transfer/take a message when the agent cannot safely complete the task.
6. **Record outcome:** where the production system supports it, log the call outcome for review and improvement.

## What to build first

**MVP priority: café calls and pickup orders.** Start with one pilot café, one verified menu, opening hours, pickup rules, and one staff handoff channel. Validate this workflow before adding more complex integrations.

- Answer opening-hours and menu FAQs from an approved knowledge source.
- Capture item, quantity, modifiers, customer name, and requested pickup time.
- Repeat the order and ask for confirmation.
- Escalate uncertain questions, allergy uncertainty, complaints, and unsupported requests to staff.
- Provide a simple dashboard or reliable message handoff showing what needs staff attention.
- Support English and Arabic, with clear behavior when language recognition is uncertain.

Reservations and catering inquiries are secondary workflows. Availability checks, confirmed reservations, POS writes, payments, delivery dispatch, and other actions must not be represented as working until their integrations are implemented and tested.

## Current demo limitations

The website includes an interactive browser-based simulation of Zara. It can demonstrate sample conversation flows and a draft order summary, but it is not proof of a connected live phone agent.

Unless separately configured and tested, the current demo does **not**:
- answer a real incoming phone call;
- use a production Bland AI agent or telephone number;
- send an order to staff by SMS, WhatsApp, email, or dashboard backend;
- create a real reservation or POS ticket;
- verify live menu inventory, prices, or table availability.

The frontend's sample responses and menu are demonstration data. Replace them with a pilot business's verified details before any real customer use.

## Target customer

Independent cafés and small-to-medium restaurants with regular inbound calls, busy service periods, repeated menu questions, and a need to capture pickup orders or leads. The first customer profile should be narrow enough to configure and evaluate in a pilot.

## Success measures for a pilot

Measure operational performance before claiming business impact:
- percentage of eligible calls answered;
- percentage of conversations completed without staff rescue;
- order detail accuracy after staff review;
- correct escalation rate for uncertain or sensitive requests;
- staff time spent correcting handoff summaries;
- caller and staff satisfaction;
- number of captured calls that lead to a completed order, with a clear definition and measurement window.

Set a baseline and compare like-for-like periods. Do not promise revenue increases or labor savings without measured evidence.

## Safety and reliability rules

- Use only verified business information for hours, prices, ingredients, allergens, and availability.
- Never guess allergen details or claim an order, reservation, refund, or payment succeeded unless the connected system confirms it.
- Confirm order details aloud before handoff.
- Provide a clear staff escalation path.
- Minimize collection of caller data, protect recordings/transcripts, define retention and access rules, and disclose recording where required.
- Keep API keys and provider credentials on the server; never expose secrets in frontend code or commit them to GitHub.
- Test Arabic and English call flows, accents, interruptions, silence, noise, invalid requests, and provider/network failures.

## Intended architecture

- **Website/dashboard:** existing React + Vite + TypeScript app.
- **Voice provider:** Bland AI is the selected provider to evaluate for the first live café prototype.
- **Backend:** a server-side service/webhook layer to validate provider events, apply business rules, and route structured handoffs.
- **Data store:** a protected database only when needed for business configuration, call outcomes, and authorized records.
- **Staff handoff:** begin with one reliable channel; add SMS, WhatsApp, email, dashboard, or POS integrations only when implemented and verified.

This describes the intended architecture, not a claim that every component is already connected.

## Suggested build sequence

1. Select one pilot café and confirm its exact first workflow.
2. Prepare and verify its menu, hours, order rules, escalation rules, and language needs.
3. Configure and test Zara in Bland AI using sample calls.
4. Connect provider webhooks to a secure backend and implement the confirmed staff handoff.
5. Test failure handling, privacy, and Arabic/English conversations.
6. Run a limited pilot with staff oversight and review accuracy before expanding.

## Repository map

- `src/components/home/Hero.tsx` — primary homepage proposition.
- `src/components/home/VoiceUseCases.tsx` — sample call workflows.
- `src/components/home/VoiceWaiter.tsx` — interactive frontend simulation.
- `src/pages/Index.tsx` — homepage and SEO/FAQ content.
- `docs/use-case.md` — product use case, boundaries, and pilot acceptance criteria.

## Technology

React, Vite, TypeScript, Tailwind CSS, shadcn/ui, and the existing dashboard/front-end code. Bland AI is the planned voice provider for the first live prototype; its integration should be treated as pending until a real end-to-end test passes.
