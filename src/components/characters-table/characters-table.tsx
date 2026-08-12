import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { Character, Info } from "../../utils/interfaces";
import { useTable } from "@tanstack/react-table";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import { charactersTableColumns } from "./characters-table.columns";
import { charactersTableFeatures } from "./characters-table.features";
import { Button } from "../ui/button";

const EMPTY_DATA: Character[] = [];

const fetchData = async (page: number): Promise<Info<Character[]>> => {
  const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
  const data: Info<Character[]> = await response.json();
  return data;
};

interface CharactersTableProps {}

const CharactersTable = ({}: CharactersTableProps) => {
  const [page, setPage] = useState(1);

  const charactersQuery = useQuery({
    queryKey: ["characters", page],
    queryFn: () => fetchData(page),
    placeholderData: (previousData) => previousData,
  });

  const table = useTable({
    features: charactersTableFeatures,
    columns: charactersTableColumns,
    data: charactersQuery.data?.results ?? EMPTY_DATA,
  });

  const totalPages = charactersQuery.data?.info?.pages ?? 1;
  const canGoPrevious = page > 1;
  const canGoNext = page < totalPages;

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {charactersQuery.status === "success" ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={charactersTableColumns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between border-t p-3">
        <p className="text-sm">
          Page {page} of {totalPages}
        </p>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setPage((currentPage) => currentPage - 1)}
            disabled={!canGoPrevious}
          >
            Previous
          </Button>
          <Button onClick={() => setPage((currentPage) => currentPage + 1)} disabled={!canGoNext}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export { CharactersTable };
