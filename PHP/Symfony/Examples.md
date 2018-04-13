# Examples


## Query for one specific field's value

```php
<?php

class AppBundle/Entity/FortuneCookieRepository
{

    public function countNumberPrintedForCategory(Category $category)
    {
        return $this->createQueryBuilder('fc')
            ->andWhere('fc.category = :category')
            ->setParameter('category', $category)
            ->select('SUM(fc.numberPrinted) as fortunesPrinted')
            ->getQuery()
            ->getSingleScalarResult();
    }
}
```
