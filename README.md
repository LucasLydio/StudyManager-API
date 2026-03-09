## StudyManager API

CRUD API using **Express + Prisma + Yup**.

### Setup

1. Create `.env` (or copy from `.env.example`)
2. Install deps, generate Prisma client, run migrations

Commands:

```bash
cd StudyManager-API
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

Default URL: `http://localhost:3000`

### Standard responses

Success:

```json
{ "data": "..." }
```

Error:

```json
{
  "error": {
    "code": "VALIDATION_ERROR | NOT_FOUND | CONFLICT | INTERNAL_ERROR",
    "message": "Human-readable message",
    "details": [{ "path": "field", "message": "reason" }]
  }
}
```

### Users

- `POST /users`
- `GET /users`
- `GET /users/:id`
- `PUT /users/:id`
- `DELETE /users/:id`
- `GET /users/:id/courses`

User JSON:

```json
{ "id": 1, "name": "Ana", "email": "ana@mail.com", "created_at": "2026-03-09T00:00:00.000Z" }
```

Notes:
- Email is unique (returns `409` if already in use)
- Validation errors return `400`

### Courses

(Included to support enrollments)

- `POST /courses`
- `GET /courses`
- `GET /courses/:id`
- `PUT /courses/:id`
- `DELETE /courses/:id`

Course JSON:

```json
{ "id": 1, "title": "Node.js", "description": "API fundamentals", "workload": 12 }
```

### Enrollments

- `POST /enrollments`

Body (accepts both snake_case and camelCase):

```json
{ "user_id": 1, "course_id": 1 }
```

Rules:
- Do not allow duplicate registrations (`409`)
- Verify that user and course exist (`404`)
