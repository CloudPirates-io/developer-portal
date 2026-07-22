# Billing Profiles

Personal payment accounts that contain your billing information and enable paid features.

## Overview

::: info Info: Personal Access Only
Billing Profiles are personal and can only be accessed by their owner.
:::

Access your Billing Profiles at [portal.cloudpirates.io/billing](https://portal.cloudpirates.io/billing).

## Creating a Billing Profile

1. Navigate to [portal.cloudpirates.io/billing](https://portal.cloudpirates.io/billing)
2. Click "Create Billing Profile"
3. Enter billing information:
   - **Name**: Display name for identification
   - **Company Name** (if applicable)
   - **Full Address**: Street, city, postal code, country
   - **Tax Information**: VAT ID (if applicable)
4. Save profile

## Billing Information

### Profile Name

Display name used for identification and organization purposes.

### Address Details

Required information:

- Street address
- City
- Postal code / ZIP
- Country
- Company name (optional)
- Tax ID / VAT ID (if applicable)

### Invoice Email Addresses

Add email addresses to receive invoices:

1. Navigate to Billing Profile settings
2. Click "Add Email Address"
3. Enter email address
4. Confirm

**Multiple Emails**: Add multiple addresses to send invoices to different recipients.

**Disable Email Delivery**: Toggle "Send invoices by email" off to only access invoices in the portal.

### Purchase Order Number

Assign a custom identifier to all invoices from this Billing Profile.

::: tip Tip: Purchase Order Number Usage
The purchase order number appears on all invoices from this profile and in the subject line of invoice emails. You can update it anytime.
:::

## Managing Billing Profiles

### Edit Profile

1. Navigate to [portal.cloudpirates.io/billing](https://portal.cloudpirates.io/billing)
2. Select profile to edit
3. Update information (name, address, purchase order number)
4. Save changes

Changes apply to future invoices.

### Delete Profile

Requirements:

- No active assignments to workspaces or services
- No transactions exist

::: warning Warning: Cannot Delete Profiles with Transaction History
Billing Profiles cannot be deleted if any transactions exist. Profiles with transaction history are permanently retained for accounting and compliance purposes.
:::

Steps:

1. Remove all workspace/service assignments
2. Navigate to profile settings
3. Click "Delete Profile"
4. Confirm deletion

### Transfer Billing Profile

Billing Profiles can be transferred to a different user by CloudPirates support.

**How to Request**:

1. Contact [support@cloudpirates.io](mailto:support@cloudpirates.io)
2. Provide:
   - Billing Profile ID
   - Current owner email
   - New owner email
   - Reason for transfer

::: warning Warning: Profile Transfers Require Support
Billing Profile transfers must be requested through support. Contact [support@cloudpirates.io](mailto:support@cloudpirates.io) to initiate a transfer.
:::

## Assignments

### Assign to Workspaces

Link Billing Profile to workspaces to enable paid features:

1. Navigate to workspace settings
2. Go to billing section
3. Select Billing Profile
4. Confirm assignment

[Learn more about workspace billing →](/workspaces/billing.md)

### Multiple Assignments

One Billing Profile can be assigned to multiple workspaces and services, providing consolidated billing with a single invoice.

## API Reference

### List Billing Profiles

```http
GET /v1/billing/billing-profiles
Authorization: Bearer <access-token>
```

### Get Billing Profile

```http
GET /v1/billing/billing-profiles/{billingProfileId}
Authorization: Bearer <access-token>
```

### Create Billing Profile

```http
POST /v1/billing/billing-profiles
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "billingProfileName": "My Billing Profile",
  "billingProfileAddress": {
    "addressLine1": "Main St 123",
    "city": "Berlin",
    "postalCode": "10115",
    "countryCode": "DE"
  }
}
```

### Update Billing Profile Name

```http
PUT /v1/billing/billing-profiles/{billingProfileId}/name
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "billingProfileName": "Updated Profile Name"
}
```

### Update Billing Profile Address

```http
PUT /v1/billing/billing-profiles/{billingProfileId}/address
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "billingProfileAddress": {
    "addressLine1": "New Street 456",
    "city": "Munich",
    "postalCode": "80331",
    "countryCode": "DE"
  }
}
```

### Update Purchase Order Number

```http
PUT /v1/billing/billing-profiles/{billingProfileId}/purchase-order-number
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "purchaseOrderNumber": "PO-2024-002"
}
```

### Delete Purchase Order Number

```http
DELETE /v1/billing/billing-profiles/{billingProfileId}/purchase-order-number
Authorization: Bearer <access-token>
```

### Add Email Address

```http
POST /v1/billing/billing-profiles/{billingProfileId}/email-addresses
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "emailAddress": "billing@example.com"
}
```

### Delete Email Address

```http
DELETE /v1/billing/billing-profiles/{billingProfileId}/email-addresses
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "emailAddress": "billing@example.com"
}
```

### Enable/Disable Invoice Email Delivery

```http
PUT /v1/billing/billing-profiles/{billingProfileId}/send-invoices-by-email
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "sendInvoicesByEmail": true
}
```

### Delete Billing Profile

```http
DELETE /v1/billing/billing-profiles/{billingProfileId}
Authorization: Bearer <access-token>
```

::: info Info: Full API Documentation Available
These are example requests. For complete API documentation including all parameters, response schemas, and authentication details, visit [api.cloudpirates.io/docs](https://api.cloudpirates.io/docs/).
:::

## Related Resources

- [Billing Overview](./index.md)
- [Invoices](./invoices.md)
- [Workspace Billing](/workspaces/billing.md)
