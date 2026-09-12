let nextComponentId = 1;

export function defineComponent() {
    const definition = {
        id: nextComponentId++
    };

    return Object.freeze(definition);
}