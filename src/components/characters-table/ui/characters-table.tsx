import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useTable } from "@tanstack/react-table";
import { useState } from "react";

import { Button } from "../../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { PAGE_SIZE } from "../model/characters-table.constants";
import { fetchCharactersData } from "../model/characters-table.utils";
import { charactersTableColumns } from "./characters-table.columns";
import { charactersTableFeatures } from "./characters-table.features";

interface CharactersTableProps {}

const CharactersTable = ({}: CharactersTableProps) => {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: PAGE_SIZE });

  const charactersQuery = useQuery({
    queryKey: ["characters", pagination],
    queryFn: () => fetchCharactersData({ page: pagination.pageIndex + 1 }),
    placeholderData: keepPreviousData,
  });

  const table = useTable({
    features: charactersTableFeatures,
    columns: charactersTableColumns,
    data: charactersQuery.data?.results ?? [],
    rowCount: charactersQuery.data?.info?.count ?? 0,
    state: { pagination },
    onPaginationChange: setPagination,
    manualPagination: true,
  });

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
          ) : charactersQuery.status === "pending" ? (
            <TableRow>
              <TableCell colSpan={charactersTableColumns.length} className="h-24 text-center">
                Loading...
              </TableCell>
            </TableRow>
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
          Page {pagination.pageIndex + 1} of {table.getPageCount()}
        </p>
        <div className="flex items-center gap-2">
          <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export { CharactersTable };
