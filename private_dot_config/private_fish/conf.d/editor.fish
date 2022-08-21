if type -q $HOME/.local/share/aqua/bin/nvim
    set -gx EDITOR $HOME/.local/share/aqua/bin/nvim
    set -gx VISUAL $HOME/.local/share/aqua/bin/nvim
    set -gx KUBE_EDITOR $HOME/.local/share/aqua/bin/nvim
    alias vim $HOME/.local/share/aqua/bin/nvim
    alias vi $HOME/.local/share/aqua/bin/nvim
    alias nano $HOME/.local/share/aqua/bin/nvim
else
    alias nvim vim
end
