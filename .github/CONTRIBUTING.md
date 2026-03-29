# Contributing

All kinds of contributions (enhancements, new features, documentation & code improvements, issues & bugs reporting) are welcome.

## Code style

### Javascript

We use [ESLint](http://eslint.org) based on Google code style to maintain code style.
Check code status with:

``` bash
npm run lint
```

## Issues

When you create an issue to report a bug or ask a question, please fill template information, except if is **really not relevant**. And all others related information that are susceptible to help us.

## Pull requests

All pull requests should target the **main** branch unless a maintainer asks otherwise.

Before a pull request :

 - Verify CI checks pass (Hugo compatibility workflow and linting)
 - Blog generation (`hugo`) must not output template errors
 - Check code style with eslint.
 - Don't forget to update user and/or developer documentation if it's necessary
