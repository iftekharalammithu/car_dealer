"use client";
import React, { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { useQueryState } from "nuqs";
import { cn } from "@/lib/utils";

interface PaginationProps {
  baseURL: string;
  totalPages: number;
  maxVisiblePages?: number;
  styles: {
    paginationRoot: string;
    paginationPrevious: string;
    paginationNext: string;
    paginationLink: string;
    paginationLinkActive: string;
  };
}

const CustomPagination = (props: PaginationProps) => {
  const { baseURL, totalPages, maxVisiblePages = 5, styles } = props;

  const [currentPage, setCurrentPage] = useQueryState("page", {
    defaultValue: 1,
    parse: (value) => {
      const parsed = Number.parseInt(value, 10);
      return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
    },
    serialize: (value) => value.toString(),
    shallow: false,
  });

  const [visibleRange, setVisibleRange] = useState({
    start: 1,
    end: Math.min(maxVisiblePages, totalPages),
  });

  useEffect(() => {
    const halfVisible = Math.floor(maxVisiblePages / 2);
    const newStart = Math.max(
      1,
      Math.min(currentPage - halfVisible, totalPages - maxVisiblePages + 1)
    );
    const newEnd = Math.min(newStart + maxVisiblePages - 1, totalPages);
    setVisibleRange({ start: newStart, end: newEnd });
  }, [currentPage, maxVisiblePages, totalPages]);

  const createPageUrl = (page: number) => {
    const url = new URL(baseURL, "http://localhost:3000");
    url.searchParams.set("page", page.toString());
    return url.toString();
  };

  const handleellipsisClick = (direction: "left" | "right") => {
    const newPage =
      direction === "left"
        ? Math.max(1, visibleRange.start - maxVisiblePages)
        : Math.min(totalPages, visibleRange.end + maxVisiblePages);
    setCurrentPage(newPage);
  };

  return (
    <Pagination className={styles.paginationRoot}>
      <PaginationContent className=" lg:gap-4">
        <PaginationItem>
          <PaginationPrevious
            className={cn(
              currentPage <= 1 && "hidden",
              styles.paginationPrevious
            )}
            href={createPageUrl(currentPage - 1)}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
              }
            }}
          ></PaginationPrevious>
        </PaginationItem>

        {visibleRange.start > 1 && (
          <PaginationItem className="hidden lg:block">
            <PaginationLink
              className={styles.paginationLink}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleellipsisClick("left");
              }}
            >
              ...
            </PaginationLink>
          </PaginationItem>
        )}

        {/* page histiory */}
        {Array.from(
          { length: visibleRange.end - visibleRange.start + 1 },
          (_, i) => visibleRange.start + i
        ).map((page) => {
          const isActive = page === currentPage;
          let rel = "";
          if (page === currentPage - 1) {
            rel = "prev";
          } else if (page === currentPage + 1) {
            rel = "next";
          }
          return (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={isActive}
                href={createPageUrl(page)}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(page);
                }}
                className={cn(
                  styles.paginationLink,
                  isActive && styles.paginationLinkActive
                )}
                {...(rel ? { rel } : {})}
              ></PaginationLink>
            </PaginationItem>
          );
        })}
        {visibleRange.end < totalPages && (
          <PaginationItem className="hidden lg:block">
            <PaginationLink
              className={styles.paginationLink}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleellipsisClick("right");
              }}
            >
              ...
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationNext
            className={cn(
              currentPage >= totalPages && "hidden",
              styles.paginationNext
            )}
            href={createPageUrl(currentPage + 1)}
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) {
                setCurrentPage(currentPage + 1);
              }
            }}
          ></PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
