# Possible Errors

Think about what could go wrong for each route, and the HTTP status code should be sent to the client in each case.
For each thing that could go wrong, make a test with your expected status code and then make sure that possibility is handled.

---

## Relevant HTTP Status Codes

- 200 OK
- 201 Created
- 204 No Content
- 400 Bad Request
- 404 Not Found
- 405 Method Not Allowed
- 418 I'm a teapot
- 422 Unprocessable Entity
- 500 Internal Server Error

---



### PATCH / PUT / POST / DELETE... `/api/articles` etc...

- Status: 405

---

## Available Routes

### GET `/api/topics`

- Only way this can go wrong: 500

### POST `/api/topics`

- No `slug` / `description` in request body: 400
- `slug` that already exists in the database: 422

### GET `/api/articles?author=paul`

- Bad queries:
  - `sort_by` a column that doesn't exist: 400 / 200
  - `order` !== "asc" / "desc": 400 / 200
  - `author` / `topic` that is not in the database: 404
  - `author` / `topic` that exists but does not have any articles associated with it: 200 with { articles: [] }

### POST `/api/articles`

- No `title` / `body` / `topic` / `username` in request body: 400
- `topic` / `username` that doesn't exist: 404 / 400

### GET `/api/articles/:article_id`

- Bad `article_id` (e.g. `/dog`)
- Well formed `article_id` that doesn't exist in the database (e.g. `/999999`)

### PATCH `/api/articles/:article_id`

- No `inc_votes` on request body
- Invalid `inc_votes` (e.g. `{ inc_votes : "cat" }`)
- Some other property on request body (e.g. `{ inc_votes : "cat", name: 'Mitch' }`)

### DELETE `/api/articles/:article_id`

- `article_id` that doesn't exist in the database
- Bad `article_id`

### GET `/api/articles/:article_id/comments`

### POST `/api/articles/:article_id/comments`

### PATCH `/api/comments/:comment_id`

### DELETE `/api/comments/:comment_id`

### GET `/api/users`

### POST `/api/users`

### GET `/api/users/:username`

### GET `/api`