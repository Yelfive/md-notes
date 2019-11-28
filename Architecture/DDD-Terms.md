# DDD Terms

## Aggregate

A cluster of associated objects that are treated as a unit for the purpose of data changes. External references are restricted to one member of the AGGREGATE, designated as the root. A set of consistency rules applies within the AGGREGATE’S boundaries.

## Analysis Pattern

A group of concepts that represents a common construction in business modeling. It may be relevant to only one domain or may span many domains (Fowler 1997, p. 8).

## Assertion

A statement of the correct state of a program at some point, independent of how it does it. Typically, an ASSERTION specifies the result of an operation or an invariant of a design element.

## Bounded Context

The delimited applicability of a particular model. BOUNDING CONTEXTS gives team members a clear and shared understanding of what has to be consistent and what can develop independently.

## Client

A program element that is calling the element under design, using its capabilities.

## Cohesion

Logical agreement and dependence.

## Command

(a.k.a. modifier) An operation that effects some change to the system (for example, setting a variable). An operation that intentionally creates a side effect.

## Context

The setting in which a word or statement appears that determines its meaning. See `Bounded Context`.

## Conceptual Contour

An underlying consistency of the domain itself, which, if reflected in a model, can help the design accommodate change more naturally.

## Context Map

A representation of the `Bounded Context`s involved in a project and the actual relationships between them and their models.

## Core Domain

The distinctive part of the model, central to the user’s goals, that differentiates the application and makes it valuable.

## Declarative Design

A form of programming in which a precise description of properties actually controls the software. An executable specification.

## Deep Model

An incisive expression of the primary concerns of the domain experts and their most relevant knowledge. A deep model sloughs off superficial aspects of the domain and naive interpretations.

## Design Pattern

A description of communicating objects and classes that are customized to solve a general design problem in a particular context. (Gamma et al. 1995, p. 3)

## Distillation

A process of separating the components of a mixture to extract the essence in a form that makes it more valuable and useful. In software design, the abstraction of key aspects in a model, or the partitioning of a larger system to bring the CORE DOMAIN to the fore.

## Domain

A sphere of knowledge, influence, or activity.

## Domain-Driven Design

An approach to software development that suggests that (1) For most software projects, the primary focus should be on the domain and domain logic; and (2) Complex domain designs should be based on a model.

## Domain Expert

A member of a software project whose field is the domain of the application, rather than software development. Not just any user of the software, the domain expert has deep knowledge of the subject.

## Domain Layer

That portion of the design and implementation responsible for domain logic within a LAYERED ARCHITECTURE. The domain layer is where the software expression of the domain model lives.

## Entity

An object fundamentally defined not by its attributes, but by a thread of continuity and identity.

## Factory

A mechanism for encapsulating complex creation logic and abstracting the type of a created object for the sake of a client.

## Function

An operation that computes and returns a result without observable side effects.

## Immutable

The property of never changing observable state after creation. implicit concept A concept that is necessary to understand the meaning of a model or design but is never mentioned.

## Intention-Revealing Interface

A design in which the names of classes, methods, and other elements convey both the original developer’s purpose in creating them and their value to a client developer.

## Invariant

An Assertion about some design element that must be true at all times, except during specifically transient situations such as the middle of the execution of a method, or the middle of an uncommitted database transaction.

## Iteration

A process in which a program is repeatedly improved in small steps. Also, one of those steps.

## Large-Scale Structure

A set of high-level concepts, rules, or both that establishes a pattern of design for an entire system. A language that allows the system to be discussed and understood in broad strokes.

## Layered Architecture

A technique for separating the concerns of a software system, isolating a domain layer, among other things.

## Life Cycle

A sequence of states an object can take on between creation and deletion, typically with constraints to ensure integrity when changing from one state to another. May include migration of an `Entity` between systems and different `Bounded Contexts`.

## Model

A system of abstractions that describes selected aspects of a domain and can be used to solve problems related to that domain.

## Model-Driven Design

A design in which some subset of software elements corresponds closely to elements of a model. Also, a process of codeveloping a model and an implementation that stay aligned with each other.

## Modeling Paradigm

A particular style of carving out concepts in a domain, combined with tools to create software analogs of those concepts (for example, object-oriented programming and logic programming).

## Repository

A mechanism for encapsulating storage, retrieval, and search behavior which emulates a collection of objects.

## Responsibility

An obligation to perform a task or know information (Wirfs-Brock et al. 2003, p. 3).

## Service

An operation offered as an interface that stands alone in the model, with no encapsulated state.

## Side Effect

Any observable change of state resulting from an operation, whether intentional or not, even a deliberate update.

## Side Effect Free Function

See `Function`.

## Standalone Class

A class that can be understood and tested without reference to any others, except system primitives and basic libraries.

## Stateless

The property of a design element that allows a client to use any of its operations without regard to the element’s history. A stateless element may use information that is accessible globally and may even change that global information (that is, it may have side effects) but holds no private state that affects its behavior.

## Strategic Design

Modeling and design decisions that apply to large parts of the system. Such decisions affect the entire project and have to be decided at team level.

## Supple Design

A design that puts the power inherent in a deep model into the hands of a client developer to make clear, flexible expressions that give expected results robustly. Equally important, it leverages that same deep model to make the design itself easy for the implementer to mold and reshape to accommodate new insight.

## Ubiquitous Language

A language structured around the domain model and used by all team members to connect all the activities of the team with the software.

## Unification

The internal consistency of a model such that each term is unambiguous and no rules contradict.

## Test-Driven Development

TDD is a lightweight programming methodology that emphasizes fast, incremental development and especially writing tests before writing code. Ideally these follow one another in cycles measured in minutes. (see full definition under `Test-Driven Development` topic)

## Value Object

An object that describes some characteristic or attribute but carries no concept of identity.

## Whole Value

An object that models a single, complete concept.