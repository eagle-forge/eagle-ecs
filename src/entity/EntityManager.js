const INVALID_ENTITY = 0;

export class EntityManager {
    #nextId = 1;
    #alive = new Set();

    create() {
        const entity = this.#nextId++;

        this.#alive.add(entity);

        return entity;
    }

    destroy(entity) {
        if(!this.#alive.has(entity)) {
            throw new Error(`Entity ${entity} is not alive.`);
        }

        this.#alive.delete(entity);
    }

    isAlive(entity) {
        return this.#alive.has(entity);
    }
}