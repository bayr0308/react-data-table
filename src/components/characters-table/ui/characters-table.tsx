import { useQuery } from "@tanstack/react-query";
import { useTable } from "@tanstack/react-table";
import { useState } from "react";

import { Button } from "../../ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../ui/table";
import { EMPTY_DATA } from "../model/characters-table.constants";
import { fetchCharactersData } from "../model/characters-table.utils";
import { charactersTableColumns } from "./characters-table.columns";
import { charactersTableFeatures } from "./characters-table.features";

interface CharactersTableProps {}

const CharactersTable = ({}: CharactersTableProps) => {
  const [page, setPage] = useState(1);

  const charactersQuery = useQuery({
    queryKey: ["characters", page],
    queryFn: () => fetchCharactersData(page),
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
