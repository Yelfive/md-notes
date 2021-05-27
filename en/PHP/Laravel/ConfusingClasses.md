# Confusing Classes

## Builder

Illuminate\Database\\{**Query\Builder vs Eloquent\Builder**}

- Eloquent\Builder

    `Eloquent\Builder` is a mixin of `Query\Builder`, see `Eloquent\Builder::__call`

    ```php
    <?php

    namespace Illuminate\Database\Eloquent;

    /**
     * @mixin \Illuminate\Database\Query\Builder
     */
    class Builder
    {
        public function __call($method, $parameters)
        {
            /* Other statements */
            // this->query is instance of Query\Builder
            $this->query->{$method}(...$parameters);

            return $this;
        }
    }
    ```

- Query\Builder

    Compose the database SQL.
