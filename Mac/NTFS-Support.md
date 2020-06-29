# NTFS Support

`Samba` is recommended over `NTFS`

### 1. open file

```bash
vim /etc/fstab
```

### 2. paste the following

`Your-NTFS-Volume-Name` should be replaced by your NTFS volume's name, which probably is a Flash Drive

```text
# device-spec                   mount-point     fs-type     options   
LABEL="Your-NTFS-Volume-Name"   none            ntfs        rw,auto,nobrowse
```

### 3. Reboot or remount(<font color="red">HOW?</font>)