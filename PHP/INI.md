INIs
====

max_execution_time integer
--------------------------

This sets the maximum time in seconds a script is allowed to run before it is terminated by the parser. This helps prevent poorly written scripts from tying up the server. 

**The default setting is 30. When running PHP from the command line the default setting is 0.**

**The maximum execution time is not affected by system calls, stream operations, sleep, db execution etc.**

Please see the [set_time_limit(int $seconds)][set-time-limit] function for more details.

> **bool set_time_limit ( int $seconds )**

> Set the number of seconds a script is allowed to run. If this is reached, the script returns a fatal error. The default limit is 30 seconds or, if it exists, the max_execution_time value defined in the php.ini.

> When called, set_time_limit() restarts the timeout counter from zero. In other words, if the timeout is the default 30 seconds, and 25 seconds into script execution a call such as set_time_limit(20) is made, the script will run for a total of 45 seconds before timing out.

You can not change this setting with ini_set() when running in [safe mode][safe-mode]. The only workaround is to turn off safe mode or by changing the time limit in the php.ini.

Your web server can have other timeout configurations that may also interrupt PHP execution. Apache has a Timeout directive and IIS has a CGI timeout function. Both default to 300 seconds. See your web server documentation for specific details.


[set-time-limit]: http://php.net/manual/en/function.set-time-limit.php
[safe-mode]: http://php.net/manual/en/ini.sect.safe-mode.php#ini.safe-mode


