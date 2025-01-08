"use client";

// import Head from 'next/head';
import { usePathname } from "next/navigation";

// modules
import SearchInput from "@/app/components/inputs/SearchInput/SearchInput";
import DropdownInputSelect from "@/app/components/inputs/DropdownInput/DropdownInputSelect";
import AscDescToggle from "@/app/components/inputs/ToggleInputs/AscDescToggle";

// thumbnails
import ArtThumbnail from "./ArtThumbnail";

// react
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

// filter sort
import { filterSort } from "@/lib/FilterSort";

// types
import { ArtSeries } from "@/types/extendedPrismaTypes";

interface ArtSectionTemplateProps {
  searchBarIncluded: boolean;
  sortPostsIncluded: boolean;
  tagBoxIncluded: boolean;
  // postTemplateType = 1
}

// template for all section pages except art and collaborators
export default function ArtSectionTemplate({
  searchBarIncluded = true,
  sortPostsIncluded = true,
  tagBoxIncluded = true,
  // postTemplateType = 1
}: Partial<ArtSectionTemplateProps>) {
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
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc"); // asc names
  // posts
  const [allSeries, setAllSeries] = useState<ArtSeries[]>([]);
  const [FSSeries, setFSSeries] = useState<ArtSeries[]>([]);
  const sortKeywords = [
    "date",
    "name",
    // "total views",
    // "total oinks",
    // "artist"
  ];

  // initialize series for section
  const getArtSeries = async () => {
    const res = await fetch(`/api/artSeries`);
    const series = await res.json();
    // console.log("FE: series", series);
    return series;
  };

  // fetch initial data
  const {
    data: series,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sectionSeries"],
    queryFn: () => getArtSeries(),
  });

  // Set your local state when necessary
  useEffect(() => {
    if (series) {
      setAllSeries(series);
      setFSSeries(series);
    }
  }, [series]);

  // update displayed series when any search/filter parameter changes
  useEffect(() => {
    const subsetSeries = filterSort({
      content: allSeries,
      filterKeyword: searchValue,
      sortKeyword: sortKeyword,
      selectedTags: selectedTags,
      sortDirection: sortDirection,
    }) as ArtSeries[];
    setFSSeries(subsetSeries);
    // console.log(Filter)
  }, [searchValue, sortKeyword, sortDirection, selectedTags, allSeries]);

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

  const getSeriesThumbnail = async (seriesID: string) => {
    console.log("series ID in fn", seriesID);
    // const res = await fetch(`/api/art/${seriesID}`);
    const res = await fetch(`/api/art/${seriesID}/first`);
    const firstArt = await res.json();
    return firstArt.publicUrl;
  };

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
        <div className="series-center grid auto-cols-min auto-rows-min grid-cols-1 bg-backgroundWhite p-[2vh] md:relative md:grid-cols-7 md:grid-rows-1 md:gap-2">
          {/* <div className="sticky top-0 pt-[5vh] md:pt-[2vh] z-50 grid auto-cols-min auto-rows-min grid-cols-1 series-center bg-backgroundWhite p-[2vh] md:relative md:grid-cols-7 md:grid-rows-1 md:gap-2"> */}
          {/* <div className="flex gap-2 p-[2vh] items-center"> */}
          {searchBarIncluded ? (
            <div className="col-span-full row-start-1 flex items-end md:col-span-5">
              <SearchInput
                value={searchValue}
                onValueChangeFn={(e) => {
                  handleSearchKeywordChange(e.target.value);
                }}
                placeholder={"search art series"}
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
                ? FSSeries.length === 1
                  ? "1 result for '" + searchValue + "'"
                  : FSSeries.length + " results for '" + searchValue + "'"
                : "\u00A0"}
            </i>
          </div>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center">
            <p className="rounded-2xl bg-slate-200 px-3 text-stone-700 shadow-md">
              loading art 🐖...
            </p>
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center">
            <p className="text-stone-400">
              error loading art, please contact tyler 🐷
            </p>
          </div>
        ) : !isLoading ? (
          FSSeries.length > 0 ? (
            <div className="grid grid-cols-1 justify-items-center md:grid-cols-3">
              {(FSSeries as ArtSeries[]).map(
                (series: ArtSeries, index: number) => {
                  return (
                    <ArtThumbnail
                      key={index}
                      series={series}
                      sortBadge={sortKeyword}
                    />
                  );
                },
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <p className="text-stone-400">No art matched these filters 😔</p>
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
