import { PropsWithChildren, useState } from "react";


interface DraggableContentProps extends PropsWithChildren {
  id: string;
  index: number;
}

export default function DraggableContent({
  children,
  id,
  index,
}: DraggableContentProps) {
  return (<></>
    // <Draggable draggableId={id} index={index}>
    //   {(provided, snapshot) => (
    //     <div
    //       ref={provided.innerRef}
    //       {...provided.draggableProps}
    //       {...provided.dragHandleProps}
    //     >
    //       {children}
    //     </div>
    //   )}
    // </Draggable>
  );
}
