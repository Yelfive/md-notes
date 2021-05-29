# Surface problems

## Disable DPST

```batch
regedit
```

Under

```
Computer\HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\Control\Class\{4d36e968-e325-11ce-bfc1-08002be10318}\0001
```

Choose key

```
FeatureTestControl
```

Set value from `0x9240` to `0x9250`

Reboot
