import './ImageModal.css'

import { useEffect, useState, useContext } from 'react';
import { useHover } from "@uidotdev/usehooks";
import { ArtHoverContext } from '../../PostTemplates/ArtPostTemplates/ArtPage.js';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';



// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     // width: 800,
//     width: "fit-content",
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };

const ImageModalNavigable = ({ imgKey, imgTN }) => {
    const [imageIncrementCount, setImageIncrementCount] = useState(0);
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
        setImageIncrementCount(0);
    }
    const handleClose = () => {
        setOpen(false);
        setImageIncrementCount(0);
    };
    const [ref, hovering] = useHover();
    const {
        data,
        pageFolder,
        // hoveredPiece,
        setHoveredPiece,
        displayedPiece,
        setDisplayedPiece,
        format_title
    } = useContext(ArtHoverContext);

    // update which piece is hovered/displayed on image hover
    useEffect(() => {
        if (hovering) {
            setHoveredPiece(imgKey);
            setDisplayedPiece(data[imgKey])
        }
        else {
            setHoveredPiece(null);
        }
    }, [hovering]);

    // handles button navigation
    const increment_image = (amt) => {
        if (imgKey + imageIncrementCount >= 0 && imgKey + imageIncrementCount <= data.length - 1) {
            setImageIncrementCount(imageIncrementCount + amt);
        }
    }
    useEffect(() => {
        if (imgKey + imageIncrementCount >= 0 && imgKey + imageIncrementCount <= data.length - 1) {
            setDisplayedPiece(data[imgKey + imageIncrementCount])
        }
    }, [imageIncrementCount]);
    // adds button options for navigation
    const handleKeyPress = (event) => {
        if (event.key === 'ArrowRight' && imgKey + imageIncrementCount <= data.length - 2) {
            event.preventDefault();
            document.getElementById('modal-right-nav-btn').click();
        }
        else if (event.key === 'ArrowLeft' && imgKey + imageIncrementCount >= 1) {
            event.preventDefault();
            document.getElementById('modal-left-nav-btn').click();
        }
    };

    return (
        <>
            <div
                className = 'modal-image-tn'
                onClick={handleOpen}
                ref={ref}
                style={{ display: 'inline' }}>
                {imgTN}
            </div>
            <div onKeyDown={handleKeyPress}>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box>
                        <Box className='MUIBox'>
                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ margin: [2, 2] }}>
                                <b>{format_title(displayedPiece.filename)}</b>
                            </Typography>
                            <img className="modalImg" src={pageFolder + displayedPiece.filename} alt={displayedPiece.filename} loading="lazy" />
                            <Typography id="modal-modal-description" sx={{ margin: [1, 3] }}>
                                <>
                                    <i className='art-date'>{displayedPiece.date}</i>
                                    <br></br>
                                    <p className='artDesc'>{displayedPiece.description}</p>
                                </>
                            </Typography>
                        </Box>
                        <Box className='btnMUIBox' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <IconButton
                                id='modal-left-nav-btn'
                                className='modalNavBtn'
                                aria-label="previous"
                                onClick={() => {
                                    increment_image(-1);
                                }}
                                style={{ visibility: imgKey + imageIncrementCount === 0 ? 'hidden' : 'visible' }}
                            >
                                <NavigateBeforeIcon />
                            </IconButton>
                            <IconButton
                                id='modal-right-nav-btn'
                                className='modalNavBtn'
                                aria-label="next"
                                onClick={() => {
                                    increment_image(1);
                                }}
                                style={{ visibility: imgKey + imageIncrementCount === data.length - 1 ? 'hidden' : 'visible' }}
                            >
                                <NavigateNextIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    {/* show modal navigation arrows when modal open==true */}
                </Modal >
            </div>
        </>
    );
}

export default ImageModalNavigable;
