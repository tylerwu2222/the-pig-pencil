import './Home.css'
import { useContext, useState, useEffect } from 'react';
import { hoveredTabContext } from '../../NavBar/NavBar';
import home_mosaic_images from '../../../site_data/home_mosaic_images.json'
// import { Padding } from '@mui/icons-material';

// const home_image_path = '/img/home_mosaic/';

const minSize = 10;
const maxSize = 17;

const get_random_int = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

const get_random_number = (min, max) => {
    return Math.random() * (max - min) + min;
}


const get_random_position = (min = 20, max = 81, minAvoid = 40, maxAvoid = 60) => {
    let position = get_random_number(min, max);
    const midPoint = (minAvoid + maxAvoid) / 2;
    if (position < midPoint && position >= minAvoid) {
        return minAvoid - 1
    }
    else if (position >= midPoint && position <= maxAvoid) {
        return maxAvoid + 1
    }
    else {
        return position
    }
};

const get_grid_position = () => {

};

const Home = () => {
    const { currentHoveredTab, setCurrentHoveredTab } = useContext(hoveredTabContext);
    const [currentImages, setCurrentImages] = useState(null);
    const [currentImageGeneratingProcess, setCurrentImageGeneratingProcess] = useState(0);
    const [imageComponent, setImageComponent] = useState(null);

    // update current images with current hovered tab
    useEffect(() => {
        setCurrentImages(home_mosaic_images[currentHoveredTab]);
        // setCurrentImageGeneratingProcess(get_random_int(0, 5)); // 0 to 4
    }, [currentHoveredTab]);

    // update image positioning when IGP changes
    useEffect(() => {
    }, [currentImageGeneratingProcess]);


    return (
        <>
            <div className="container-0">
                <div className='slogan-container'>
                    <p id="slogan-text" >
                        A blog about <b>{currentHoveredTab}</b>
                    </p>
                    {/* <p id="slogan-text" >
                        A pigpen of content.
                    </p> */}
                </div>
            </div>
            {currentImages && currentImages.sort((a, b) => 0.5 - Math.random()).map(i => {
                return (
                    <img
                        src={'/img/home_mosaic/' + currentHoveredTab + '/' + i}
                        className='home-img'
                        alt={i}
                        style={{
                            position: 'absolute',
                            top: get_random_position() + 'vh',
                            left: get_random_position(5, 81, 30, 60) + 'vw',
                            maxHeight: get_random_number(minSize, maxSize) + 'vh',
                            maxWidth: get_random_number(minSize, maxSize) + 'vw'
                        }}>

                    </img>
                );
            })}
        </>
    )
};

export default Home;