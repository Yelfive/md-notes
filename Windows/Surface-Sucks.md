# Suface problems

## Disable DPST

```cmd
regedit
```

Under

```text
Computer\HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\Control\Class\{4d36e968-e325-11ce-bfc1-08002be10318}\0001
```

Choose key

```text
FeatureTestControl
```

Set value from `0x9240` to `0x9250`

Reboot
