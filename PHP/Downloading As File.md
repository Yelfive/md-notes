# Download As File

```php
<?php

header('Content-type:application/octet-stream');

// Tell the client, the server supports resume at breakpoint
header('Accept-Ranges:bytes');

// Set the name of the file to be downloaded as 
header('Content-Disposition:attachment;filename=<file.extension>');
```
