# EagleECS

A lightweight Entity-Component-System (ECS) library for JavaScript.

EagleECS is designed to provide a small, straightforward ECS foundation for games, simulations, and other data-oriented applications.

## Features

* Lightweight JavaScript ECS
* Integer entity IDs
* Entity IDs are never reused
* Data-oriented component storage
* AND-based component queries
* Reusable query views
* Queries resolve their contents at iteration time
* System-based world updates
* Systems execute in registration order
* Systems can modify the world during updates
* Zero runtime dependencies

## Installation

```bash
npm install eagle-ecs
```

## Quick Start

```js
import { World, defineComponent } from "eagle-ecs";

const world = new World();

const Position = defineComponent();
const Velocity = defineComponent();

const entity = world.createEntity();

world.addComponent(entity, Position, {
    x: 0,
    y: 0
});

world.addComponent(entity, Velocity, {
    x: 10,
    y: 5
});

world.addSystem({
    update(world, dt) {
        for (const entity of world.query(Position, Velocity)) {
            const position = world.getComponent(entity, Position);
            const velocity = world.getComponent(entity, Velocity);

            position.x += velocity.x * dt;
            position.y += velocity.y * dt;
        }
    }
});

world.update(1 / 60);
```

## Core API

### `World`

Creates an ECS world containing entities, components, queries, and systems.

```js
const world = new World();
```

### Entities

Create an entity:

```js
const entity = world.createEntity();
```

Entities use increasing integer IDs.

```text
1, 2, 3, 4, ...
```

Destroyed IDs are never reused.

```js
world.destroyEntity(entity);

world.isAlive(entity);
// false
```

### Components

Define a component type:

```js
const Position = defineComponent();
```

Add component data:

```js
world.addComponent(entity, Position, {
    x: 10,
    y: 20
});
```

Retrieve component data:

```js
const position = world.getComponent(entity, Position);
```

Check for a component:

```js
world.hasComponent(entity, Position);
```

Remove a component:

```js
world.removeComponent(entity, Position);
```

When an entity is destroyed, all of its components are removed automatically.

## Queries

Query entities by component type:

```js
for (const entity of world.query(Position)) {
    // ...
}
```

Multiple components use AND semantics:

```js
for (const entity of world.query(Position, Velocity)) {
    // Entity has both Position and Velocity
}
```

Queries return entity IDs, not component data.

A query can be reused:

```js
const movingEntities = world.query(Position, Velocity);

for (const entity of movingEntities) {
    // ...
}

for (const entity of movingEntities) {
    // Query is evaluated again
}
```

Query contents are resolved when iteration begins, allowing changes made before iteration to be reflected.

## Systems

A system is an object with an `update()` method:

```js
const movementSystem = {
    update(world, dt) {
        for (const entity of world.query(Position, Velocity)) {
            const position = world.getComponent(entity, Position);
            const velocity = world.getComponent(entity, Velocity);

            position.x += velocity.x * dt;
            position.y += velocity.y * dt;
        }
    }
};
```

Register it:

```js
world.addSystem(movementSystem);
```

Systems execute in registration order:

```js
world.addSystem(inputSystem);
world.addSystem(movementSystem);
world.addSystem(renderSystem);

world.update(dt);
```

The system receives:

```text
update(world, dt)
       │     │
       │     └── delta time in seconds
       └──────── current ECS world
```

Systems may create and destroy entities and add, remove, query, or modify components during an update.

Remove a system:

```js
world.removeSystem(movementSystem);
```

## Design Philosophy

EagleECS intentionally starts small.

The core model is:

```text
World
 ├── Entities
 ├── Components
 ├── Queries
 └── Systems
```

Entities identify objects.

Components contain data.

Queries find entities with specific component combinations.

Systems operate on that data.

The goal is to keep these responsibilities separate and the runtime small enough to be useful in lightweight JavaScript projects.

## Current Scope

EagleECS `0.1.0` focuses on the fundamental ECS model.

It does **not** currently attempt to provide:

* Archetype storage
* Deferred structural commands
* Multithreaded execution
* Worker-based systems
* Serialization
* Scheduling graphs
* Rendering
* Physics
* Asset management
* A game loop
* An engine framework

These can be considered independently as the library evolves.

## Development

Clone the repository and install dependencies:

```bash
npm install
```

Run the test suite:

```bash
npm test
```

The project uses Node.js's built-in test runner.

## License

MIT
