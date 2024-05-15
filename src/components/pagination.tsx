import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

export interface PaginationProps {
  pageIndex: number;
  totalCount: number;
  perPage: number;
  onPageChange: (pageIndex: number) => Promise<void> | void;
}

export const PaginationComponent = ({
  onPageChange,
  pageIndex,
  perPage,
  totalCount,
}: PaginationProps) => {
  const pages = Math.floor(totalCount / perPage) || 1;

  return (
    <Pagination className="justify-end items-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <Button variant="outline" onClick={() => onPageChange(pageIndex - 1)}>
            <span className="sr-only">Página anterior</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
        </PaginationItem>
        <span className="text-sm px-2 text-muted-foreground">
          {pageIndex === 0 ? 1 : pageIndex + 1} de {pages}
        </span>
        <PaginationItem>
          <Button variant="outline" onClick={() => onPageChange(pageIndex + 1)}>
            <span className="sr-only">Próxima página</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
