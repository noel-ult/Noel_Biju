# Book inventory system

A MongoDB/Express API with a React frontend for creating, listing, editing, and deleting books.

## Setup

Create a root `.env` for a disposable local MongoDB database:

```dotenv
MONGODB_URI=mongodb://127.0.0.1:27017/book_inventory_demo
PORT=5000
NODE_ENV=development
```

Set `MONGODB_URI` explicitly: `config/db.js` otherwise falls back to a committed remote connection string. Replace and rotate those committed credentials before using a shared deployment.

Run the API from the repository root:

```sh
npm ci
npm start
```

In a second terminal:

```sh
cd frontend
npm ci
npm start
```

The API uses port 5000 and the React development server uses 3000. `frontend/src/api.js` hardcodes `http://localhost:5000/api`; change that source configuration for a different API origin.

## API and persistence

| Method | Path | Request/result |
| --- | --- | --- |
| GET | `/` | API metadata |
| GET | `/api/books` | `{success, count, data}` list |
| POST | `/api/books` | Create a book; 201 with `{success, data}` |
| PUT | `/api/books/:id` | Update model fields; `{success, data}` |
| DELETE | `/api/books/:id` | Delete and return a message |

Required fields are `title`, `author`, `genre`, and nonnegative `price`. `stock` defaults to zero and cannot be negative. Optional `publishedYear` must be between 1000 and the current year. The model is in `models/Book.js`; route handlers are in `routes/bookRoutes.js`. These endpoints are public and have no login or authorization layer.

## Development and checks

The frontend entry imports `./App`; both `App.js` and `App.jsx` are tracked, so check module resolution before editing an alternate implementation. Build with `cd frontend && npm run build`. API and integrated test scripts are tracked at the root, but `npm test` there is a failing placeholder. Inspect test scripts before using a real database, since they create and delete records. `TEST_RESULTS.md` is a historical report, not evidence of the current environment's test results.

For a manual check, create a disposable book, edit its stock, reload the list, and delete it; also check a negative price validation error. The API does not serve the React build, so deployment must host the frontend separately or add explicit serving/proxy configuration.

## More documentation

- [Source, command, and configuration reference](docs/REFERENCE.md)
- [Contributing](CONTRIBUTING.md)

<!-- developer-handbook-20261028 -->
[Source reference](docs/REFERENCE.md) · [Verification and operations](docs/OPERATIONS.md)
<!-- /developer-handbook-20261028 -->
