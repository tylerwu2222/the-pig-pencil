interface getSlugTitle {
    date?: string | Date;
    title: string;
}
export const getSlugTitle = ({ date, title }: getSlugTitle): string => {
    let formattedDate = '';
    if (date) {
        formattedDate =
            typeof date === "string"
                ? new Date(date).toISOString().split("T")[0]
                : date.toISOString().split("T")[0];
        formattedDate = formattedDate + '-';
    }


    // Convert title to lowercase, replace spaces with hyphens, and remove special characters
    const slugifiedTitle = title
        .toLowerCase()
        .trim()
        .replace(/[\s]+/g, "-") // Replace spaces with hyphens
        .replace(/[^\w-]+/g, ""); // Remove all non-alphanumeric and non-hyphen characters

    // Return the combined filename
    return `${formattedDate}${slugifiedTitle}`;
}