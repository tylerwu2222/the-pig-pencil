"use client";

// import Head from 'next/head';
import { usePathname } from "next/navigation";

// modules
import SearchInput from "@/app/components/inputs/SearchInput/SearchInput";
import DropdownInputSelect from "@/app/components/inputs/DropdownInput/DropdownInputSelect";
import AscDescToggle from "@/app/components/inputs/ToggleInputs/AscDescToggle";
// import { DropdownInputRadio } from "@/app/components/inputs/DropdownInput/DropdownInputRadio";
// import TagsBox from '../../Modules/FormInput/TagsBox/TagsBox.js';

// thumbnails
import PostThumbnail from "./PostThumbnail";
import PostThumbnailWIP from "./PostThumbnailWIP";
import CollaboratorThumbnail from "./CollaboratorThumbnail";

// react
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

// filter sort
import { filterSort } from "@/lib/FilterSort";

// types
import { Post, Author } from "@/types/extendedPrismaTypes";

const searchKeywordMap: Record<string, string> = {
  data: "data stories",
  writing: "writing",
  cheatsheet: "cheatsheets",
  tutorial: "tutorials",
  project: "projects",
  collaborators: "collaborators",
};

interface SectionTemplateProps {
  section: string;
  contentType: string;
  searchBarIncluded: boolean;
  sortPostsIncluded: boolean;
  tagBoxIncluded: boolean;
  // postTemplateType = 1
}

export default function SectionTemplate({
  section = "",
  contentType = "",
  searchBarIncluded = true,
  sortPostsIncluded = true,
  tagBoxIncluded = true,
  // postTemplateType = 1
}: Partial<SectionTemplateProps>) {
  let initialSortKeyword;
  if (section == "collaborators" || section == "art") {
    initialSortKeyword = "name";
  } else {
    initialSortKeyword = "date";
  }
  // update tab title
  const pathname = usePathname();
  const pathnameSegments = pathname.split("/");
  const pathNameLast = pathnameSegments[pathnameSegments.length - 1];
  const baseTitle = "The Pig Pencil";

  // search, filter, sort
  const [searchValue, setSearchValue] = useState<string>("");
  //   const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortKeyword, setSortKeyword] = useState(initialSortKeyword);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc"); // desc dates = newest first
  // posts
  const [allContent, setAllContent] = useState<(Post | Author)[]>([]);
  const [FSContent, setFSContent] = useState<(Post | Author)[]>([]);
  // different sort keywords based on section
  let sortKeywords = ["date", "title", "views", "oinks", "author"];
  if (section == "collaborators") {
    sortKeywords = [
      "date joined",
      "name",
      "role",
      "total posts",
      "total views",
      "total oinks",
    ];
  } else if (section == "art") {
    sortKeywords = ["date", "name", "views", "oinks", "artist"];
  }

  // initialize content for section
  const getSectionPosts = async () => {
    let res;
    if (section == "collaborators") {
      res = await fetch("/api/authors");
    }
    // else if (section == 'art'){

    // }
    else {
      res = await fetch(`/api/${section}/posts`);
    }
    const posts = await res.json();
    console.log("FE: posts", posts);
    return posts;
  };

  // fetch initial data
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sectionContent", section],
    queryFn: () => getSectionPosts(),
    enabled: !!section,
  });

  // Set your local state when necessary
  useEffect(() => {
    if (posts) {
      setAllContent(posts);
      setFSContent(posts);
    }
  }, [posts]);

  // update displayed posts when any search/filter parameter changes
  useEffect(() => {
    const subsetContent = filterSort({
      content: allContent,
      filterKeyword: searchValue,
      sortKeyword: sortKeyword,
      selectedTags: selectedTags,
      sortDirection: sortDirection,
    });
    setFSContent(subsetContent);
    // console.log(Filter)
  }, [searchValue, sortKeyword, sortDirection, selectedTags, allContent]);

  //  update filter/sort parameters
  const handleSearchKeywordChange = (newSearchValue: string) => {
    setSearchValue(newSearchValue);
  };

  const handleSortKeywordChange = (newSortKeyword: string) => {
    setSortKeyword(newSortKeyword);
  };

  const handleSortDirectionChange = () => {
    if (sortDirection == "asc") {
      setSortDirection("desc");
    } else {
      setSortDirection("asc");
    }
  };

  let contentSection;
  if (section == "collaborators") {
    contentSection = !isLoading ? (
      FSContent.length > 0 ? (
        <div className="grid grid-cols-3 justify-items-center">
          {(FSContent as Author[]).map((author: Author) => {
            // generic section page
            return (
              <CollaboratorThumbnail key={author.name} collaborator={author} />
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <p className="text-stone-400">
            No collaborators matched these filters 😔
          </p>
        </div>
      )
    ) : (
      <></>
    );
  }
  // else if (section == 'art') {
  //     contentSection = <div className='grid grid-cols-3 justify-items-center'>
  //         {loaded ? (FSContent.length > 0 ?
  //             FSContent.map((post: Post) => {
  //                 // generic section page
  //                 return <ArtThumbnail />
  //             })
  //             : <p style={{ display: FSContent.length === 0 ? 'block' : 'none' }}>No art series matched these filters 😔</p>
  //         ) :
  //             <></>
  //         }
  //     </div>
  // }
  else {
    contentSection = !isLoading ? (
      FSContent.length > 0 ? (
        <div className="grid grid-cols-3 justify-items-center">
          {(FSContent as Post[]).map((post: Post) => {
            if (post.visibility === "wip") {
              return <PostThumbnailWIP key={post.slug} post={post} />;
            } else if (post.visibility === "visible") {
              return <PostThumbnail key={post.slug} post={post} sortBadge={sortKeyword}/>;
            }
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <p className="text-stone-400">
            No {searchKeywordMap[section]} matched these filters 😔
          </p>
        </div>
      )
    ) : (
      <></>
    );
  }

  return (
    <>
      <title>
        {baseTitle +
          " | " +
          pathNameLast.charAt(0).toUpperCase() +
          pathNameLast.slice(1)}
      </title>
      <div className="px-[3%] py-3 xl:px-[20%]">
        {/* search + sort div */}
        <div className="grid auto-rows-min grid-cols-7 content-center gap-2 p-[2vh]">
          {/* <div className="flex gap-2 p-[2vh] items-center"> */}
          {searchBarIncluded ? (
            <div className="col-span-5 flex items-end">
              <SearchInput
                value={searchValue}
                onValueChangeFn={(e) => {
                  handleSearchKeywordChange(e.target.value);
                }}
                placeholder={"search " + searchKeywordMap[section]}
              />
            </div>
          ) : (
            <></>
          )}
          {sortPostsIncluded ? (
            <div className="col-span-2 flex items-end gap-1">
              {/* sort parameter */}
              <DropdownInputSelect
                label="sort"
                value={sortKeyword}
                onChangeFn={handleSortKeywordChange}
                options={sortKeywords}
              />
              {/* sort direction toggle */}
              <AscDescToggle
                value={sortDirection}
                onClickFn={handleSortDirectionChange}
              />
            </div>
          ) : (
            <></>
          )}
          <div className="col-span-7 row-start-2 px-3 pt-2">
            <i className="min-h-[1em] text-gray-500">
              {searchValue.length > 0
                ? FSContent.length + " results for '" + searchValue + "'"
                : "\u00A0"}
            </i>
          </div>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <p className="text-stone-700 bg-slate-200 px-3 rounded-2xl shadow-md">
              loading {searchKeywordMap[section]} 🐖...
            </p>
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center">
            <p className="text-stone-400">
              error loading posts, please contact tyler 🐷
            </p>
          </div>
        ) : (
          contentSection
        )}
        {/* tag box div */}
        {/* {tagBoxIncluded ? <div className='tags-div'>
                        <TagsBox posts={postData} onChangeFn={setSelectedTags} />
                    </div> : <></>} */}
      </div>
    </>
  );
}
