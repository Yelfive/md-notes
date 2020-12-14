# Curl

## Signature

```bash
curl http://example.com -X POST --data 'a=b&c=d' --data-binary '@filename'
```

## Options in detail

- `-X` Request method

- `--data-binary`

    To send binary file, if the value starts with a `@`, curl read contents from the specified `filename`

- `-L`

    Follow the redirection, e.g. Downloading from github for its released zip

- `-k|--insecure`

    Do not check the ssl certificate
