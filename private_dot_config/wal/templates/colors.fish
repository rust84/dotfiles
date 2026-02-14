# pywal-generated fish shell colors
#
# Palette reference:
#   color1=red  color2=green  color3=yellow  color4=blue
#   color5=magenta  color6=cyan  color7=white  color8=bright black

# Syntax
set fish_color_normal {foreground.strip}
set fish_color_command {color4.strip} --bold
set fish_color_keyword {color5.strip}
set fish_color_param {color6.strip}
set fish_color_option {color6.strip}
set fish_color_quote {color2.strip}
set fish_color_comment {color8.strip} --italics
set fish_color_error {color1.strip} --bold
set fish_color_end {color5.strip}

# Operators and redirections
set fish_color_operator {color3.strip}
set fish_color_escape {color3.strip}
set fish_color_redirection {color3.strip} --bold

# Paths and autosuggestion
set fish_color_valid_path --underline
set fish_color_autosuggestion {color8.strip}

# UI / prompt
set fish_color_user {color2.strip} --bold
set fish_color_host {color4.strip}
set fish_color_host_remote {color3.strip}
set fish_color_cwd {color4.strip}
set fish_color_cwd_root {color1.strip}
set fish_color_cancel {color1.strip} --reverse
set fish_color_status {color1.strip}

# Selection and search
set fish_color_selection --bold --background={color8.strip}
set fish_color_search_match --bold --background={color8.strip}
set fish_color_history_current --bold

# Pager (tab completions)
set fish_pager_color_progress {foreground.strip} --background={color4.strip}
set fish_pager_color_prefix {color6.strip} --bold --underline
set fish_pager_color_completion {foreground.strip}
set fish_pager_color_description {color3.strip}
set fish_pager_color_selected_background --background={color8.strip}
