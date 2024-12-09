// modules
import SectionTemplate from "../SectionTemplate/SectionTemplate.js";

// data
// import arts from '../../../site_data/posts/art_posts.json';
import arts from "../../../post_data/art_sections.json";

// react
import { Link } from "react-router-dom";
// import { useEffect, useState } from 'react';

// const ArtCategory = ({ title, img, date, subPage }) => {
//   return (
//     <>
//       <div className="article-div hoverable-div">
//         <Link to={"/art/" + subPage} className="blog-link">
//           <img className="blog-tn" src={img} alt="thumbnail" loading="lazy" />
//           <div className="title-div" style={{ height: "3vh" }}>
//             <p className="blog-title">{title}</p>
//           </div>
//           <div className="author-div">
//             <p className="blog-tn-author">{date}</p>
//           </div>
//         </Link>
//       </div>
//     </>
//   );
// };

const Art = () => {
  return (
    <SectionTemplate
      postData={arts}
      section="Art"
      contentType="art"
      date="LastUpdated"
      tagBoxIncluded={false}
    />
  );
};

export default Art;
