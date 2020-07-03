# How does `Object.hashCode()` work ?

- The default `hashCode()` implementation (identity hash code) **has nothing to do with the object’s memory address**, at least in OpenJDK. In versions 6 and 7 it is a randomly generated number. In 8 and, for now, 9, it is a number based on the thread state. Here is a test that yields the same conclusion.
  - Proving that “implementation-dependent” warns are not aesthetic: Azul’s Zing does generate the identity hash from the object’s memory address.
- In HotSpot, the result of the identity hash generation is generated once, and cached in the mark word of the object’s header.
  - Zing uses a different solution to keep it consistent despite object relocations, in which they delay storing the id. hash until the object relocates. At that point, it’s stored in a “pre-header”
- In HotSpot, calling the default `hashCode()`, or `System.identityHashCode()` will make the object ineligible for biased locking.
  - This implies that **if you are synchronizing on objects that have no contention, you’d better override the default `hashCode()` implementation** or you’ll miss out on JVM optimizations.
- It is possible to disable biased locking in HotSpot, on a per-object basis.
  - This can be very useful. I’ve seen applications very heavy on contended producer/consumer queues where biased locking was causing more trouble than benefit, so we disabled the feature completely. Turns out, we could’ve done this only on specific objects/classes simply by calling `System.identityHashCode()` on them.
- ~~I have found no HotSpot flag that allows changing the default generator, so experimenting with other options might need to compile from source.~~
  - Admittedly, I didn’t look much. Michael Rasmussen kindly pointed out that -XX:hashCode=2 can be used to change the default. Thanks!

Original from: [How does the default hashCode() work?](https://srvaroa.github.io/jvm/java/openjdk/biased-locking/2017/01/30/hashCode.html)