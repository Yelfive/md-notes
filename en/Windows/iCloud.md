# iCloud Settings for Windows

## Custom location for storage

```batch
mklink /J "C:\Users\<YourName>\iCloudDrive" "D:\Your\Custom\Location"
```

iCloud for Windows does not allow to custom storage location,
but this can be accomplished via `symlink`:
making a `symlink` to refer from your custom directory to `C:\Users\<YourName>\iCloudDrive`.
