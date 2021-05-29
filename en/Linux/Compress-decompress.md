# Compress and decompress

## zip

### zip a file

```bash
zip zipfile.zip -9 file1 file2 file3
```

### delete a file from zip

```bash
zip zipfile.zip -9 -d file1
```

### view files in a zip

```bash
# list entries in zip archive
unzip -l zipfile.zip

# view entries and files in zip archive
view zipfile.zip
```

### options

- `-r` recursively, zip directory

## tar

```bash
tar -zxf file.tar
# unzip xz file
tar xf file.tar.xz
```

## xz-utils

```bash
# Install
sudo apt install -y xz-utils
# Decompress
unxz file.xz
xz --decompress file.xz
```
