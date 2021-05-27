# brew

## brew services

- start 
    ```bash
    brew services start nginx
    ```
- list
- stop
- restart

### PHP log file on Mac

/usr/local/var/log/

## The GitHub credentials in the macOS keychain may be invalid.

```
Clear them with:
  printf "protocol=https\nhost=github.com\n" | git credential-osxkeychain erase
Or create a personal access token:
  https://github.com/settings/tokens/new?scopes=gist,public_repo&description=Homebrew
and then set the token as: export HOMEBREW_GITHUB_API_TOKEN="your_new_token"
```

```bash
export HOMEBREW_GITHUB_API_TOKEN='81289358eca8cbe45ad43bfab38f07a35a5ad6f2'
```


# Nginx

Docroot is: /usr/local/var/www

The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that
nginx can run without sudo.

nginx will load all files in /usr/local/etc/nginx/servers/.

To have launchd start nginx now and restart at login:
  brew services start nginx
Or, if you don't want/need a background service you can just run:
  nginx
==> Summary
🍺  /usr/local/Cellar/nginx/1.12.2_1: 23 files, 1MB