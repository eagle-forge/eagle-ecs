export class ComponentStore {
    #component;
    #data;

    constructor(component) {
        this.#component = component;
        this.#data = new Map();
    }

    add(entity, data) {
        if (this.#data.has(entity)) {
            throw new Error(
                `Entity ${entity} already has this component.`
            );
        }

        this.#data.set(entity, data);
    }

    get(entity) {
        return this.#data.get(entity);
    }

    has(entity) {
        return this.#data.has(entity);
    }

    remove(entity) {
        if (!this.#data.has(entity)) {
            throw new Error(
                `Entity ${entity} does not have this component.`
            );
        }

        this.#data.delete(entity);
    }

    size() {
        return this.#data.size;
    }

    entities() {
        return this.#data.keys();
    }
}