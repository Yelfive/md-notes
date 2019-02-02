# VBoxManage command

## Start virtual machines without GUI

```bash
VBoxManage startvm <vm> --type headless
```

- `--type headless` means no GUI

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

## List virtual machines

### List running virtual machines

```bash
VBoxManage list runningvms
```

### List running virtual machines verbosely
