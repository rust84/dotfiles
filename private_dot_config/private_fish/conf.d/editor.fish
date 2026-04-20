if type -q $AQUA_ROOT_DIR/bin/nvim
    set -gx EDITOR $AQUA_ROOT_DIR/bin/nvim
    set -gx VISUAL $AQUA_ROOT_DIR/bin/nvim
    set -gx KUBE_EDITOR $AQUA_ROOT_DIR/bin/nvim
    alias vim $AQUA_ROOT_DIR/bin/nvim
    alias vi $AQUA_ROOT_DIR/bin/nvim
    alias nano $AQUA_ROOT_DIR/bin/nvim
else
    alias nvim vim
end
