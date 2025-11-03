---
next: false
---

# Pagination

This document provides detailed information on how to use pagination in API requests for listing resources such as trainings, billing profiles, invoices, and more.

Pagination helps in managing large datasets by breaking them down into smaller, more manageable chunks.

## Query Parameters

The pagination is controlled by two query parameters:

- **`limit`** (Default `20`): The number of items to return in a single request.
- **`offset`** (Default `0`): The number of items to skip before starting to collect the result set. An offset of 0 meaning no items are skipped at the start.

### Example Request

```bash
GET /v1/trainings?limit=20&offset=0
```

This request fetches the first 20 training records.

## Response Headers

The API response includes several headers to provide information about the pagination and total number of items available:

- **`x-Total`**: The total number of items available.
- **`x-Limit`**: The limit specified in the request, or the default limit if not specified.
- **`x-Offset`**: The offset specified in the request, or the default offset if not specified.

### Example Response Headers

```bash
x-Total: 100
x-Limit: 20
x-Offset: 0
```

## Link Header

The `Link` header provides relative links to navigate between pages. It includes links for the first, previous, next, and last pages. Note that the `prev` and `next` links may not exist if you are on the first or last page, respectively.

### Example Link Header

```bash
Link: </v1/trainings?limit=20&offset=0>; rel="first",
      </v1/trainings?limit=20&offset=20>; rel="prev"
      </v1/trainings?limit=20&offset=40>; rel="next",
      </v1/trainings?limit=20&offset=80>; rel="last"
```

In this example:
- The `first` link points to the first page of the results.
- The `prev` link points to the previous page of the results.
- The `next` link points to the next page of the results.
- The `last` link points to the last page of the results.

## Handling Empty Links

When navigating through the pages:
- The `prev` link will be missing if you are on the first page.
- The `next` link will be missing if you are on the last page.

### Example of non existing Links

On the first page:
```bash
Link: </api/trainings?limit=20&offset=0>; rel="first",
      </api/trainings?limit=20&offset=20>; rel="next",
      </api/trainings?limit=20&offset=80>; rel="last"
```

On the last page:
```bash
Link: </api/trainings?limit=20&offset=0>; rel="first",
      </api/trainings?limit=20&offset=60>; rel="prev",
      </api/trainings?limit=20&offset=80>; rel="last"
```
