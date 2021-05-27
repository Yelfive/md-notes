# Download As File

```php
<?php

// Tell the client, the server supports resume at breakpoint
header('Accept-Ranges:bytes');

// As common file
header('Content-Type:application/octet-stream');

// Set the name of the file to be downloaded as 
header('Content-Disposition:attachment;filename=<file.extension>');
```
