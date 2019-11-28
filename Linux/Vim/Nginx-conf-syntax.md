# Nginx Configure File Highlighting

```bash
#!/bin/bash
#
# Highligh Nginx config file in Vim

# Download syntax highlight
mkdir -p ~/.vim/syntax/
wget http://www.vim.org/scripts/download_script.php?src_id=19394 -O ~/.vim/syntax/nginx.vim

# Set location of Nginx config file
cat > ~/.vim/filetype.vim <<EOF
au BufRead,BufNewFile /etc/nginx/*,/etc/nginx/conf.d/*,/usr/local/nginx/conf/* if &ft == '' | setfiletype nginx | endif
EOF
```