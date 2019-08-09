export function enumConversion(_enum, filter) {
    const keys = Object.keys(_enum).filter((key) => {
        if (!filter) {
            return false;
        }
        return filter(key);
    });
    return keys.map((key) => ({ value: key, name: _enum[key] }));
}