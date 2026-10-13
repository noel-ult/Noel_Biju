# Noel_Biju source reference


Source reviewed: [`d63cf84997b1`](https://github.com/noel-ult/Noel_Biju/commit/d63cf84997b152c3e82e0af751a97efd79fab8ef).

This reference records the checked-in source, scripts, configuration names, and route declarations. It is a navigation aid; service availability and successful test execution require separate verification.

## Package commands

Run each command in the directory containing its package manifest. A declared script is not necessarily a passing check; guides call out placeholders and known mismatches.

### frontend/package.json

| Script | Shell command |
| --- | --- |
| `start` | `react-scripts start` |
| `build` | `react-scripts build` |
| `test` | `react-scripts test` |
| `eject` | `react-scripts eject` |

Manifest: [frontend/package.json](../frontend/package.json).

### package.json

| Script | Shell command |
| --- | --- |
| `start` | `node server.js` |
| `dev` | `nodemon server.js` |
| `test` | `echo "Error: no test specified" && exit 1` |

Manifest: [package.json](../package.json).

## Configuration names

Names below are declared by source or example files. Example-only entries may be stale; consult the linked reader and project guide before relying on them. Secret values are intentionally omitted.

| Name | Declared/read in |
| --- | --- |
| `MONGODB_URI` | [config/db.js](../config/db.js), [integrated-test.js](../integrated-test.js) |
| `NODE_ENV` | [server.js](../server.js) |
| `PORT` | [integrated-test.js](../integrated-test.js), [server.js](../server.js) |

## HTTP route declarations

Paths are **as declared in each source file**. Router/blueprint mount prefixes from the entry point must be prepended; the project guide describes the active entry point and common prefixes. Alternate entry points (such as SQLite) are listed separately by file. Authentication, request bodies, and response schemas live in the linked handlers/models.

| Source | Method | Declared path | Handler |
| --- | --- | --- | --- |
| [routes/bookRoutes.js](../routes/bookRoutes.js) | POST | `/` | `` |
| [routes/bookRoutes.js](../routes/bookRoutes.js) | GET | `/` | `` |
| [routes/bookRoutes.js](../routes/bookRoutes.js) | PUT | `/:id` | `` |
| [routes/bookRoutes.js](../routes/bookRoutes.js) | DELETE | `/:id` | `` |
| [server.js](../server.js) | GET | `/` | `` |

## Existing documentation

Historical plans/reports describe their own revision; use current source when they disagree.

- [TEST_RESULTS.md](../TEST_RESULTS.md)
- [frontend/public/robots.txt](../frontend/public/robots.txt)

## Source and configuration map

Generated lockfiles, binary assets, compiled output, vendored dependencies, and cached bytecode are omitted. Test files remain listed so coverage can be located.

- [config/db.js](../config/db.js)
- [frontend/package.json](../frontend/package.json)
- [frontend/public/index.html](../frontend/public/index.html)
- [frontend/public/manifest.json](../frontend/public/manifest.json)
- [frontend/src/App.css](../frontend/src/App.css)
- [frontend/src/App.js](../frontend/src/App.js)
- [frontend/src/App.jsx](../frontend/src/App.jsx)
- [frontend/src/App.test.js](../frontend/src/App.test.js)
- [frontend/src/api.js](../frontend/src/api.js)
- [frontend/src/components/AddBookForm.jsx](../frontend/src/components/AddBookForm.jsx)
- [frontend/src/components/BookList.jsx](../frontend/src/components/BookList.jsx)
- [frontend/src/components/DeleteConfirmDialog.jsx](../frontend/src/components/DeleteConfirmDialog.jsx)
- [frontend/src/components/EditBookModal.jsx](../frontend/src/components/EditBookModal.jsx)
- [frontend/src/index.css](../frontend/src/index.css)
- [frontend/src/index.js](../frontend/src/index.js)
- [frontend/src/reportWebVitals.js](../frontend/src/reportWebVitals.js)
- [frontend/src/setupTests.js](../frontend/src/setupTests.js)
- [frontend/src/styles.css](../frontend/src/styles.css)
- [frontend/src/theme.js](../frontend/src/theme.js)
- [frontend/src/vibrantTheme.js](../frontend/src/vibrantTheme.js)
- [integrated-test.js](../integrated-test.js)
- [models/Book.js](../models/Book.js)
- [package.json](../package.json)
- [routes/bookRoutes.js](../routes/bookRoutes.js)
- [run-integrated-test.js](../run-integrated-test.js)
- [server.js](../server.js)
- [test-api.js](../test-api.js)
