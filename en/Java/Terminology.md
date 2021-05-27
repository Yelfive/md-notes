# Java Terminology

- enclosing

    When we say A is enclosing instance of B, we mean that B is inner class of A,
    the instance that encapsulate B.

    Enclosing here means the instance that contains the other.

    Quote:

    > A nested class is a member of its **enclosing** class.
    > Non-static nested classes (inner classes) have access to other members of the **enclosing** class, even if they are declared private.
    > Static nested classes do not have access to other members of the **enclosing** class.
    > See [here](./Nested-Classes.md).

- otherwise

    originally.

    > Consider two top-level classes, A and B, where B needs access to members of A that would **otherwise** be declared `private`.

- shadow

    hide

    When saying a shadows b, meaning that b is hidden and a is the replacement.

    > If a declaration of a type (such as a member variable or a parameter name) in a particular scope (such as an inner class or a method definition) has the same name as another declaration in the enclosing scope,
    > then the declaration **shadows** the declaration of the enclosing scope.

- AWT: Abstract Window Toolkit

    A package contains GUI methods.
    `java.awt.event` etc.
