---
paths:
  - "src/billing/**"
---

# Billing docs

## Billing profile field names

Create/update take `{"billingProfileName": string, "billingProfileAddress": {...}}`, and
`billingProfileAddress` requires `addressLine1`, `postalCode`, `city`, `countryCode` (2-letter ISO
code), with `addressLine2` optional. The command payload schemas are `additionalProperties: false`,
so looser, more-generic-sounding names like `name`/`address`/`street` are rejected outright. Use the
exact field names.

Other `billing-profiles.md` shapes: Update Name (`PUT .../name`, `{"billingProfileName"}`),
Update/Delete Purchase Order Number, Add/Delete Email Address (`{"emailAddress"}`), Enable/Disable
email delivery (`PUT .../send-invoices-by-email`, `{"sendInvoicesByEmail"}`), plus List/Get/Delete
Billing Profile.

## `invoices.md`

The invoice route genuinely uses the singular `/invoice/{invoiceId}` segment; it isn't a typo, don't
"fix" it. Get Invoice PDF URL returns `{"url": ...}`. Both List Invoices and List Transactions are
paginated and should mention the pagination headers (see `api-docs.md`, same global mechanism).

`InvoiceApi.ts` carries more surface than `invoices.md` documents (drafts, line items,
cancel/post/send/mark-paid, payment terms). That's a deliberate simplification for customer-facing
docs versus the internal accounting API. Don't treat it as a gap to fill without asking the user
first.

## Two scopes for billing, both real

`billing/index.md` and `billing-profiles.md` describe the identity-owned model: a billing profile
belongs to a user identity, assigned via
`POST /v1/billing/billing-profiles/{billingProfileId}/identity`. `workspaces/billing.md` describes
workspace-scoped billing. Both are correct for their own scope; don't let one page's framing
override the other, and don't rewrite either into a "billing is only ever identity-owned" claim.
