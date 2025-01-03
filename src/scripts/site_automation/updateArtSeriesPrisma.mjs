import {
  getArtImageBucketFolders,
  getAllArtImages,
} from "../../lib/supabase/supabase.ts";

import { updateArtSeries, updateArt, getArtSeriesIDByName } from "../../lib/prisma/prisma.ts";

import { removeFileExtension } from "../../lib/stringFormatting.ts";

const formatArtData = async (imageData) => {
  const folderNames = Object.keys(imageData);

  // console.log("unformatted", JSON.stringify(imageData, null, 2));
  // console.log('image keys', folders);
  // console.log("first folder", imageData[folderNames[0]]);

  // reformat data from object of arrays into array of objects
  const imageArray = await Promise.all(
    folderNames.flatMap((folderName) => 
      imageData[folderName].map(async (image) => {
        const ArtTableRow = {};
        ArtTableRow["seriesId"] = await getArtSeriesIDByName(folderName); // get series id from name
        ArtTableRow["title"] = removeFileExtension(image["name"]);
        ArtTableRow["id"] = image["metadata"]["eTag"].replace(/"/g, ""); // Remove quotes from eTag
        ArtTableRow["publicUrl"] = image["publicUrl"];
        return ArtTableRow;
      })
    )
  );

  return imageArray
};

const updateArtSeriesPrisma = async () => {
  // 1) get and update art series
  // get all folder names in art-images buckets via supabase SDK
  console.log("getting folders from art-images bucket...");
  const folders = await getArtImageBucketFolders();
  console.log("got folders", folders.slice(0, 2));

  // add any new series table with new/updated folders with prisma client
  console.log("updating ArtSeries table...");
  updateArtSeries(folders);
  console.log("updated ArtSeries table");

  // 2) get and update art pieces
  // get art piece metadata from each folder in bucket
  console.log('getting art image metadata from folders...');
  const images = await getAllArtImages(folders);
  console.log('got image metadata for each folder');

  // format data into Art table format:
  const imagesFormatted = await formatArtData(images);
  console.log("formatted images", imagesFormatted.slice(0, 2));

  // add new pieces to art table
  console.log('adding art image metadata to Art table...')
  updateArt(imagesFormatted);
  console.log('art image metadata added to table')
};

updateArtSeriesPrisma();
