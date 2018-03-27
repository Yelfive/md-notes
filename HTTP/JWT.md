# JSON Web Token

## RS256: RSA with public and private keys

### Generate private key

```bash
ssh-keygen -b 4096 -f ./jwt
```

### Generate corresponding public key

```php
<?php

$privateKey = file_get_contents('jwt');

$resource = openssl_pkey_get_private($privateKey);
$detail = openssl_pkey_get_details($resource);

return $detail['key'];
```
