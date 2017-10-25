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
- `A` Available
- `P` Partition tolerance

**CAP theorem(AKA, Brewer's theorem)**

- `C` Consistency

    Every read receives the most recent write or an error

- `A` Available

    Every request receives a (non-error) response – without guarantee that it contains the most recent write

- `P` Partition tolerance

> Distributed system can never fulfill all the three guarantees.

## BASE

- `BA` Basically Available: available with slight delay
- `S` Soft state: 
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
