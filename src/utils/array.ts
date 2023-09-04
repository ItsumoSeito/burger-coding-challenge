interface ObjectWithId {
    id: any;
}

export function mapIds<T extends ObjectWithId>(el: T) {
    return el.id;
}

export default {
    mapIds,
};
