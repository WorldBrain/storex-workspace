Lerna workspace to work on all officially supported Storex packages together

# Installation

```
$ git clone --recursive git@github.com:WorldBrain/storex-workspace.git
$ yarn
$ yarn lerna bootstrap
```

# Testing

```
$ yarn test --parallel
or
$ yarn test # get prettier output by not running in parallel
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
