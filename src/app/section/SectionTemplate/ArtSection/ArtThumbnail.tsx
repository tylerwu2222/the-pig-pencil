import Link from "next/link";

// components
import { Badge } from "@/components/ui/badge";
import IconWithText from "@/app/components/icons/IconWithText";
import { Eye } from "lucide-react";
import { PiggyBank } from "lucide-react";

// types
import { ArtSeries } from "@/types/extendedPrismaTypes";

// helpers
import { differenceInDays } from "date-fns";
import { snakeToCamel } from "@/lib/stringFormatting";
import { formatDateToShortDate } from "@/lib/dateFormatting";

import React from "react";

interface ArtThumbnailProps {
  series: ArtSeries;
  sortBadge?: string | undefined;
  onClickFn?: () => void;
}

const validSortOptions = ["views", "oinks"];

export default function ArtThumbnail({
  series,
  sortBadge,
  onClickFn,
}: ArtThumbnailProps) {
  const isNew =
    differenceInDays(new Date(), series.publishDate) <= 7 &&
    differenceInDays(new Date(), series.publishDate) >= 0;

  return (
    <div
      className={`group relative m-[2vh] rounded-sm border-[1px] ${isNew ? "border-orange-400" : ""} p-[2vh] transition duration-700 ease-in-out hover:-translate-x-1 hover:-translate-y-1 hover:border-hoverLightPink hover:bg-highlightWhite hover:shadow-[0.35em_0.35em_0_0_#f2b0ca]`}
      title={series.seriesTitle}
    >
      {typeof sortBadge === "string" && sortBadge === "date" && isNew && (
        <Badge className="absolute left-0 top-0 m-[1vh] rounded-full bg-orange-400 text-xs text-white transition duration-700 ease-in-out group-hover:bg-hoverLightPink">
          <p>new!</p>
        </Badge>
      )}
      {typeof sortBadge === "string" &&
        validSortOptions.includes(sortBadge) && (
          <Badge className="absolute left-0 top-0 m-[1vh] rounded-full bg-borderGrey text-xs text-white transition duration-700 ease-in-out group-hover:bg-hoverLightPink">
            <div className="flex">
              {sortBadge === "views" && (
                <IconWithText
                  icon={<Eye size={18} />}
                  // text={String(post.views)}
                />
              )}
              {sortBadge === "oinks" && (
                <IconWithText
                  icon={<PiggyBank size={18} />}
                  // text={String(post.oinks)}
                />
              )}
            </div>
          </Badge>
        )}
      <Link href={"/art/" + series.seriesTitle} className="">
        {/* thumbnail */}
        <div>
          {series.thumbnail ? (
            <img
              className="aspect-square h-full max-h-72 object-contain"
              src={series.thumbnail}
              alt="post-thumbnail"
              loading="lazy"
            />
          ) : (
            <div className="w-full xl:max-w-72"></div>
          )}
        </div>
        {/* heading */}
        <div className="w-full py-1 lg:max-w-52">
          <p className="text-2xl text-textGrey md:text-lg">
            {snakeToCamel(series.seriesTitle, " ")}
          </p>
        </div>
        {/* updated date */}
        <div className="text-sm text-textGrey md:text-xs md:text-textLightGrey">
          <p className="">
            Last updated: {series.updateDate && formatDateToShortDate(series.updateDate)}
          </p>
        </div>
        {/* tag(s) */}
        <div className="text-wrap xl:max-w-72">
          {series.tags.map((t, i) => {
            return (
              <Badge
                key={i}
                className="mb-[0.1rem] mr-1 rounded-md bg-buttonGrey font-light text-white hover:bg-buttonGrey"
              >
                {t}
              </Badge>
            );
          })}
        </div>
      </Link>
    </div>
  );
}
