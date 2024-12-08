import Papa from 'papaparse';

interface loadPublicCSVProps {
    fileName: string,
    extension?: string; // Default to 'csv'
    header?: boolean; // Default to true
    skipEmptyLines?: boolean; // Default to true
}

export async function loadPublicCSV<T = Record<string, any>>({
    fileName,
    extension = 'csv',
    header = true,
    skipEmptyLines = true
}:loadPublicCSVProps
): Promise<T[]> {

    const filePath = `/data/${fileName}.${extension}`;

    try {
        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${filePath}`);
        }

        const csv = await response.text();

        const parsed = Papa.parse<T>(csv, {
            header,
            skipEmptyLines,
        });

        if (parsed.errors.length > 0) {
            console.error('Errors occurred while parsing CSV:', parsed.errors);
        }

        return parsed.data;
    } catch (error) {
        console.error('Error fetching or parsing CSV:', error);
        throw error;
    }
}
