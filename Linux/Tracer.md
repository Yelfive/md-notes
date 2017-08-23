Tracer
======

strace
------

> Show system call trace of a process, see [System Call](./System+Call.md)

**1. trace one process**

```bash
strace -p <PID>
```

**2. Count time calls e.t.c**

> This option will show a statistic result, after pressing `Ctrl C` to stop `strace` which should have run a while to collect enough data

```bash
strace -cp <PID>
```



**Example**

```bash
strace -p 123
```

you will get:

```
--- SIGCHLD {si_signo=SIGCHLD, si_code=CLD_EXITED, si_pid=6404, si_status=0, si_utime=0, si_stime=0} ---
recvfrom(4, "DELETED\r\n", 8192, MSG_DONTWAIT, NULL, NULL) = 9
```

notice the number `4` in syscall `recvfrom`

```bash
strace -p 123 -e recvfrom -e read=4
```

and you will get the following:

```
recvfrom(4, "RESERVED 35639 1380\r\nphp /var/ww"..., 8192, MSG_DONTWAIT, NULL, NULL) = 1403
 | 00000  52 45 53 45 52 56 45 44  20 33 35 36 33 39 20 31  RESERVED 35639 1 |
 | 00010  33 38 30 0d 0a 70 68 70  20 2f 76 61 72 2f 77 77  380..php /var/ww |
 | 00020  77 2f 68 74 6d 6c 2f 79  69 69 20 72 65 71 75 65  w/html/yii reque |
 | 00030  73 74 2f 63 61 70 74 75  72 65 20 22 7b 5c 22 68  st/capture "{\"h |
 | 00040  65 61 64 65 72 5c 22 3a  7b 5c 22 49 66 2d 4d 6f  eader\":{\"If-Mo |
 | 00050  64 69 66 69 65 64 2d 53  69 6e 63 65 5c 22 3a 5c  dified-Since\":\ |
 | 00060  22 54 68 75 2c 20 31 37  20 41 75 67 20 32 30 31  "Thu, 17 Aug 201 |
 | 00070  37 20 30 38 3a 34 32 3a  32 35 20 47 4d 54 5c 22  7 08:42:25 GMT\" |
 | 00080  2c 5c 22 41 63 63 65 70  74 2d 45 6e 63 6f 64 69  ,\"Accept-Encodi |
 | 00090  6e 67 5c 22 3a 5c 22 67  7a 69 70 5c 22 2c 5c 22  ng\":\"gzip\",\" |
 | 000a0  58 2d 41 63 63 65 73 73  2d 54 6f 6b 65 6e 5c 22  X-Access-Token\" |
 | 000b0  3a 5c 22 34 33 63 66 37  35 32 66 39 30 30 38 39  :\"43cf752f90089 |
 | 000c0  32 64 30 33 65 61 61 35  35 33 34 34 31 33 63 65  2d03eaa5534413ce |
 | 000d0  37 38 32 5c 22 2c 5c 22  58 2d 41 70 70 2d 56 65  782\",\"X-App-Ve |
 | 000e0  72 73 69 6f 6e 5c 22 3a  5c 22 31 2e 38 2e 30 5c  rsion\":\"1.8.0\ |
 | 000f0  22 2c 5c 22 55 73 65 72  2d 41 67 65 6e 74 5c 22  ",\"User-Agent\" |
 | 00100  3a 5c 22 41 6e 64 72 6f  69 64 5c 22 2c 5c 22 43  :\"Android\",\"C |
 | 00110  6f 6e 6e 65 63 74 69 6f  6e 5c 22 3a 5c 22 63 6c  onnection\":\"cl |
 | 00120  6f 73 65 5c 22 2c 5c 22  58 2d 46 6f 72 77 61 72  ose\",\"X-Forwar |
 ......
 ......
 ......
```

which includes all data in both hexadecimal and ASCII format.

**Reference from man strace **

> `-e read=set` Perform a full hexadecimal and ASCII dump of all the data read from file descriptors listed in the specified set.  For example, to see all input activity on file descriptors 3 and 5 use -e read=3,5.  Note that this is independent from the normal tracing of the read(2) system call which is controlled by the option -e trace=read.

> `-e write=set` Perform  a  full hexadecimal and ASCII dump of all the data written to file descriptors listed in the specified set.  For example, to see all output activity on file descriptors 3 and 5 use -e write=3,5.  Note that this is independent from the normal tracing of the write(2) system call which is controlled by the option -e trace=write.


### Appendix

- [strace.io](https://strace.io/)
- [sourceforge](https://sourceforge.net/projects/strace/)

