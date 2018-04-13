# Examples

```php
src/AppBundle/Entity/FortuneCookieRepository.php

<?php

public function countNumberPrintedForCategory(Category $category)
{
    return $this->createQueryBuilder('fc')
        ->andWhere('fc.category = :category')
        ->setParameter('category', $category)
        ->select('SUM(fc.numberPrinted) as fortunesPrinted')
        ->getQuery()
        ->getSingleScalarResult();
}
```
