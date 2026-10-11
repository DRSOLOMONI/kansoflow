# Kanso Flow — Defined Use Case

## Product in one sentence

Kanso Flow is a bilingual (Arabic and English) AI phone assistant for cafés and restaurants that answers routine inbound calls, captures pickup orders and customer inquiries, then hands accurate, caller-confirmed summaries to staff.

## The first problem to solve

During busy service periods, café staff may not be able to answer every phone call while also serving in-store guests. Repeat questions and pickup orders can interrupt service or be missed. Kanso Flow should handle a narrow, repeatable set of phone conversations and make sure the team receives the details needed to act.

## First customer

Start with one independent café that:
- receives recurring inbound calls;
- accepts pickup orders by phone;
- has a reasonably stable menu and clear opening hours;
- has one staff member or channel responsible for receiving handoff summaries;
- wants to test Arabic and English caller support.

Do not try to support every restaurant workflow in the first pilot.

## Primary MVP call flow

1. Answer with a café-approved greeting.
2. Identify the request: menu/hours question, pickup order, reservation inquiry, catering inquiry, or something else.
3. Use only the café's approved and current information to answer.
4. For pickup orders, capture items, quantities, modifiers, customer name, and requested pickup time.
5. Read back the order and obtain caller confirmation.
6. Send the confirmed summary to the configured staff channel.
7. If information is missing, uncertain, sensitive, or unsupported, transfer to staff or take a message instead of guessing.

## In scope for the first pilot

- English and Arabic call handling.
- Opening hours and approved menu FAQs.
- Pickup order capture and read-back confirmation.
- A structured staff handoff.
- Escalation for uncertainty and unsupported requests.
- Basic operational reporting, subject to privacy and retention rules.

## Out of scope until separately built and tested

- Guaranteed natural or perfect speech recognition across all accents and noisy environments.
- Live inventory or availability unless connected to a verified source.
- Confirmed reservations without a real reservation system.
- POS ticket creation, payments, refunds, delivery dispatch, or customer account management without integrations.
- Claims that calls are answered or orders sent when the production systems have not confirmed the action.
- Replacing human staff or handling every possible customer situation without escalation.

## Demo truth-in-advertising

The current Zara experience in the website is an interactive frontend simulation. It uses browser-side sample logic and demonstration menu data. It is not a live Bland AI phone agent, and the “handoff” preview does not send an order to a real team. Homepage and demo labels should make this clear until end-to-end production integration is implemented.

## Pilot acceptance criteria

Before calling the MVP operational, demonstrate all of the following using a real test phone line and an authorized pilot business:

- The configured agent answers an incoming test call.
- It can handle agreed English and Arabic test scenarios.
- It answers hours/menu questions only from verified café data.
- It captures the required order fields and reads them back accurately.
- It does not claim success before the relevant system confirms it.
- It sends the confirmed summary to the chosen staff channel.
- It escalates uncertain requests, allergen questions without verified information, and unsupported workflows.
- Logs, recordings, transcripts, and caller details are protected with documented access and retention rules.
- Staff can identify and correct a failed or incomplete handoff.

## Pilot metrics

Track call answer rate, successful task completion, order-detail accuracy, escalation appropriateness, staff correction rate, and staff/caller satisfaction. Define each metric, denominator, and measurement window before the pilot. Establish a baseline; do not claim revenue lift or labor savings without evidence.

## Intended technical shape

- **Frontend:** existing React + Vite + TypeScript site and dashboard.
- **Voice provider:** Bland AI, selected for the first live prototype; integration status must be verified.
- **Server-side layer:** receives provider webhooks, validates events, applies business rules, and sends handoffs securely.
- **Data storage:** only the minimum required configuration and operational records, with access and retention controls.
- **First handoff:** one reliable staff channel; expand only after the first path works end-to-end.

Never place provider API keys in frontend code or commit secrets to the repository.
