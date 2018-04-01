# Curl


## POST

```bash
curl http://mylord.cn -X POST --data 'a=b&c=d' --data-binary '@filename'
```

- `--data-binary`

    To send binary file, if the value starts with a `@`, curl read contents from the specified `filename`

