---
next: false
---

# Invoices

View, download, and manage your CloudPirates invoices.

## Overview

View your invoices at [portal.cloudpirates.io/billing](https://portal.cloudpirates.io/billing).

## Viewing Invoices

### Invoice List

Each entry shows:

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

**Paid**: We've received your payment.

**Pending**: Still within the payment period, we haven't received your payment yet.

**Overdue**: Past the due date, payment is now required.

## Downloading Invoices

### PDF Download

1. Navigate to billing page
2. Find invoice
3. Click "Download PDF"
4. Save to device

PDFs include the same details as the invoice page, plus payment instructions and your purchase
order number (if set).

## Account Balance

Your balance can be:

- **Positive**: Credit on account
- **Negative**: Outstanding payments
- **Zero**: All invoices settled

The balance page also shows pending charges, recent payments, and your next invoice date.

## Transaction History

Every transaction on your account is logged here: invoice charges, payments received, credits
applied, and refunds processed. Each entry lists date, amount, type, invoice reference, payment
method, and status.

## Email Invoices

### Automatic Delivery

We automatically email each invoice to the addresses configured in your Billing Profile.

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

To pay by wire transfer:

1. Review the invoice amount and details
2. Get the bank details from the invoice
3. Send the payment via bank transfer
4. Include the invoice reference number

::: warning Always Include Payment Reference
Include the invoice reference number in your payment, or we can't match it to your account.
:::

### Payment Confirmation

Your payment is usually reflected within 2-3 business days. The invoice status then updates to
"Paid" and a receipt becomes available for download.

## API Reference

For invoice listing, invoice detail, PDF download, and transaction requests, see the
[Billing API reference](https://api.cloudpirates.io/docs/#/Billing).

::: tip Paginated List Endpoints
`List Invoices` and `List Transactions` are paginated like every other list endpoint in the API.
See [Pagination](/api/pagination.md) for the `x-Total`/`x-Limit`/`x-Offset`/`Link` headers.
:::

## Related Resources

- [Billing Overview](./index.md)
- [Billing Profiles](./billing-profiles.md)
- [Workspace Billing](/workspaces/billing.md)
