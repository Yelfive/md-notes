# Authentication: Form Login

## security.yaml

```yaml
# config/packages/security.yaml

security:
    # https://symfony.com/doc/current/security.html#where-do-users-come-from-user-providers
    providers:
        db_provider:
            entity:
                class: App\Entity\Admin
#                property: username
    firewalls:
        dev:
            pattern: ^/(_(profiler|wdt)|css|images|js)/
            security: false
        main:
            pattern: ^/admin/*

            # activate different ways to authenticate
            # https://symfony.com/doc/current/security.html#a-configuring-how-your-users-will-authenticate

            form_login:
                # The page to render the login form
                login_path: /login

                # Route to send the username and password to
                check_path: /admin/login/check
                default_target_path: board-list
            provider: db_provider
            # https://symfony.com/doc/current/security/form_login_setup.html

        # Easy way to control access for large sections of your site
        # Note: Only the *first* access control that matches will be used
#    access_control:
#        - { path: ^/login$, roles: IS_AUTHENTICATED_ANONYMOUSLY }
#        - { path: ^/admin$, roles: IS_AUTHENTICATED_ANONYMOUSLY }
#        - { path: ^/admin/login$, roles: IS_AUTHENTICATED_ANONYMOUSLY }
#        - { path: ^/admin, roles: ROLE_ADMIN }
    encoders:
        App\Entity\Admin: bcrypt
```

### 1.

The config above `security.firewalls.main.form_login.check_path` can also be _route name_ as the Symfony says, however, you cannot simply replace `path/to/check` to `name-login-check`

```php
<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\EquatableInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\AdvancedUserInterface;

class Admin implements AdvancedUserInterface, \Serializable, EquatableInterface
{
    public function isEqualTo(UserInterface $user)
    {
        if ($this->password !== $user->getPassword()) {
            return false;
        }

        if ($this->salt !== $user->getSalt()) {
            return false;
        }

        if ($this->username !== $user->getUsername()) {
            return false;
        }

        return true;
    }
}

```

### 2. make sure to have the entity implement the `EquatableInterface` or else the logged in user will be immediately logged out

