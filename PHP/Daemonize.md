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

The key for _daemonizing_ is the method `posix_setsid`:

```php
posix_setsid ( void ) : int
```

> Make the current process a session leader. Returns the session id, or -1 on errors.

Which allows child process to get rid of the parent process and become the leader of the session group.