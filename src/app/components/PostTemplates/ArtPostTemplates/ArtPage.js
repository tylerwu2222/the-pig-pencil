import { useState, createContext } from 'react';
// import ArtImages from '../../../site_data/art_images.json'
import ArtImages from '../../../post_data/art_image_data/art_images.json';
import '../styles/art.css';

import ImageModalNavigable from '../../modals/ImageModal/ImageModalNavigable';
import SlideOutText from '../../typography/SlideOutText/SlideOutText';

export const ArtHoverContext = createContext();

const ArtPage = ({ folder }) => {
    const imageFolder = '/img/art/'
    const pageFolder = imageFolder + folder + '/'
    // const data = JSON.parse(ArtImages[folder]);
    const data = ArtImages[folder];

    const [hoveredPiece, setHoveredPiece] = useState(null);
    const [displayedPiece, setDisplayedPiece] = useState(data[0]);

    // formats filename into title
    const format_title = (filename) => {
        const regex = /.jpg|.png/g
        return filename.replace(regex, '').replace('_', ' ')
    }

    return (
        <>
            <ArtHoverContext.Provider value={{
                data,
                pageFolder,
                hoveredPiece,
                setHoveredPiece,
                displayedPiece,
                setDisplayedPiece,
                format_title
            }}>
                <div className="container containerBottom">
                    <h1>{folder}</h1>
                    <p>Click an image to view details + description. Then use arrow keys to navigate.</p>
                    <div className="artContainer">
                        {
                            data.map((row, i) => {
                                const slideOutText = <SlideOutText
                                    imgKey={i}
                                    text={format_title(row.filename)}
                                />;
                                const imageTN = <img key={i} className="modalImgThumbnail artPiece smallArt" src={pageFolder + row.filename} alt={row.filename} loading="lazy" />
                                const imageModal = <ImageModalNavigable
                                    imgKey={i}
                                    imgTN={imageTN}
                                />;
                                return (
                                    <div key={i} className="artDiv">
                                        {slideOutText}
                                        {imageModal}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </ArtHoverContext.Provider>
        </>
    )
};

export default ArtPage;