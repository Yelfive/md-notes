# Cascade Operations

```php
<?php

namespace App\Entity;

class Comment
{
    /**
     * @var User
     * @ORM\ManyToOne(targetEntity="App\Entity\User", cascade={"all"})
     */
    protected $user;
}

```

