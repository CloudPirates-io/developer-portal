---
next: false
---

# Pagination

List endpoints such as trainings, billing profiles, and invoices support pagination through two
query parameters, so you can fetch large result sets in smaller chunks instead of all at once.

## Query Parameters

Two query parameters control pagination:

- **`limit`** (Default `20`): The number of items to return in a single request.
- **`offset`** (Default `0`): The number of items to skip before starting to collect the result
  set.
  An offset of 0 means no items are skipped at the start.

### Example Request

```bash
GET /v1/trainings?limit=20&offset=0
```

This request fetches the first 20 training records.

## Response Headers

The API response includes these headers:

- **`x-Total`**: The total number of items available.
- **`x-Limit`**: The maximum number of items returned. Specified in the request or the default.
- **`x-Offset`**: The number of items skipped before collecting.
  Specified in the request or the default.

### Example Response Headers

These headers would be returned alongside items 40 through 44.

```bash
x-Total: 100
x-Limit: 5
x-Offset: 40
```

## Link Header

The `Link` header provides relative links to navigate between pages.
It includes links for the first, previous, next, and last pages.
Note that the `prev` and `next` links don't exist if you are on the first or last page,
respectively.

### Example Link Header

```bash
Link: </v1/trainings?limit=20&offset=0>; rel="first",
      </v1/trainings?limit=20&offset=20>; rel="prev",
      </v1/trainings?limit=20&offset=40>; rel="next",
      </v1/trainings?limit=20&offset=80>; rel="last"
```

In this example:

- The `first` link points to trainings 0-19.
- The `prev` link points to trainings 20-39.
- The `next` link points to trainings 40-59.
- The `last` link points to trainings 80-99 (can be less than the limit).

## Handling Empty Links

On the first page, the `prev` link is missing:

```bash
Link: </v1/trainings?limit=20&offset=0>; rel="first",
      </v1/trainings?limit=20&offset=20>; rel="next",
      </v1/trainings?limit=20&offset=80>; rel="last"
```

On the last page, the `next` link is missing:

```bash
Link: </v1/trainings?limit=20&offset=0>; rel="first",
      </v1/trainings?limit=20&offset=60>; rel="prev",
      </v1/trainings?limit=20&offset=80>; rel="last"
```
