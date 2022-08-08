[![GitHub stars](https://img.shields.io/github/stars/rust84/dotfiles?color=green&style=for-the-badge)](https://github.com/rust84/dotfiles/stargazers "This repo star count")
[![GitHub last commit](https://img.shields.io/github/last-commit/rust84/dotfiles?color=purple&style=for-the-badge)](https://github.com/rust84/dotfiles/commits/main "Commit History")
[![Lines of code](https://img.shields.io/tokei/lines/github/rust84/dotfiles?style=for-the-badge)](https://github.com/rust84/dotfiles/graphs/contributors "Repo # lines of code")
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/rust84/dotfiles/Schedule%20-%20Renovate?label=renovate&logo=renovatebot&style=for-the-badge)](https://github.com/rust84/dotfiles/actions/workflows/schedule-renovate.yaml)

# Dotfiles

My dotfiles managed by chezmoi

## Installation

Install [chezmoi](https://www.chezmoi.io/docs/install/#one-line-package-install).

## Initizalize chezmoi

```sh
chezmoi --source ~/repos/dotfiles init https://github.com/rust84/dotfiles.git
```

## Deploy dotfiles

```sh
chezmoi apply
```
