# Pre Process Macro



## include 

### Usage

```c
#include <system-lib.h>

// double quotes
#include "user-lib.h"
```

1. `<>` to load system library
2. `""` will check both system library and custom library with specified path


## define

### Usage

```c
#define PI 3.1415926
```

### Example

```c
#include <stdio.h>

#define HOST "rm-bp1u23dv08808be0xo.mysql.rds.aliyuncs.com"
#define USER "jkhz_aliyun"
#define PASSWORD "ALiJian2017Jkhz"
#define BACKUP_DIR "/root/exhibition-backup/"

#define CMD "mysqldump -h" HOST " -u" USER " -p" PASSWORD " exhibition > " BACKUP_DIR "exhibition-`date +%Y-%m-%d`.sql"

int main()
{
    system(CMD);
}
```
