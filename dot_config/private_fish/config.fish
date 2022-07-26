starship init fish | source

### SSH
set -x SSH_AUTH_SOCK "$HOME/.ssh/agent.sock"
if not ss -a | grep -q "$SSH_AUTH_SOCK";
  rm -f "$SSH_AUTH_SOCK"
  set wsl2_ssh_pageant_bin "$HOME/.ssh/wsl2-ssh-pageant.exe"
  if test -x "$wsl2_ssh_pageant_bin";
    setsid nohup socat UNIX-LISTEN:"$SSH_AUTH_SOCK,fork" EXEC:"$wsl2_ssh_pageant_bin" >/dev/null 2>&1 &
  else
    echo >&2 "WARNING: $wsl2_ssh_pageant_bin is not executable."
  end
  set --erase wsl2_ssh_pageant_bin
end

### GPG
set -x GPG_AGENT_SOCK "$HOME/.gnupg/S.gpg-agent"
if not ss -a | grep -q "$GPG_AGENT_SOCK";
  rm -rf "$GPG_AGENT_SOCK"
  set wsl2_ssh_pageant_bin "$HOME/.ssh/wsl2-ssh-pageant.exe"
  if test -x "$wsl2_ssh_pageant_bin";
    setsid nohup socat UNIX-LISTEN:"$GPG_AGENT_SOCK,fork" EXEC:"$wsl2_ssh_pageant_bin --gpg S.gpg-agent" >/dev/null 2>&1 &
  else
    echo >&2 "WARNING: $wsl2_ssh_pageant_bin is not executable."
  end
  set --erase wsl2_ssh_pageant_bin
end

set -gx PATH $PATH $HOME/.krew/bin

#tfswitch && go
export PATH="$PATH:$HOME/bin:/usr/local/go/bin:$HOME/.local/bin"

function k
  kubecolor $argv
end

function kubectl
  kubecolor $argv
end

alias kubectx='kubecolor --plain ctx'
alias kubens='kubecolor --plain ns'
alias kubeone="env HTTPS_PROXY=socks5://127.0.0.1:1234 kubectl" 
alias python=python3
alias pip=pip3

export BROWSER=wslview
export KUBE_EDITOR=(which vim)

eval (/home/linuxbrew/.linuxbrew/bin/brew shellenv)

direnv hook fish | source

source /home/linuxbrew/.linuxbrew/opt/asdf/libexec/asdf.fish

source /home/linuxbrew/.linuxbrew/opt/asdf/libexec/asdf.fish
