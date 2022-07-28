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