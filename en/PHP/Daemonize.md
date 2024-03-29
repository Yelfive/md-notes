# PHP Daemonize

## Code Snippet

```php
<?php

// Use php command as daemon

$pid = pcntl_fork(); // fork
if ($pid < 0) { // error
    exit;
} else if ($pid) {// parent
    exit;
} else { // child
    // make the current child process as session leader
    $sid = posix_setsid();

    // error
    if ($sid < 0) exit;

    // do something for 5 minutes
    for($i = 0; $i <= 60; $i++) {
        sleep(5);
    }
}
```

**One** key for _daemonizing_ is the method `posix_setsid`:

```php
posix_setsid ( void ) : int
```

> Make the current process a session leader. Returns the session id, or -1 on errors.

Which allows child process to get rid of the parent process and become the leader of the session group. And when the child process dies somehow, it won't become a zombie process.

**Another** key is the `pcntl_fork` which is the same as `fork` of `C`, it forks a process as its child, and returns the new process id(`PID`):

```php
pcntl_fork ( void ) : int
```

> The pcntl_fork() function creates a child process that differs from the parent process only in its PID and PPID.

And it returns

> 1. On success, the PID of the child process is returned in the parent's thread of execution.
> 2.  and a 0 is returned in the child's thread of execution.
> 3. On failure, a -1 will be returned in the parent's context, no child process will be created, and a PHP error is raised.

## Appendix

- [pcntl_fork](http://php.net/manual/en/function.pcntl-fork.php)
- [posix_setsid](http://php.net/manual/en/function.posix-setsid.php)
- [守护进程之PHP实现](https://segmentfault.com/a/1190000008916867)
- [PHP程序守护进程化](http://rango.swoole.com/archives/59)
