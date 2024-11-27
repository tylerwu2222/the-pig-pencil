import React, { useEffect, useState, useContext } from 'react';
import { ArtHoverContext } from '../../PostTemplates/ArtPostTemplates/ArtPage.js';
import './SlideOutText.css';


// slide out text when element is hovered
export const handle_elt_hover = (element, slide_out_text) => {
  // console.log('e',);
  // element.props.visibility = 'visible';
  
  // console.log('text',slide_out_text);
  // set slide out visibility true
  // element
}

export default function SlideOutText({ imgKey, text }) {
  const {hoveredPiece} = useContext(ArtHoverContext);
  const [isHovered, setIsHovered] = useState(false);
  // update slideOutTextVisibility based on hoveredPiece
  useEffect(() => {
    if (hoveredPiece === imgKey){
      // console.log('slideout',imgKey)
      setIsHovered(true);
    }
    else{
      setIsHovered(false)
    }
  }, [hoveredPiece]);

  return (
    <div className='slide-out-div' style={{visibility: isHovered? 'visible':'hidden'}}>
      {text}
    </div>
  )
}
