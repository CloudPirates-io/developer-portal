---
paths:
  - 'docs/billing/**'
---

# Billing docs

Written 2026-07-22, from an audit that read every file in `docs/billing/` in full and cross-checked
concrete claims against `src/services/apigateway/src/Api/v1/Billing/{BillingProfileApi,InvoiceApi}.ts`
and the JSON command-payload contracts under
`src/shared/contracts/schemas/src/Contracts/Billing/BillingProfile/Commands/**`. If this note is
many months/years old when you read it, re-verify against current source before trusting it. This
domain is mostly accurate — smaller set of findings than the other doc areas audited in this pass.

## Create/Update Billing Profile bodies — fixed 2026-07-22, now accurate

`billing-profiles.md`'s "Create Billing Profile" and "Update Billing Profile Address" examples
used to show `{"name": "...", "address": {"street", "city", "postalCode", "country"}}` /
`{"billingProfileAddress": {"street", ...}}`. The real contracts
(`create_billing_profile_command_payload_v1.json`, `ChangeBillingProfileAddressCommandPayloadV1`,
both `additionalProperties: false`) require `{"billingProfileName": string,
"billingProfileAddress": {...}}`, and `billingProfileAddress` itself (`billing_address.json`)
requires `addressLine1, postalCode, city, countryCode` (2-letter ISO code) — `addressLine2` is
optional. Both examples now use the real field names (`billingProfileName`, `addressLine1`,
`countryCode`).

## Scope gap (not necessarily a bug): a second, larger invoice API isn't documented

A separate, more extensive `Api/v1/Billing/InvoiceApi.ts` exists (drafts, line items, cancel/post/
send/mark-paid, payment terms) beyond what `billing/invoices.md` documents. This is likely an
intentional simplification for customer-facing docs vs. an internal accounting API — flagging in
case that assumption turns out to be wrong, not asserting it's a documentation bug.

## Confirmed accurate — the majority of this domain

Verified field-by-field against the real contracts, all of the following in `billing-profiles.md`
match exactly and don't need touching: Update Name (`PUT .../name`, `{"billingProfileName"}`),
Update/Delete Purchase Order Number, Add/Delete Email Address (`{"emailAddress"}`), Enable/Disable
email delivery (`PUT .../send-invoices-by-email`, `{"sendInvoicesByEmail"}`), and List/Get/Delete
Billing Profile routes.

In `invoices.md`: List Invoices, Get Invoice Details (the real API genuinely uses the singular
`/invoice/{invoiceId}` segment — not a doc typo), Get Invoice PDF URL (response shape `{"url":
...}`, filename pattern both match `BillingProfileApi.ts` literally), and List Transactions are
all accurate. The one gap (List Invoices/List Transactions not mentioning pagination — see
`api-docs.md`'s pagination rule, the mechanism applies here too) was closed 2026-07-22 with a tip
pointing readers at the `x-Total`/`Link` headers.

`docs/billing/index.md`'s "Billing Profiles are personal and can only be accessed by their owner"
framing is accurate and matches the identity-based assignment model — this is the correct mental
model; do not let `workspaces/billing.md`'s contradictory (and fictional) workspace-scoped billing
claims override it. See `workspaces-docs.md` for that finding. Payment-methods claims (wire
transfer only, others "in development") could not be verified either way from backend code — not
contradicted, but not confirmable; treat as unverified.
