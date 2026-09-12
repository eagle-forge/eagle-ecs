import { ComponentStore } from "./ComponentStore.js";
import { QueryView } from "./QueryView.js";

export class ComponentManager {
    #stores;

    constructor() {
        this.#stores = new Map();
    }

    #getOrCreateStore(component) {
        let store = this.#stores.get(component);

        if (!store) {
            store = new ComponentStore(component);
            this.#stores.set(component, store);
        }

        return store;
    }

    add(entity, component, data) {
        const store = this.#getOrCreateStore(component);

        store.add(entity, data);
    }

    get(entity, component) {
        const store = this.#stores.get(component);

        if (!store) {
            return undefined;
        }

        return store.get(entity);
    }

    has(entity, component) {
        const store = this.#stores.get(component);

        if (!store) {
            return false;
        }

        return store.has(entity);
    }

    remove(entity, component) {
        const store = this.#stores.get(component);

        if (!store) {
            throw new Error(
                `Entity ${entity} does not have this component.`
            );
        }

        store.remove(entity);
    }

    removeEntity(entity) {
        for (const store of this.#stores.values()) {
            if (store.has(entity)) {
                store.remove(entity);
            }
        }
    }

    query(...components) {
        return new QueryView(() => {
            if (components.length === 0) {
                return [];
            }

            return components.map(
                component => this.#stores.get(component)
            );
        });
    }
}