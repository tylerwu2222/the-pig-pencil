
type JoinTableFieldConfig = {
    [key: string]: string; // Key: Join table field, Value: Target field to extract (e.g., 'author' or 'tag')
};

// Ensure T is a mutable object type
export function flattenJoinData<T extends Record<string, any>>(
    data: T[],
    joinTableFields: JoinTableFieldConfig
): Record<string, any>[] {
    return data.map(item => {
        const flattenedItem: Record<string, any> = { ...item }; // Explicitly declare it as a mutable object

        for (const [joinTableKey, targetField] of Object.entries(joinTableFields)) {
            if (Array.isArray(flattenedItem[joinTableKey])) {
                flattenedItem[joinTableKey.replace(/On\w+$/, '').toLowerCase()] = 
                    flattenedItem[joinTableKey].map((joinEntry: any) => joinEntry[targetField]?.name);
                delete flattenedItem[joinTableKey];
            }
        }

        return flattenedItem;
    });
}

