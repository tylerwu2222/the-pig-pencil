import { formateDateToShortISODate } from "./dateFormatting";

// string manipulation helper functions

interface getSlugTitle {
  date?: string | Date;
  title: string;
}
export const getSlugTitle = ({ date, title }: getSlugTitle): string => {
  let formattedDate = "";
  if (date) {
    formattedDate =
      typeof date === "string"
        ? formateDateToShortISODate(date)
        : date.toISOString().split("T")[0];
    formattedDate = formattedDate + "-";
  }

  // Convert title to lowercase, replace spaces with hyphens, and remove special characters
  const slugifiedTitle = title
    .toLowerCase()
    .trim()
    .replace(/[\s]+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w-]+/g, ""); // Remove all non-alphanumeric and non-hyphen characters

  // Return the combined filename
  return `${formattedDate}${slugifiedTitle}`;
};

export const getSnakeCase = (nonSnakeString: string): string => {
  return nonSnakeString.replace(/\s+/g, "_").toLowerCase();
};

export const getDashedString = (underscoreString: string) => {
  return underscoreString.replace(/[\s_]+/g, "-").toLowerCase();
};

export const snakeToCamel = (snakeCaseString: string, delimiter = "") => {
  return snakeCaseString
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(delimiter)
    .replace("-", "");
};

export const sanitizeFileName = (input: string) => {
  // List of forbidden characters in file names
  const forbiddenCharacters = /[\/\?<>\\:\*\|"]/g;

  // Replace forbidden characters with an underscore or other safe character
  return input.replace(forbiddenCharacters, "");
};

export const quoteCommaSepString = (input: string) => {
  return input
    .split(",")
    .map((word) => `"${word}"`)
    .join(", ");
};
