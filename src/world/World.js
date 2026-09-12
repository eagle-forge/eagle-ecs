import { EntityManager } from "../entity/EntityManager.js";
import { ComponentManager } from "../component/ComponentManager.js";

export class World {
    #entities;
    #components;
    #systems;

    constructor() {
        this.#entities = new EntityManager();
        this.#components = new ComponentManager();
        this.#systems = [];
    }

    #assertAlive(entity) {
        if (!this.#entities.isAlive(entity)) {
            throw new Error(`Entity ${entity} is not alive.`);
        }
    }

    createEntity() {
        return this.#entities.create();
    }

    destroyEntity(entity) {
        this.#components.removeEntity(entity);
        this.#entities.destroy(entity);
    }

    isAlive(entity) {
        return this.#entities.isAlive(entity);
    }

    addComponent(entity, component, data) {
        this.#assertAlive(entity);
        this.#components.add(entity, component, data);
    }

    getComponent(entity, component) {
        this.#assertAlive(entity);
        return this.#components.get(entity, component);
    }

    hasComponent(entity, component) {
        this.#assertAlive(entity);
        return this.#components.has(entity, component);
    }

    removeComponent(entity, component) {
        this.#assertAlive(entity);
        this.#components.remove(entity, component);
    }

    query(...components) {
        return this.#components.query(...components);
    }

    addSystem(system) {
        if (!system || typeof system.update !== "function") {
            throw new Error("System must have an update method.");
        }

        this.#systems.push(system);
    }

    removeSystem(system) {
        const index = this.#systems.indexOf(system);

        if (index === -1) {
            throw new Error("System is not registered.");
        }

        this.#systems.splice(index, 1);
    }

    update(dt) {
        for (const system of this.#systems) {
            system.update(this, dt);
        }
    }
}