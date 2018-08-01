# Association Mapping

## OneToMany

This bidirectional mapping requires the `mappedBy` attribute on the "one" side and the `inversedBy` attribute on the "many" side.

```php
<?php
use Doctrine\Common\Collections\ArrayCollection;

/** @Entity */
class Product
{
    // ...
    /**
     * One Product has Many Features.
     * @OneToMany(targetEntity="Feature", mappedBy="product")
     */
    private $features;
    // ...

    public function __construct() {
        $this->features = new ArrayCollection();
    }
}

/** @Entity */
class Feature
{
    // ...
    /**
     * Many Features have One Product.
     * @ManyToOne(targetEntity="Product", inversedBy="features")
     * @JoinColumn(name="product_id", referencedColumnName="id")
     */
    private $product;
    // ...
}
```
