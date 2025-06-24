"use client";
import React, { JSX, useCallback, useMemo, useState } from "react";
import { ClassifiedImages } from "./MultiImageUpload";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import {
  Active,
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import SortableOverlay from "./SortableOverlay";

type classifiedImage = ClassifiedImages[number];

interface DragAndDropContextProps {
  replace: (items: ClassifiedImages) => void;
  items: ClassifiedImages;
  renderItem: (item: classifiedImage) => JSX.Element;
}

export const DragAndDropContext = (props: DragAndDropContextProps) => {
  const { replace, items, renderItem } = props;
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const activeItem = useMemo(
    () => items.find((item) => item.id === activeId),
    [activeId, items]
  );
  const handleDragStart = useCallback(({ active }: { active: Active }) => {
    setActiveId(active.id as string);
  }, []);
  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (over && active.id !== over.id) {
        const activeIndex = items.findIndex(({ id }) => id === active.id);
        const overIndex = items.findIndex(({ id }) => id === over.id);
        const newItem = arrayMove(items, activeIndex, overIndex);

        replace(newItem);
      }
      setActiveId(null);
    },
    [items, replace]
  );

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className=" gap-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
          <SortableContext items={items.map(({ id }) => id as string)}>
            {items.map((item) => renderItem(item))}
          </SortableContext>
        </div>
        <SortableOverlay>
          {activeItem ? renderItem(activeItem) : null}
        </SortableOverlay>
      </DndContext>
    </div>
  );
};
