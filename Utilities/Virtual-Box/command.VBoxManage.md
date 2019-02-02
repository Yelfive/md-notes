# VBoxManage command

## Start virtual machines without GUI

```bash
VBoxManage startvm <vm> --type headless
```

### example

```bash
VBoxManage startvm Ubuntu --type headless
```

## Pause virtual machine

```bash
VBoxManage controlvm "Ubuntu Server" pause --type headless
```

## Restart an paused virtual machine

```bash
VBoxManage controlvm "Ubuntu Server" resume --type headless
```

## To shut down the VM

```bash
VBoxManage controlvm "Ubuntu Server" poweroff --type headless
```