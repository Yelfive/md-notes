# Dictionary

## ACID

- `A` Atomicity
    
    The whole transaction should be considered as a minimum unit, which is atomicity, indivisible

- `C` Consistency

    A transaction brings the data from one state to another, without violating all the rules and constrains, including triggers

- `I` Isolation

    Isolation is for concurrent transactions(concurrency control). If concurrency happens, it should result in the same state where the transactions is executed sequentially. So, each transaction is isolated with another.

- `D` Durability

    Makes sure state saved after committed.

## CAP

- `C` Consistency

    Every read receives the most recent write or an error.

    > Note that, `Consistency` here is quite different from that of [ACID](#ACID)

- `A` Available

    __Every request receives a (non-error) response__ – without guarantee that it contains the most recent write.

- `P` Partition tolerance

    __The system continues to operate__ despite an arbitrary number of messages being dropped (or delayed) by the network between nodes.

    `Partition`, in this context, means network partition(segmentation), which causes communication errors like message dropping.
    
    `tolerance` means to accept the fact that partition happens.

#### CAP theorem(AKA, Brewer's theorem)

> Distributed system can never fulfill all the three guarantees.
>
> No distributed system is safe from network failures, thus,
> network partitioning generally has to be tolerated(`Partition tolerance`).
>
> Since `P` is taken, `C` and `A` cannot both be guaranteed,
> choice should be made.

#### See Also

- [WIKI](https://en.wikipedia.org/wiki/CAP_theorem)

## BASE philosophy

- `BA` Basically Available

    available with slight delay

- `S` Soft state
- `E` Eventually Consistent

## TCC

Try Confirm Cancel

## MQ

Message Queue

## SOA

Service-Oriented Architecture

Abbrev  | Description
---     | ---
CAP     | C: Consistency<br> A: Availability<br> P: Partition tolerance
BASE    | :x:
