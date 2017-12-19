# Confusing Classes

## Builder

Illuminate\Database\\{**Query\Builder vs Eloquent\Builder**}

- Eloquent\Builder

    `Eloquent\Builder` is a mixin of `Query\Builder`, see `Eloquent\Builder::__call`

    ```php
    <?php


    public function __call($method, $parameters)
    {
        /* Other statements */
        $this->query->{$method}(...$parameters);

        return $this;
    }
    ```

- Query\Builder


