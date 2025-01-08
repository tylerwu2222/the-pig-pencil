"use client";

import { usePathname } from "next/navigation";

// modules
import SearchInput from "@/app/components/inputs/SearchInput/SearchInput";
import DropdownInputSelect from "@/app/components/inputs/DropdownInput/DropdownInputSelect";
import AscDescToggle from "@/app/components/inputs/ToggleInputs/AscDescToggle";

// thumbnails
import CollaboratorThumbnail from "./CollaboratorThumbnail";

// react
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

// filter sort
import { filterSort } from "@/lib/FilterSort";

// types
import { Author } from "@/types/extendedPrismaTypes";
import CollaboratorInfoModal from "./CollaboratorInfoModal";

interface CollaboratorSectionTemplateProps {
  searchBarIncluded: boolean;
  sortPostsIncluded: boolean;
  //   tagBoxIncluded: boolean;
}

export default function CollaboratorSectionTemplate({
  searchBarIncluded = true,
  sortPostsIncluded = true,
  //   tagBoxIncluded = true,
}: Partial<CollaboratorSectionTemplateProps>) {
  const initialSortKeyword = "name";
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
  const [allCollaborators, setAllCollaborators] = useState<Author[]>([]);
  const [FSCollaborators, setFSCollaborators] = useState<Author[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentModalIndex, setCurrentModalIndex] = useState<number>(0);
  const [modalCollaborator, setModalCollaborator] = useState<Author>();

  const sortKeywords = [
    "date joined",
    "name",
    "role",
    "total posts",
    "total views",
    "total oinks",
  ];

  // initialize content for section
  const getSectionContent = async () => {
    const res = await fetch("/api/authors");
    const content = await res.json();
    // console.log("FE: content", content);
    return content;
  };

  // fetch initial data
  const {
    data: content,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sectionContent"],
    queryFn: () => getSectionContent(),
  });

  // set local states
  useEffect(() => {
    if (content) {
      setAllCollaborators(content);
      setFSCollaborators(content);
      setModalCollaborator(content[0]);
    }
  }, [content]);

  // update displayed content when any search/filter parameter changes
  useEffect(() => {
    const subsetContent = filterSort({
      content: allCollaborators,
      filterKeyword: searchValue,
      sortKeyword: sortKeyword,
      selectedTags: selectedTags,
      sortDirection: sortDirection,
    }) as Author[];
    setFSCollaborators(subsetContent);
    // console.log(Filter)
  }, [searchValue, sortKeyword, sortDirection, selectedTags, allCollaborators]);

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

  const handleModalOpen = (collaborator: Author, index: number) => {
    setModalCollaborator(collaborator);
    setCurrentModalIndex(index);
    setIsModalOpen(true);
  };

  const handleModalNext = () => {
    const nextIndex = Math.min(
      currentModalIndex + 1,
      FSCollaborators.length - 1,
    );
    const nextCollaborator = FSCollaborators[nextIndex];
    setCurrentModalIndex(nextIndex);
    setModalCollaborator(nextCollaborator);
  };
  const handleModalPrev = () => {
    const prevIndex = Math.max(currentModalIndex - 1, 0);
    const prevCollaborator = FSCollaborators[prevIndex];
    setCurrentModalIndex(prevIndex);
    setModalCollaborator(prevCollaborator);
  };

  return (
    <>
      <title>
        {baseTitle +
          " | " +
          pathNameLast.charAt(0).toUpperCase() +
          pathNameLast.slice(1)}
      </title>
      {modalCollaborator && (
        <CollaboratorInfoModal
          collaborators={FSCollaborators}
          collaborator={modalCollaborator}
          isOpen={isModalOpen}
          initialIndex={currentModalIndex}
          handleNextFn={handleModalNext}
          handlePrevFn={handleModalPrev}
          onCloseFn={() => {
            setIsModalOpen(false);
          }}
        />
      )}
      <div className="px-[3%] py-3 xl:px-[20%]">
        {/* search + sort div */}
        <div className="grid auto-cols-min auto-rows-min grid-cols-1 content-center bg-backgroundWhite p-[2vh] md:relative md:grid-cols-7 md:grid-rows-1 md:gap-2">
          {searchBarIncluded ? (
            <div className="col-span-full row-start-1 flex items-end md:col-span-5">
              <SearchInput
                value={searchValue}
                onValueChangeFn={(e) => {
                  handleSearchKeywordChange(e.target.value);
                }}
                placeholder={"search collaborators"}
              />
            </div>
          ) : (
            <></>
          )}
          {sortPostsIncluded ? (
            <div className="col-span-full row-start-3 flex items-end gap-1 md:col-span-2 md:row-start-1">
              {/* sort parameter */}
              <DropdownInputSelect
                className="max-w-1/2"
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
          <div
            className={`md:pt-2} col-span-full row-start-2 px-1 pt-0 md:px-3`}
          >
            <i className="text-gray-500 md:min-h-[1em]">
              {searchValue.length > 0
                ? FSCollaborators.length + " results for '" + searchValue + "'"
                : "\u00A0"}
            </i>
          </div>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <p className="rounded-2xl bg-slate-200 px-3 text-stone-700 shadow-md">
              loading collaborators 🐖...
            </p>
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center">
            <p className="text-stone-400">
              error loading collaborators, please contact tyler 🐷
            </p>
          </div>
        ) : !isLoading ? (
          FSCollaborators.length > 0 ? (
            <div className="grid grid-cols-1 justify-items-center md:grid-cols-3">
              {(FSCollaborators as Author[]).map(
                (author: Author, index: number) => {
                  // generic section page
                  return (
                    <CollaboratorThumbnail
                      key={author.name}
                      collaborator={author}
                      sortBadge={sortKeyword}
                      onClickFn={() => {
                        handleModalOpen(author, index);
                      }}
                    />
                  );
                },
              )}
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
        )}
        {/* tag box div */}
        {/* {tagBoxIncluded ? <div className='tags-div'>
                        <TagsBox posts={postData} onChangeFn={setSelectedTags} />
                    </div> : <></>} */}
      </div>
    </>
  );
}
