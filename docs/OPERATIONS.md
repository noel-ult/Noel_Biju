# Noel_Biju: verification and operations

Reviewed against [default-branch commit 3b95cfa64b96](https://github.com/noel-ult/Noel_Biju/commit/3b95cfa64b9685b34b5493eb9d5456d49ef6e6d7) on 2026-10-28. Start with the [developer guide](../README.md) for installation and architecture, and the [source reference](REFERENCE.md) for exact scripts, configuration readers, routes, and source locations.

## Book inventory

Create a book with required fields, update stock, reload the list, delete it, and check rejection of negative price/stock. Use an explicitly configured disposable MongoDB.

These are acceptance scenarios for a maintainer to run in the documented environment. Their inclusion is not a claim that live integrations or production credentials were tested during this documentation update.

## Deployment and failure diagnosis

The API and React build need separate serving/proxy configuration. Check the hardcoded frontend API address and App.js/App.jsx resolution when a change appears ineffective.

## Maintaining the contract

When behavior changes, update the guide and examples in the same PR. Check the entry point and working directory before copying commands. Use the linked source readers to distinguish build-time configuration from process environment. For failures, capture the first application error, runtime version, selected mode, and redacted configuration names before later proxy or port errors.

Keep changes tied to evidence: a declared command is not proof it passes, a process health response is not a successful end-to-end workflow, and a historical report describes its own revision. Record actual check results and any unavailable external services in the PR.
