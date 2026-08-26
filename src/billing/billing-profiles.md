# Billing Profiles

Personal payment accounts that contain your billing information and enable paid features.

## Overview

::: info Personal Access Only
Billing Profiles are personal and can only be accessed by their owner.
:::

Access your Billing Profiles at
[portal.cloudpirates.io/billing](https://portal.cloudpirates.io/billing).

## Creating a Billing Profile

1. Navigate to [portal.cloudpirates.io/billing](https://portal.cloudpirates.io/billing)
2. Click "Create Billing Profile"
3. Enter your billing information (see [Billing Information](#billing-information) below for
   what each field means)
4. Save the profile

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

**Disable Email Delivery**: Toggle "Send invoices by email" off to only access invoices in the
portal.

### Purchase Order Number

Assign a custom identifier to all invoices from this Billing Profile.

::: tip Purchase Order Number Usage
It appears on all invoices from this profile and in the subject line of invoice emails.
You can update it anytime.
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

::: warning Transaction History Is Permanent
Once a profile has any transactions, it's retained indefinitely for accounting and compliance,
even after you remove its workspace and service assignments.
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

## Assignments

### Assign to Workspaces

Link Billing Profile to workspaces to enable paid features:

1. Navigate to workspace settings
2. Go to billing section
3. Select Billing Profile
4. Confirm assignment

[Learn more about workspace billing →](/workspaces/billing.md)

### Multiple Assignments

One Billing Profile can be assigned to multiple workspaces and services at once, so they're all
covered by a single invoice.

## API Reference

For billing profile listing, creation, updates, and deletion requests, see the
[Billing API reference](https://api.cloudpirates.io/docs/#/Billing).

## Related Resources

- [Billing Overview](./index.md)
- [Invoices](./invoices.md)
- [Workspace Billing](/workspaces/billing.md)
