export class QueryView {
    #resolveStores;

    constructor(resolveStores) {
        this.#resolveStores = resolveStores;
    }

    *[Symbol.iterator]() {
        const stores = this.#resolveStores();

        if (stores.length === 0) {
            return;
        }

        if (stores.some(store => !store)) {
            return;
        }

        let smallestStore = stores[0];

        for (const store of stores) {
            if (store.size() < smallestStore.size()) {
                smallestStore = store;
            }
        }

        for (const entity of smallestStore.entities()) {
            let matches = true;

            for (const store of stores) {
                if (!store.has(entity)) {
                    matches = false;
                    break;
                }
            }

            if (matches) {
                yield entity;
            }
        }
    }
}