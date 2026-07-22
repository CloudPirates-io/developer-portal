---
prev: false
---

# CloudPirates API

Our API provides programmatic access to our platform's features and data, allowing you to
to manage all our managed services, integrate with third-party services, and automate processes.

## API Specification

You can find the full API specification in the [OpenAPI 3.1](https://spec.openapis.org/oas/v3.1.0) format here:

https://api.cloudpirates.io/docs/

## Event Sourced Architecture

Our event sourced architecture employs eventually consistent read models. As a result, changes made by a `POST`, `PUT`, `PATCH`, or `DELETE` request may take a moment until all read models are fully updated.

This delay might cause a subsequent (`GET`) request, executed immediately after the mutating request, to encounter an error, often indicated by an HTTP status code such as `404` or `403`.

## Obtaining an API key

To access our API endpoints, you need to authenticate your requests using an `API key` included in the Authorization header of your HTTP requests. Obtain an API key by signing up on our [customer portal](https://portal.cloudpirates.io).

After you have logged in to our customer portal, you can create a new API key by going to your [security page](https://portal.cloudpirates.io/security).

::: warning Warning: Secure Your API Key
Treat your API key with the same level of security as you would your password. Avoid exposing it in public repositories, sharing it indiscriminately, or including it directly in client-side code.
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

::: tip Tip: API Key Limitations
Certain API endpoints, such as those that alter security-related settings like `/v1/auth/change-password`, cannot be accessed using API keys. Please consult our [API documentation](https://api.cloudpirates.io/docs/) to identify which endpoints are compatible with API keys.
:::

## API Reference

Our base URL for API requests is `https://api.cloudpirates.io/v1`. Ensure to prepend this base URL to all endpoint paths when making requests to our API.

All endpoints adhere to the RESTful standard, providing a structured and intuitive approach to interacting with our platform's resources.

To access a specific service, you have to use the right endpoint. They are built in the following manner:

```
https://api.cloudpirates.io/v1/{service}/{resource}
```

So, example URLs could look like this:

https://api.cloudpirates.io/v1/auth/me

https://api.cloudpirates.io/v1/workspaces/{workspaceId}

https://api.cloudpirates.io/v1/workspaces/{workspaceId}/members
