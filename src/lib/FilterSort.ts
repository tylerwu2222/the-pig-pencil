// type
// import { Tag } from "@prisma/client";
import { Author, Post, ArtSeries, Art } from "@/types/extendedPrismaTypes";
import { formatDateToLongDate } from "./dateFormatting";

type SortOrder = "asc" | "desc";

function isPost(content: any): content is Post[] {
  return (
    Array.isArray(content) &&
    content.every((item) => "title" in item && "slug" in item)
  );
}

function isAuthor(content: any): content is Author[] {
  return (
    Array.isArray(content) &&
    content.every((item) => "name" in item && "pigThoughts" in item)
  );
}

function isArtSeries(content: any): content is ArtSeries[] {
  return (
    Array.isArray(content) && content.every((item) => "seriesTitle" in item)
  );
}

function isArt(content: any): content is Art[] {
  return (
    Array.isArray(content) &&
    content.every((item) => "title" in item && "description" in item)
  );
}

interface filterContentProps<T> {
  filterKeyword: string | undefined;
  selectedTags: string[];
  content: T[];
}

// filter for posts that include search keyword AND include selected tags
const filterContent = <T>({
  filterKeyword,
  selectedTags,
  content,
}: filterContentProps<T>): T[] => {
  let filteredContent = content;

  if (filterKeyword && filterKeyword.length > 0) {
    const lowerKeyword = filterKeyword.toLowerCase();
    let contentMetaStrings: string[] = [];

    // get posts joined with authors and tags
    if (isPost(content)) {
      contentMetaStrings = content.map((p: Post) =>
        (
          p.authors.join(" ") +
          " " +
          p.title +
          " " +
          p.caption +
          " " +
          formatDateToLongDate(p.publishDate) +
          " " +
          p.tags.join(" ")
        ).toLowerCase(),
      );
    } else if (isAuthor(content)) {
      contentMetaStrings = content.map((a: Author) =>
        (
          a.name +
          " " +
          a.role +
          " " +
          a.pigThoughts +
          " " +
          a.internalLink +
          " " +
          a.email +
          " " +
          a.quote +
          " " +
          a.tags.join(" ")
        ).toLowerCase(),
      );
    } else if (isArtSeries(content)) {
      contentMetaStrings = content.map((a: ArtSeries) =>
        (a.seriesTitle + " " + a.tags.join(" ")).toLowerCase(),
      );
    } else if (isArt(content)) {
      contentMetaStrings = content.map((a: Art) =>
        (a.title + " " + a.description + " " + a.tags.join(" ")).toLowerCase(),
      );
    }

    // console.log("metastrings", contentMetaStrings);

    // check if keyword in any of contents' metastrings
    filteredContent = content.filter((p, i) => {
      return contentMetaStrings[i].includes(lowerKeyword);
    });
  }
  // if tags exist: check if any tag in selected tags list
  // if (!isArtSeries(content) && selectedTags && selectedTags.length > 0) {
  //   const nonArtContent = content as (Post | Author)[];
  //   const postTags = nonArtContent.map((p) => p.tags);
  //   filteredContent = filteredContent.filter((p, i) => {
  //     return postTags[i].some((tag: string) => selectedTags.includes(tag)); // check
  //   });
  //   // }
  // }

  return filteredContent;
};

const postsSortMap: Record<string, string> = {
  date: "publishDate",
  title: "title",
  views: "views",
  oinks: "oinks",
  author: "authors",
};

const collaboratorsSortMap: Record<string, string> = {
  "date joined": "joinDate",
  name: "name",
  role: "role",
  "total posts": "postCount",
  "total views": "viewCount",
  "total oinks": "oinkCount",
};

const artSeriesSortMap: Record<string, string> = {
  date: "publishDate",
  name: "seriesTitle",
  // "total posts": "postCount",
  // "total views": "viewCount",
  // "artist": "oinkCount",
};

const artSortMap: Record<string, string> = {
  date: "publishDate",
  name: "title",
  // views: "views",
  // oinks: "oinks",
};

const visibilityOrder = { visible: 0, wip: 1, hidden: 2 };

const sortByKey = <T>(
  content: T[],
  key: keyof T,
  order: SortOrder = "asc",
  sortVisibility: boolean = true,
): T[] => {
  return [...content].sort((a, b) => {
    // Sort by visibility first if enabled
    if (sortVisibility && isPost(content)) {
      const visibilityCompare =
        visibilityOrder[
          (a as Post)["visibility"] as keyof typeof visibilityOrder
        ] -
        visibilityOrder[
          (b as Post)["visibility"] as keyof typeof visibilityOrder
        ];
      if (visibilityCompare !== 0) {
        // return order === "asc" ? visibilityCompare : -visibilityCompare;
        return visibilityCompare;
      }
    }

    // Sort by the specified key
    const valA = a[key];
    const valB = b[key];

    const compare =
      typeof valA === "string" && typeof valB === "string"
        ? valA.localeCompare(valB)
        : valA > valB
          ? 1
          : -1;

    return order === "asc" ? compare : -compare;
  });
};

interface sortContentProps<T> {
  sortKeyword: string;
  sortDirection: SortOrder;
  content: T[];
}

// sort posts by an attribute
const sortContent = <T>({
  sortKeyword,
  content,
  sortDirection,
}: sortContentProps<T>) => {
  let sortedContent = content;
  let internalSortKeyword = "";
  const sortKeywordStr = sortKeyword as string;
  if (isPost(content)) {
    internalSortKeyword = postsSortMap[sortKeywordStr];
  } else if (isAuthor(content)) {
    internalSortKeyword = collaboratorsSortMap[sortKeywordStr];
  } else if (isArtSeries(content)) {
    internalSortKeyword = artSeriesSortMap[sortKeywordStr];
  } else if (isArt(content)) {
    internalSortKeyword = artSortMap[sortKeywordStr];
  }
  sortedContent = sortByKey(
    sortedContent,
    internalSortKeyword as keyof T,
    sortDirection,
  );
  // console.log('sorted after', sortedPosts);
  return sortedContent;
};

type FilterSortProps<T> = {
  content: T[];
  filterKeyword?: string;
  selectedTags?: string[];
  sortKeyword?: string | null;
  sortDirection?: "asc" | "desc";
};

export const filterSort = <T>({
  content = [],
  filterKeyword,
  selectedTags = [],
  sortKeyword = null,
  sortDirection = "desc",
}: Partial<FilterSortProps<T>>): T[] => {
  let FSContent: T[] = [...content];

  // Filter array
  if (filterKeyword) {
    FSContent = filterContent({
      filterKeyword,
      selectedTags,
      content: FSContent,
    });
  }

  // Sort array
  if (sortKeyword) {
    FSContent = sortContent({
      sortKeyword,
      sortDirection,
      content: FSContent,
    });
  }

  return FSContent;
};
