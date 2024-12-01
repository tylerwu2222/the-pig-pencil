// Function to extract values from an array of single-key objects
function extractValues<T>(objects: Array<Record<string, any>>): T[] {
    return objects.map(obj => {
        const value = Object.values(obj)[0]; // Get the first value
        // If the value is an object, extract its first value
        return value && typeof value === "object" ? Object.values(value)[0] : value;
    });
}

// Wrapper function to flatten join data
export function flattenJoinData<T extends Record<string, any>>(
    data: T[],
    joinTableFields: Record<string, string>
): Record<string, any>[] {
    return data.map(item => {
        const flattenedItem: Record<string, any> = { ...item }; // Clone the object

        for (const [joinTableKey, targetKey] of Object.entries(joinTableFields)) {
            if (Array.isArray(flattenedItem[joinTableKey])) {
                // Extract values from the array of single-key objects
                flattenedItem[targetKey] = extractValues(flattenedItem[joinTableKey]);
                // Remove the original join table key
                delete flattenedItem[joinTableKey];
            }
        }

        return flattenedItem;
    });
}

// type JoinTableFieldConfig = Record<string, { targetField: string; extractKeys: string[] }>;

// // Ensure T is a mutable object type
// export function flattenJoinData<T extends Record<string, any>>(
//     data: T[],
//     joinTableFields: JoinTableFieldConfig
// ): Record<string, any>[] {
//     return data.map(item => {
//         const flattenedItem: Record<string, any> = { ...item }; // Explicitly declare as mutable object

//         for (const [joinTableKey, config] of Object.entries(joinTableFields)) {
//             const { targetField, extractKeys } = config;

//             if (Array.isArray(flattenedItem[joinTableKey])) {
//                 extractKeys.forEach(key => {
//                     // Create an array for each specified key
//                     const arrayKey = joinTableKey.replace(/On\w+$/, '').toLowerCase() + `_${key}`;
//                     flattenedItem[arrayKey] = flattenedItem[joinTableKey]
//                         .map((joinEntry: any) => joinEntry[targetField]?.[key])
//                         .filter(Boolean); // Remove null or undefined values
//                 });

//                 delete flattenedItem[joinTableKey]; // Remove the original join table field
//             }
//         }

//         return flattenedItem;
//     });
// }