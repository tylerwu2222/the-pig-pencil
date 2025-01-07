"use client";

import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

// types
// import { Art } from "@prisma/client";
import { Art } from "@/types/extendedPrismaTypes";

// components
import ArtModal from "../ArtModal";
import ArtGalleryThumbnail from "./ArtGalleryThumbnail";
import SearchInput from "@/app/components/inputs/SearchInput/SearchInput";
import DropdownInputSelect from "@/app/components/inputs/DropdownInput/DropdownInputSelect";
import AscDescToggle from "@/app/components/inputs/ToggleInputs/AscDescToggle";

// helpers
import { filterSort } from "@/lib/FilterSort";
import { snakeToCamel } from "@/lib/stringFormatting";

export default function Page() {
  // export default function Page({ params }: { params: { gallery: string } }) {
  const { gallery } = useParams<{ gallery: string }>();

  // search, filter, sort
  const initialSortKeyword = "name";
  const [searchValue, setSearchValue] = useState<string>("");
  //   const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortKeyword, setSortKeyword] = useState(initialSortKeyword);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc"); // names (A-Z)
  const [allArts, setAllArts] = useState<Art[]>([]);
  const [FSArts, setFSArts] = useState<Art[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentModalIndex, setCurrentModalIndex] = useState<number>(0);
  const [modalArt, setModalArt] = useState<Art | undefined>();
  const sortKeywords = ["date", "name"];
  // "views", "oinks", "artist"];

  // console.log("gallery", gallery);

  // fetch initial image URLS from supabase bucket
  const getSeriesImages = async () => {
    const res = await fetch(`/api/art/seriesName/${gallery}`);
    const imageData = await res.json();
    return imageData;
  };
  const {
    data: images,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["seriesImages"],
    queryFn: () => getSeriesImages(),
  });

  // set local states
  useEffect(() => {
    if (images) {
      setAllArts(images);
      setFSArts(images);
      setModalArt(images[0]);
    }
  }, [images]);

  // update displayed images when any search/filter parameter changes
  useEffect(() => {
    const subsetSeries = filterSort({
      content: allArts,
      filterKeyword: searchValue,
      sortKeyword: sortKeyword,
      selectedTags: selectedTags,
      sortDirection: sortDirection,
    }) as Art[];
    setFSArts(subsetSeries);
    // console.log('filtered art',subsetSeries)
  }, [searchValue, sortKeyword, sortDirection, selectedTags, allArts]);

  // search/sort handlers
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

  // modal handlers
  const handleModalOpen = (art: Art, index: number) => {
    setModalArt(art);
    setCurrentModalIndex(index);
    setIsModalOpen(true);
  };

  const handleModalNext = () => {
    const nextIndex = Math.min(currentModalIndex + 1, FSArts.length - 1);
    const nextArt = FSArts[nextIndex];
    setCurrentModalIndex(nextIndex);
    setModalArt(nextArt);
  };
  const handleModalPrev = () => {
    const prevIndex = Math.max(currentModalIndex - 1, 0);
    const prevArt = FSArts[prevIndex];
    setCurrentModalIndex(prevIndex);
    setModalArt(prevArt);
  };

  return (
    <>
      {/* modal */}
      <ArtModal
        arts={images}
        art={modalArt}
        isOpen={isModalOpen}
        initialIndex={currentModalIndex}
        handleNextFn={handleModalNext}
        handlePrevFn={handleModalPrev}
        onCloseFn={() => {
          setIsModalOpen(false);
        }}
      />
      {/* search/sort */}
      <div className="series-center grid auto-cols-min auto-rows-min grid-cols-1 bg-backgroundWhite px-[20%] py-[2vh] md:relative md:grid-cols-7 md:grid-rows-1 md:gap-2">
        {/* <div className="sticky top-0 pt-[5vh] md:pt-[2vh] z-50 grid auto-cols-min auto-rows-min grid-cols-1 series-center bg-backgroundWhite p-[2vh] md:relative md:grid-cols-7 md:grid-rows-1 md:gap-2"> */}
        {/* <div className="flex gap-2 p-[2vh] items-center"> */}
        <div className="col-span-full row-start-1 flex items-end md:col-span-5">
          <SearchInput
            value={searchValue}
            onValueChangeFn={(e) => {
              handleSearchKeywordChange(e.target.value);
            }}
            placeholder={"search " + snakeToCamel(gallery, " ", false)}
          />
        </div>

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
        <div className={`md:pt-2} col-span-full row-start-2 px-1 pt-0 md:px-3`}>
          <i className="text-gray-500 md:min-h-[1em]">
            {searchValue.length > 0
              ? FSArts.length + " results for '" + searchValue + "'"
              : "\u00A0"}
          </i>
        </div>
      </div>
      {/* content */}
      {isLoading ? (
        <div className="flex items-center justify-center">
          <p className="rounded-2xl bg-slate-200 px-3 text-stone-700 shadow-md">
            loading {gallery} gallery 🐖...
          </p>
        </div>
      ) : isError ? (
        <div className="flex items-center justify-center">
          <p className="text-stone-400">
            error loading content, please contact tyler 🐷
          </p>
        </div>
      ) : !isLoading ? (
        <div className="flex flex-wrap items-center justify-center gap-3 py-5">
          {FSArts.map((art: Art, index: number) => {
            return (
              <ArtGalleryThumbnail
                key={index}
                art={art}
                onClickFn={() => {
                  handleModalOpen(art, index);
                }}
              />
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
