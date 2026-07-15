if not status is-interactive
    and set --query nvm_default_version
    and not set --query nvm_current_version
    nvm use --silent $nvm_default_version 2>/dev/null
end
