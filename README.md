Lerna workspace to work on all officially supported Storex packages together

# Installation

```
$ git clone --recursive git@github.com:WorldBrain/storex-workspace.git
$ yarn bootstrap
```

# Testing

```
$ yarn test --parallel
or
$ yarn test
or
$ yarn test:watch
```

# Recompiling everything

```
$ yarn lerna run prepare --parallel
```

# Check for packages with unreleased changes

```
$ yarn check-unreleased
```

# Show unreleased changes for package

```
$ package=@worldbrain/storex-backend-sequelize yarn show-unreleased-changes
```
