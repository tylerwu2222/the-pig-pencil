import { createClient } from "@supabase/supabase-js";
import keys from "../../scripts/api_keys.json";
import { FileObject } from "@supabase/storage-js";

// create connection
const supabaseUrl = "https://rktdoyanvipokktqkwje.supabase.co";
// const supabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrdGRveWFudmlwb2trdHFrd2plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3Mjk5MDQsImV4cCI6MjA0OTMwNTkwNH0._RyTF8NmSnGxR-OOCP7CH2e6j5Ogtca7qvHLnV3eo6Y";

const serviceKey = keys.supabase_service_role;
const supabase = createClient(supabaseUrl, serviceKey);

// gets all folder names for
export const getArtImageBucketFolders = async () => {
  const { data: buckets, error: e1 } = await supabase.storage.listBuckets();
  //   console.log("All buckets", buckets);
  const { data, error } = await supabase.storage.from("art-images").list("");

  if (error) {
    console.error("Error fetching folder names:", error);
  } else {
    // Filter results to only include folders
    // console.log("Data:", data);
    const folders = data.filter((item) => item.name && item.id === null); // Folders have an `id` of null
    const folderNames = folders.map((folder) => folder.name);
    // console.log("Folders:", folderNames);
    return folderNames;
  }
};

// gets all files for a given folder
const getArtImagesInFolder = async (folder: string): Promise<FileObject[]> => {
  const { data, error } = await supabase.storage
    .from("art-images")
    .list(folder, {
      sortBy: { column: "name", order: "asc" },
    });

  if (error) {
    console.error("Error fetching folder:", error);
  } else {
    // get public url for each image
    const dataWithURL = data.map((d) => {
      // publicURL: "..."
      const { data } = supabase.storage
        .from("art-images")
        .getPublicUrl(folder + "/" + d.name);
      return { ...d, publicUrl: data.publicUrl };
    });

    return dataWithURL;
  }
  return [];
};

// gets all art images, returning their names, folders urls, etc. in an array of objects
export const getAllArtImages = async (folderNames: string[]) => {
  const artImagesObject: { [key: string]: FileObject[] } = {};
  await Promise.all(
    folderNames.map(async (folderName) => {
      const images = await getArtImagesInFolder(folderName); // get images for folder
      artImagesObject[folderName] = images; // create key/val pair with images
    }),
  );
  return artImagesObject;
};
