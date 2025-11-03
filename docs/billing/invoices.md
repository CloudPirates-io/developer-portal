---
next: false
---

# Invoices

View, download, and manage your CloudPirates invoices.

## Overview

Access invoices at [portal.cloudpirates.io/billing](https://portal.cloudpirates.io/billing).

## Viewing Invoices

### Invoice List

All invoices with:
- Invoice number
- Date issued
- Amount
- Status (Paid, Pending, Overdue)
- Billing Profile
- Download link

### Invoice Details

Click any invoice to view:
- Line items
- Billing address
- Payment information
- Due date
- Transaction history

## Invoice Status

**Paid**: Payment received and completed

**Pending**: Payment not yet received, within payment period

**Overdue**: Payment past due date, payment required

## Downloading Invoices

### PDF Download

1. Navigate to billing page
2. Find invoice
3. Click "Download PDF"
4. Save to device

PDFs include complete invoice details, payment instructions, and purchase order number (if set).

## Account Balance

View current balance:
- **Positive**: Credit on account
- **Negative**: Outstanding payments
- **Zero**: All invoices settled

Balance details include current balance, pending charges, recent payments, and next invoice date.

## Transaction History

Complete record of all transactions:

**Types**:
- Invoice charges
- Payments received
- Credits applied
- Refunds processed

**Details**: Date, amount, type, invoice reference, payment method, status

## Email Invoices

### Automatic Delivery

Invoices automatically sent to email addresses configured in Billing Profile.

Email includes:
- Invoice PDF attachment
- Payment instructions
- Due date
- Portal link

### Disable Email Delivery

1. Navigate to Billing Profile settings
2. Toggle "Send invoices by email" off
3. Invoices remain accessible in portal

## Payment

### Wire Transfer

Current payment method:

1. Review invoice amount and details
2. Get bank details from invoice
3. Send payment via bank transfer
4. Include invoice reference number

::: warning Warning: Always Include Payment Reference
You must always include the invoice reference number in your payment to ensure proper allocation to your account.
:::

### Payment Confirmation

Payment typically reflected within 2-3 business days. Invoice status updates to "Paid" and receipt becomes available for download.

## API Reference

### List Invoices

```http
GET /v1/billing/billing-profiles/{billingProfileId}/invoices
Authorization: Bearer <access-token>
```

### Get Invoice Details

```http
GET /v1/billing/billing-profiles/{billingProfileId}/invoice/{invoiceId}
Authorization: Bearer <access-token>
```

### Get Invoice PDF URL

Get a signed URL to download the invoice PDF:

```http
GET /v1/billing/billing-profiles/{billingProfileId}/invoices/{invoiceId}/pdf-url
Authorization: Bearer <access-token>
```

Response:
```json
{
  "url": "https://api.cloudpirates.io/v1/billing/billing-profiles/{billingProfileId}/invoices/{invoiceId}/pdf/Rechnung%20{number}.pdf?expires={timestamp}&token={token}"
}
```

### List Transactions

```http
GET /v1/billing/billing-profiles/{billingProfileId}/transactions
Authorization: Bearer <access-token>
```

::: info Info: Full API Documentation Available
These are example requests. For complete API documentation including all parameters, response schemas, and authentication details, visit [api.cloudpirates.io/docs](https://api.cloudpirates.io/docs/).
:::

## Related Resources

- [Billing Overview](./index.md)
- [Billing Profiles](./billing-profiles.md)
- [Workspace Billing](/workspaces/billing.md)
