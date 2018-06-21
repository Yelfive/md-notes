# Character set

## Chinese

- `GBK`
    - Two bytes
    - Each byte ranges in ASCII between `161, 254`
- `UTF-16`
    - Two bytes
    - First byte ranges in ASCII between `0x00, 0xFF`
    - Second bytes ranges in ASCII between `0x4E, 0x99`

```php
<?php
echo iconv('utf-16', 'utf-8', chr(rand(0x00, 0xFF)) . chr(rand(0x4E, 0x99)));
```
