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
    data: T | T[], // data can be a single object (T) or an array of objects (T[])
    joinTableFields: Record<string, string>
): Record<string, any> | Record<string, any>[] { // Return type is either a single object (T) or an array of objects
    // Ensure data is always treated as an array for mapping
    const dataArray = Array.isArray(data) ? data : [data];

    const result = dataArray.map(item => {
        const flattenedItem: Record<string, any> = { ...item }; // Clone the object

        for (const [joinTableKey, targetKey] of Object.entries(joinTableFields)) {
            const joinField = flattenedItem[joinTableKey];

            if (Array.isArray(joinField)) {
                // Extract values from the array of single-key objects
                flattenedItem[targetKey] = extractValues(joinField);
                delete flattenedItem[joinTableKey];
            } else if (joinField && typeof joinField === "object") {
                // Handle single object case
                flattenedItem[targetKey] = extractValues([joinField])[0];
                delete flattenedItem[joinTableKey];
            }
        }

        return flattenedItem;
    });

    // If the original data was not an array, return the result as a single object
    return Array.isArray(data) ? result : result[0];
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