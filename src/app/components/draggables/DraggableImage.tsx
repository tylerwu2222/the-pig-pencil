import { ReactNode } from 'react';
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time


interface DraggableImageProps{
    content: ReactNode
}

export default function DraggableImage({ content = <p>text</p> }:DraggableImageProps) {

    return (
        <Draggable
            // className="draggable-box"
        >
            {content}
        </Draggable>
    )
}