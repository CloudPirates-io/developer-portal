# Error Handling

Our API utilizes HTTP status codes extensively to communicate errors and outcomes effectively for your requests. Below is a list of the most common errors you may encounter when using our API.

## Error Codes Overview

| Code | Description                                                                                                                |
| ---- | -------------------------------------------------------------------------------------------------------------------------- |
| 400  | Bad Request - The server cannot process the request due to a client error, such as malformed syntax or invalid parameters. |
| 401  | Unauthorized - The request requires authentication, but the client has not provided valid credentials.                     |
| 403  | Forbidden - The client does not have permission to access the requested resource.                                          |
| 404  | The server could not find the requested resource.                                                                          |
| 409  | Conflict - The request conflicts with the current state of the resource, e.g. a duplicate invite or member.                |
| 422  | Unprocessable Entity - The request was well-formed but could not be processed due to semantic errors.                      |
| 429  | Too Many Requests - The client has sent too many requests in a given amount of time (rate limiting).                       |
| 500  | Internal Server Error - The server encountered an unexpected condition preventing it from fulfilling the request.          |
| 501  | Not Implemented - The server does not support the functionality required to fulfill the request.                          |
| 502  | Bad Gateway - The server received an invalid response from an upstream server while trying to fulfill the request.         |
| 503  | Service Unavailable - The server is currently unable to handle the request due to temporary overloading or maintenance.    |
| 504  | Gateway Timeout - The server did not receive a timely response from an upstream server or proxy.                           |

::: tip 429 Too Many Requests
Rate limiting, if enforced, happens at the infrastructure/ingress layer in front of our API and is not something our backend services implement or guarantee. Treat a `429` as a signal to back off and retry with backoff, but don't rely on specific limits unless we document them separately.
:::

When you encounter an error, you get a detailed explanation of the error in the response body. Depending on which layer rejected the request, the status code is exposed either under a `status` field or under a `code` field — see the `401`/`403` examples below.

## 400 Bad Request

You send an invalid request with missing or wrong payload. Please look at the response body to get the exact error details.

**Examples**

Invalid Request with missing property `workspaceName`:

```json
{
  "status": 400,
  "instancePath": "",
  "schemaPath": "#/required",
  "keyword": "required",
  "params": {
    "missingProperty": "workspaceName"
  },
  "message": "must have required property 'workspaceName'"
}
```

Invalid request with disallowed additional property `myAdditionalProperty`:

```json
{
  "status": 400,
  "instancePath": "",
  "schemaPath": "#/additionalProperties",
  "keyword": "additionalProperties",
  "params": {
    "additionalProperty": "myAdditionalProperty"
  },
  "message": "must NOT have additional properties"
}
```

Requests that pass schema validation but are rejected by business-rule checks use a different, flatter shape (no `instancePath`/`schemaPath`/`keyword`). For example, creating a workspace with an invalid `workspaceKey`:

```json
{
  "status": 400,
  "message": "WorkspaceKey {workspaceKey} is invalid",
  "params": {
    "workspaceKey": "invalid key!"
  },
  "path": "workspaceKey",
  "expected": "valid workspaceKey"
}
```

## 401 Unauthorized

Unauthorized - The request requires user authentication or, if the request included authorization credentials, authorization
has been refused for those credentials.

The response shape depends on why the request was rejected:

- Missing, invalid, or expired credentials — status is exposed under `status`:

  ```json
  {
    "status": 401,
    "message": "Unauthorized"
  }
  ```

- No authenticated identity when a role-based permission check runs — status is exposed under `code`:

  ```json
  {
    "code": 401,
    "message": "Unauthorized"
  }
  ```

## 403 Forbidden

Forbidden - The server understood the request, but is refusing to fulfill it. Re-Authentication will not change this.

The response shape depends on which check rejected the request:

- Missing role/permission for the resource type — status is exposed under `code`:

  ```json
  {
    "code": 403,
    "message": "Forbidden"
  }
  ```

- Missing access to a specific resource instance (e.g. a workspace or cluster you're not a member of) — status is exposed under `status`:

  ```json
  {
    "status": 403,
    "message": "Forbidden"
  }
  ```

## 404 Not Found

The server could not find the requested resource. This typically occurs when the requested URL is invalid, or the resource does not exist on the server.

::: warning Warning: Eventually Consistent Read Models
Our event sourced architecture employs eventually consistent read models. As a result, changes made by a POST, PUT, PATCH, or DELETE request may take a moment until all read models are fully updated. This delay might cause a subsequent GET request, executed immediately after the mutating request, to encounter an error like 404 or 403.
:::

**Example**

```json
{
  "status": 404,
  "message": "Not found"
}
```

## 500 Internal Server Error

The HTTP status code 500 indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.
This is a generic error message used when the server cannot provide a more specific error message.

**Example**

```json
{
  "status": 500,
  "message": "Internal Server Error"
}
```

## 502 Bad Gateway

Our API gateway returns a 502 Bad Gateway status when it encounters an issue with our internal backend service that prevents it from fulfilling your request.

This status code is used for all unexpected errors that do not specifically fall under the [Service Unavailable](#_503-service-unavailable) (`503`) or [Gateway Timeout](#_504-gateway-timeout) (`504`) categories.

**Example**

```json
{
  "status": 502,
  "message": "Bad Gateway"
}
```

## 503 Service Unavailable

Our backend service for this endpoint is (temporarily) unavailable.

::: warning Warning: Asynchronous Request Processing
Our internal backend system uses asynchronous handlers to process requests. Therefore, even if you encounter an error, your request may still be executed asynchronously at a later time.
:::

**Example**

```json
{
  "status": 503,
  "message": "Service Unavailable"
}
```

## 504 Gateway Timeout

Our backend service was unable to handle your request due to a timeout.

::: warning Warning: Asynchronous Request Processing
Our internal backend system uses asynchronous handlers to process requests. Therefore, even if you encounter an error, your request may still be executed asynchronously at a later time.
:::

**Example**

```json
{
  "status": 504,
  "message": "Gateway Timeout"
}
```
