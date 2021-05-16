# Composite TypeScript Workspace

This is a demonstration of a composite TypeScript project configuration with pnpm workspaces.

The workspace consists of three projects: `client`, `api`, `service`. The basic idea is that a browser-based application (`client`) is communicating to `api` through `service`.

## The Problem

The problem that this repo demonstrates a solution to is how to organize multiple projects in a monorepo, so that their dependency tree is reflected correctly, as well as taking advantage of incremental typescript compilation.

1. `client` should have access to browser-native types (such as `window`), but not have access to node types, such as `process`
2. `api` and `service` shouldn't have access to browser types, but should be able to access node types
3. `api` is a dependency of `service`, and should be listed in its list of dependencies
4. `api` is not a dependency of `client`, yet we want to be able to import `API` type to allow type-safe integration.

And we want to run type checking on all projects incrementally with one command, taking into account their respective environments

## The Solution

1. Root `tsconfig` does not include any files (running `tsc -p . --listFiles` should produce nothing)
2. However, root `tsconfig` includes references to `service` and `client` projects running `tsc --build` will build all referenced projects incrementally (`tsc --build --verbose` will show projects built)
3. `service` lists `@cw/api` in its dependencies, which means that when we install `service` dependencies, `api` and its dependencies will be included in install
4. `service` `tsconfig` includes a reference to `api` to include it in composite compilation tree
5. `client` doesn't list `api` in dependencies, but references it in `tsconfig`

## References:

[Project References - TypeScript Documentation](https://www.typescriptlang.org/docs/handbook/project-references.html)
