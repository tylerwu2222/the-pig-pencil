export const formatDateToShortDate = (date: Date): string => {
    const dateF = new Date(date);
    // console.log('date input', date)

    // Get the month abbreviation using toLocaleString
    const monthAbbreviation = dateF.toLocaleString('default', { month: 'short' });

    // Get the day and year
    const day = dateF.getDate();
    const year = dateF.getFullYear();


    // console.log('m,d,y', monthAbbreviation, day, year)

    // Return the formatted date
    return `${monthAbbreviation} ${day}, ${year}`;
}

export const formatDateToLongDate = (date: Date): string => {
    const dateF = new Date(date);
    // console.log('date input', date)

    // Get the month abbreviation using toLocaleString
    const monthAbbreviation = dateF.toLocaleString('default', { month: 'long' });

    // Get the day and year
    const day = dateF.getDate();
    const year = dateF.getFullYear();


    // console.log('m,d,y', monthAbbreviation, day, year)

    // Return the formatted date
    return `${monthAbbreviation} ${day}, ${year}`;
}

// Example usage:
// const date = new Date('2024-11-27T19:51:59.226Z');
// const formattedDate = formatDateToShortDate(date);
// console.log(formattedDate); // Output: "Nov 27, 2024"
