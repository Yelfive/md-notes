# Service Layer



## Discussion: Why using service layer at all

Martin Fowler's book "Patterns of Enterprise Architecture" states:

> The easier question to answer is probably when not to use it. You probably don't need a Service Layer if your application's business logic will only have one kind of client - say, a user interface - and it's use case responses don't involve multiple transactional resources. [...]
>
> But as soon as you envision a second kind of client, or a second transactional resource in use case responses, it pays to design in a Service Layer from the beginning.

The benefits a Service Layer provides is that it defines a common set of application operations available to different clients and coordinates the response in each operation. Where you have an application that has more than one kind of client that consumes its business logic and has complex use cases involving multiple transactional resources - it makes sense to include a Service Layer with managed transactions.

With CRM, Sales and Inventory there will be a lot of CRUD-type use cases of which there is almost always a one-to-one correspondence with Service Layer operations. The responses to creation, update or deletion of a domain object should be coordinated and transacted atomically by Service Layer operations.

Another benefit of having a Service Layer is that it can be designed for local or remote invocation, or both - and gives you the flexibility to do so. The pattern lays the foundation for encapsulated implementation of an application's business logic and invocation of that logic by various clients in a consistent manner. This means you also reduce/remove duplication of code, as your clients share the same common services. You can potentially reduce maintenance costs too - as when your business logic changes, you (generally) only need to change the service, and not each of the clients.

In summary, it's good to use a Service Layer - more-so I think in your example you have provided as it sounds like you have multiple clients of business logic.



> From [design patterns - How essential is it to make a service layer? - Software Engineering Stack Exchange](https://softwareengineering.stackexchange.com/questions/162399/how-essential-is-it-to-make-a-service-layer)

