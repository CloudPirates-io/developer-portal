---
prev: false
---

# CloudPirates API

The CloudPirates API gives you programmatic access to your managed services and data. Use it to
manage your services, integrate with third-party tools, and automate the tasks you'd otherwise do
by hand.

## API Specification

You can find the full API specification in the
[OpenAPI 3.1](https://spec.openapis.org/oas/v3.1.0) format here:

https://api.cloudpirates.io/docs/

## Event Sourced Architecture

Our event sourced architecture employs eventually consistent read models.
As a result, changes made by a `POST`, `PUT`, `PATCH`, or `DELETE` request may return `200` or
`201` right away, but actually take a moment until all read models are fully updated.

This delay might cause a subsequent `GET` request, executed immediately after the mutating
request, to encounter an error, often indicated by an HTTP status code such as `404` or `403`.

## Obtaining an API key

To access our API endpoints, you need to authenticate your requests using an `ApiKey` included
in the `Authorization` header.
Obtain one by signing up on our [customer portal](https://portal.cloudpirates.io).

After you have logged in to our customer portal, you can create a new API key by going to your
[portal.cloudpirates.io/security](https://portal.cloudpirates.io/security).

::: warning Secure Your API Key
Treat your API key with the same level of security as you would your password.
Don't expose it in public repositories, share it indiscriminately, or include it directly in
client-side code.
:::

## Authenticating your Request

Once you have obtained an API key, you can use it in your requests:

```bash
GET /v1/auth/me HTTP/1.1
Host: api.cloudpirates.io
Authorization: ApiKey <API_KEY>
```

As an example, you can get your current identity with the following `curl` request:

```bash
curl -H "Authorization:ApiKey <API_KEY>" https://api.cloudpirates.io/v1/auth/me
```

::: tip API Key Limitations
Certain API endpoints, such as those that alter security-related settings like
`/v1/auth/change-password`, cannot be accessed using API keys.
See our [API documentation](https://api.cloudpirates.io/docs/) for which ones support them.
:::

## API Reference

Our base URL for API requests is `https://api.cloudpirates.io/v1`.
Prepend it to every endpoint path below.

All endpoints follow REST conventions: resources map to URL paths, and standard HTTP methods
(`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) map to actions on them.

## Examples

A few example endpoints:

| Method   | Endpoint                            | Description                            |
| -------- | ----------------------------------- | -------------------------------------- |
| `GET`    | `/workspaces`                       | List all workspaces you're a member of |
| `POST`   | `/workspaces`                       | Create a new workspace                 |
| `GET`    | `/workspaces/{workspaceId}`         | Get details of a workspace             |
| `DELETE` | `/workspaces/{workspaceId}`         | Delete a workspace                     |
| `GET`    | `/workspaces/{workspaceId}/members` | Get all members of a workspace         |
