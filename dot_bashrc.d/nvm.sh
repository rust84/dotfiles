NVM_DATA="${XDG_DATA_HOME:-$HOME/.local/share}/nvm"
NVM_DEFAULT_VERSION="${nvm_default_version:-24}"
if [ -d "$NVM_DATA" ]; then
    for _dir in "$NVM_DATA"/v"$NVM_DEFAULT_VERSION".*/; do
        if [ -x "${_dir}bin/node" ]; then
            case ":$PATH:" in
                *":${_dir}bin:"*) ;;
                *) export PATH="${_dir}bin:$PATH" ;;
            esac
            break
        fi
    done
fi
unset _dir NVM_DATA NVM_DEFAULT_VERSION
