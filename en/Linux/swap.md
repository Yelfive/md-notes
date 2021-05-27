# swap on Ubuntu

Swap is a space on a disk that is used when the amount of physical RAM memory is full. When a Linux system runs out of RAM, inactive pages are moved from the RAM to the swap space.

Swap space can take the form of either a dedicated swap partition or a swap file. Generally when running Ubuntu on a virtual machine, a swap partition is not present, and the only option is to create a swap file.

This tutorial covers the steps necessary to add a swap file on Ubuntu 18.04 systems.

## Before You Begin

Before continuing with this tutorial, check if your Ubuntu installation already has swap enabled by typing:

```bash
sudo swapon --show
```

If the output is empty, it means that your system does not have swap space enabled.

Otherwise, if you get something like below, you already have swap enabled on your machine.

```text
NAME      TYPE      SIZE USED PRIO/dev/sda2 partition 1.9G   0B   -2
```

Although possible, it is not common to have multiple swap spaces on a single machine.

## Creating a Swap File

The user you are logged in as must have [sudo privileges](https://linuxize.com/post/how-to-create-a-sudo-user-on-ubuntu/) to be able to activate swap. In this example, we will add 1G swap. If you want to add more swap, replace 1G with the size of the swap space you need.

Perform the steps below to add swap space on Ubuntu 18.04.

1. Start by creating a file which will be used for swap:

   ```bash
   sudo fallocate -l 4G /swapfile
   ```

   If `fallocate` is not installed or you get an error message saying `fallocate` failed: Operation not supported then use the following command to create the swap file:

   ```bash
   sudo dd if=/dev/zero of=/swapfile bs=1024 count=1048576
   ```

2. Only the root user should be able to write and read the swap file. Set the correct [permissions](https://linuxize.com/post/chmod-command-in-linux/) by typing:

   ```bash
   sudo chmod 600 /swapfile
   ```

3. Use the mkswap utility to set up a Linux swap area on the file:

   ```bash
   sudo mkswap /swapfile
   ```

4. Activate the swap file using the following command:

    ```bash
    sudo swapon /swapfile
    ```

    To make the change permanent open the /etc/fstab file:

    ```bash
    sudo nano /etc/fstab
    ```

    and paste the following line:

    ```fstab
    /swapfile swap swap defaults 0 0
    ```

5. Verify that the swap is active by using either the `swapon` or the [`free` command](https://linuxize.com/post/free-command-in-linux/), as shown below:

   ```bash
   sudo swapon --show
   ```

   ```text
   NAME      TYPE  SIZE   USED PRIO/swapfile file 1024M 507.4M   -1
   ```

   ```bash
   sudo free -h
   ```

   ```text
   total        used        free      shared  buff/cache   availableMem:           488M        158M         83M        2.3M        246M        217MSwap:          1.0G        506M        517M
   ```

## Adjusting the Swappiness Value

Swappiness is a Linux kernel property that defines how often the system will use the swap space. Swappiness can have a value between 0 and 100. A low value will make the kernel to try to avoid swapping whenever possible, while a higher value will make the kernel use the swap space more aggressively.

The default swappiness value is `60`. You can check the current swappiness value by typing the following command:

```bash
cat /proc/sys/vm/swappiness
```

```reStructuredText
60
```

While the swappiness value of `60` is OK for most Linux systems, for production servers, you may need to set a lower value.

For example, to set the swappiness value to `10`, run:

```bash
sudo sysctl vm.swappiness=10
```

To make this parameter persistent across reboots, append the following line to the /etc/sysctl.conf file:

`/etc/sysctl.conf`

```reStructuredText
vm.swappiness=10
```

The optimal swappiness value depends on your system workload and how the memory is being used. You should adjust this parameter in small increments to find an optimal value.

## Removing a Swap File

To deactivate and remove the swap file, follow these steps:

1. Start by deactivating the swap space by typing:

   ```bash
   sudo swapoff -v /swapfile
   ```

2. Next, remove the swap file entry `/swapfile swap swap defaults 0 0` from the `/etc/fstab` file.

3. Finally, remove the actual swapfile file using the [rm](https://linuxize.com/post/rm-command-in-linux/) command:

   ```bash
   sudo rm /swapfile
   ```

## If you have swap already

If you already have a swap file, and want to resize it.

First, you should `swapoff` it:

```bash
sudo swapoff /swapfile
```

and then remove it(not really needed, as you will create a new one)

```bash
sudo rm -f /swapfile
```

## Conclusion

You have learned how to create a swap file and activate and configure swap space on your Ubuntu 18.04 system.

Original article: [How to Add Swap Space on Ubuntu 18.04 | Linuxize](https://linuxize.com/post/how-to-add-swap-space-on-ubuntu-18-04/)
