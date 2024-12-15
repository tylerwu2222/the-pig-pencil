// type
import { Tag } from "@prisma/client";
import { Author, Post } from "@/types/extendedPrismaTypes";
import { formatDateToLongDate } from "./dateFormatting";

type SortOrder = "asc" | "desc";
type Content = Post | Author;

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

interface filterContentProps {
  filterKeyword: string | undefined;
  selectedTags: string[];
  content: Content[];
}

// filter for posts that include search keyword AND include selected tags
const filterContent = ({
  filterKeyword,
  selectedTags,
  content,
}: filterContentProps): (Post | Author)[] => {
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
    }

    console.log("metastrings", contentMetaStrings);

    // check if keyword in any of contents' metastrings
    filteredContent = content.filter((p, i) => {
      return contentMetaStrings[i].includes(lowerKeyword);
    });
  }
  // if tags exist: check if any tag in selected tags list
  if (selectedTags && selectedTags.length > 0) {
    const postTags = content.map((p) => p.tags);
    filteredContent = filteredContent.filter((p, i) => {
      return postTags[i].some((tag) => selectedTags.includes(tag)); // check
    });
    // }
  }

  return filteredContent;
};

const sortMap: Record<string, string> = {
  date: "publishDate",
  title: "title",
  views: "views",
  oinks: "oinks",
  author: "authors",
};

const sortByKey = (
  // const sortByKey = <T, K extends keyof typeof sortMap>(
  content: Content[],
  key: keyof Content,
  order: SortOrder = "asc",
): Content[] => {
  return [...content].sort((a, b) => {
    const valA = a[key];
    const valB = b[key];

    if (valA === valB) return 0; // 0 = keep order

    const compare =
      typeof valA === "string" && typeof valB === "string"
        ? valA.localeCompare(valB) // sorts based on local language
        : valA > valB
          ? 1
          : -1; // 1 = swap order

    console.log("vals", valA, valB, "result", compare);

    return order === "asc" ? compare : -compare;
  });
};

interface sortContentProps {
  sortKeyword: string;
  sortDirection: SortOrder;
  content: Content[];
}

// sort posts by an attribute
const sortContent = ({
  sortKeyword,
  content,
  sortDirection,
}: sortContentProps) => {
  let sortedContent = content;
  // let internalSortOption = '';

  console.log(
    "before sorting",
    sortedContent.map((c) => c[sortMap[sortKeyword] as keyof Content]),
  );
  console.log("sorting by", sortKeyword);
  if (isPost(content)) {
    console.log("sorting posts");
    sortedContent = sortedContent as Post[];
    sortedContent = sortByKey(
      sortedContent,
      sortMap[sortKeyword] as keyof Content,
      sortDirection,
    );
  } else if (isAuthor(content)) {
    sortedContent = sortedContent as Author[];
  }

  console.log(
    "after sorting",
    sortedContent.map((c) => c[sortMap[sortKeyword] as keyof Content]),
  );
  // console.log('sorted after', sortedPosts);
  return sortedContent;
};

interface filterSortProps {
  content: Content[];
  filterKeyword: string | undefined;
  selectedTags: string[];
  sortKeyword: string | null;
  sortDirection: "asc" | "desc";
}

// a general function that:
// (1) filters array of objects by filter parameter
// (2) sorts AoO by a object key
export const filterSort = ({
  content = [],
  filterKeyword,
  selectedTags = [],
  sortKeyword = null,
  sortDirection = "desc",
}: Partial<filterSortProps>) => {
  let FSContent: (Post | Author)[] = [...content];

  // filter array
  if (filterKeyword) {
    FSContent = filterContent({ filterKeyword, selectedTags, content });
  }

  // sort array
  if (sortKeyword) {
    FSContent = sortContent({ sortKeyword, sortDirection, content: FSContent });
  }
//   console.log("FS", FSContent);

  return FSContent;
};
