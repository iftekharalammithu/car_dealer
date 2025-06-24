import {
  defaultDropAnimationSideEffects,
  DragOverlay,
  DropAnimation,
} from "@dnd-kit/core";
import React, { PropsWithChildren } from "react";

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

const SortableOverlay = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <DragOverlay dropAnimation={dropAnimationConfig}>{children}</DragOverlay>
    </div>
  );
};

export default SortableOverlay;
