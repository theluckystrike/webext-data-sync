# Contributing to webext-data-sync

Thank you for your interest in contributing. This guide covers how to report issues, develop locally, and submit changes.

## REPORTING ISSUES

When reporting issues, please include:

- A clear description of the problem
- Steps to reproduce the issue
- Your environment (browser, extension manifest version, Node.js version)
- Any relevant error messages or logs

Use the GitHub issue tracker to file bugs and feature requests. For bugs, include a minimal reproduction case if possible.

## DEVELOPMENT WORKFLOW

1. Fork the repository
2. Clone your fork locally
3. Create a feature branch from `main`
4. Make your changes
5. Run tests and type checking
6. Commit with clear, descriptive messages
7. Push to your fork and submit a pull request

To build the project:

```bash
npm install
npm run build
```

## CODE STYLE

This project uses TypeScript with the following conventions:

- Use ES6+ syntax (async/await, arrow functions, template literals)
- Prefer explicit typing over `any`
- Use meaningful variable and function names
- Keep functions focused and small
- Add JSDoc comments for public APIs

Run TypeScript compiler to check for errors:

```bash
npm run build
```

## TESTING

Before submitting changes, verify the build succeeds:

```bash
npm run build
```

The project uses TypeScript's type checking as a basic validation. Ensure all type errors are resolved.

## LICENSE

By contributing to this project, you agree that your contributions will be licensed under the MIT License.
