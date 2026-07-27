---
paths:
  - 'docs/billing/**'
---

# Billing docs

Ground truth cross-checked against
`src/services/apigateway/src/Api/v1/Billing/{BillingProfileApi,InvoiceApi}.ts` and the JSON
command-payload contracts under
`src/shared/contracts/schemas/src/Contracts/Billing/BillingProfile/Commands/**`. Re-verify against
current source before trusting this if it's been a while. This domain has the smallest drift of
the areas audited so far.

## Billing profile field names

The real contracts (`create_billing_profile_command_payload_v1.json`,
`ChangeBillingProfileAddressCommandPayloadV1`, both `additionalProperties: false`) require
`{"billingProfileName": string, "billingProfileAddress": {...}}` for create/update, and
`billingProfileAddress` itself (`billing_address.json`) requires `addressLine1, postalCode, city,
countryCode` (2-letter ISO code) — `addressLine2` is optional. Don't drift toward looser,
more-generic-sounding names like `name`/`address`/`street` — the strict `additionalProperties:
false` schema rejects anything that doesn't match exactly.

## A second, larger invoice API exists but isn't documented — not necessarily a bug

`Api/v1/Billing/InvoiceApi.ts` has more surface (drafts, line items, cancel/post/send/mark-paid,
payment terms) than `billing/invoices.md` documents. Likely an intentional simplification for
customer-facing docs vs. an internal accounting API. Don't assume this is a gap to fill without
confirming with the user first.

## Confirmed accurate, don't "fix" these

In `billing-profiles.md`: Update Name (`PUT .../name`, `{"billingProfileName"}`), Update/Delete
Purchase Order Number, Add/Delete Email Address (`{"emailAddress"}`), Enable/Disable email delivery
(`PUT .../send-invoices-by-email`, `{"sendInvoicesByEmail"}`), and List/Get/Delete Billing Profile
routes all match the real contracts field-by-field.

In `invoices.md`: List Invoices, Get Invoice Details (the real API genuinely uses the singular
`/invoice/{invoiceId}` segment, not a doc typo), Get Invoice PDF URL (response shape `{"url":
...}`, filename pattern both match `BillingProfileApi.ts` literally), and List Transactions are all
accurate; both list endpoints should mention pagination (see `api-docs.md`'s pagination rule, the
same mechanism applies here).

`docs/billing/index.md`'s "Billing Profiles are personal and can only be accessed by their owner"
framing matches today's identity-based assignment model and is the correct mental model for
*current* behavior. `workspaces/billing.md` describes a workspace-scoped billing flow that doesn't
exist in the backend yet, but is a confirmed product roadmap item (see `workspaces-docs.md`), so
it's intentionally documented there as planned/not-live rather than denied outright. Both pages are
correct for their own timeframe (today vs. planned) — don't let one override the other.

Payment-methods claims (wire transfer only, others "in development") can't be verified either way
from backend code. Treat as unverified, not confirmed wrong.
