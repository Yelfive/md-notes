# Examples


## Query for one specific field's value

```php
<?php

class AppBundle/Entity/FortuneCookieRepository
{

    public function countNumberPrintedForCategory(Category $category)
    {
        /** @var string $name */
        $name = $this->createQueryBuilder('c')
            ->andWhere('c.id = :id')
            ->setParameter('id', $id)
            ->select('c.name')
            ->getQuery()
            ->getSingleScalarResult();
    }
}
```
