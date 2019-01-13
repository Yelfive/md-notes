# Mac Time Machine

## Backup to windows disk

### 1. Create a shared directory on Windows

### 2. Connect to the shared directory

Using <kbd>Command + K</kbd> in `Finder` to connect to the windows shared directory.

### 3. Create a blank image

1. Open `Disk Utility`.
2. Using `Command + N` to open creating dialog.
3. `Save As` is the name of image file on the disk.
4. `Name` is the name displayed after mounted.
5. `Size` must be no less than storage of MAC for backup
6. `Format` must be `Mac OS Extended(Journaled)
7. `Partition` as `Single Partition - GUID Partition Map`
8. `Image Format` must be `sparse disk image`


```bash
sudo tmutil setdestination /Volumes/<name of the volume>
```

## Appendix

- [jianshu](https://www.jianshu.com/p/388998fada12)