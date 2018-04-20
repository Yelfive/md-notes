# Memory Usage

## ps

```txt
total Total installed memory (MemTotal and SwapTotal in /proc/meminfo)

used Used memory (calculated as total - free - buffers - cache)

free Unused memory (MemFree and SwapFree in /proc/meminfo)

shared Memory used (mostly) by tmpfs (Shmem in /proc/meminfo, on kernels 2.6.32, displayed as zero if not available)

buffers Memory used by kernel buffers (Buffers in /proc/meminfo)

cache Memory used by the page cache and slabs (Cached and Slab in /proc/meminfo)

buff/cache Sum of buffers and cache

available Estimation of how much memory is available for starting new applications, without swapping. Unlike the data provided by the cache or free fields, this field takes into account page cache and also that not all reclaimable memory slabs will be reclaimed due to items being in use (MemAvailable in /proc/meminfo, available on kernels 3.14, emulated on kernels 2.6.27+, otherwise the same as free)
```

https://www.linuxatemyram.com/