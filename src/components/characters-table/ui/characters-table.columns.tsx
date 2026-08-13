import { createColumnHelper } from "@tanstack/react-table";

import { type Character } from "../../../data/types";
import { cn } from "../../../utils/cn";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { CharactersTableActions } from "./characters-table.actions";
import { type CharactersTableFeatures } from "./characters-table.features";

const columnHelper = createColumnHelper<CharactersTableFeatures, Character>();

const charactersTableColumns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
      />
    ),
    cell: ({ row }) => {
      return (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={(e) => row.toggleSelected(e.target.checked)}
        />
      );
    },
  }),
  columnHelper.accessor("id", {
    header: "ID",
  }),
  columnHelper.accessor("image", {
    header: "Avatar",
    cell: ({ getValue, row }) => {
      const value = getValue();
      return (
        <a href={value} target="_blank" rel="noopener noreferrer" className="inline-block">
          <img
            src={value}
            alt={row.original.name}
            className="size-10 rounded-full border object-cover"
          />
        </a>
      );
    },
  }),
  columnHelper.accessor("name", {
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button onClick={() => column.toggleSorting(isSorted === "asc")}>
          <svg
            aria-hidden="true"
            role="presentation"
            className={cn(
              "size-4",
              isSorted !== false ? "text-blue-500" : "",
              isSorted === "asc" ? "rotate-180" : "",
            )}
          >
            <use href={`${import.meta.env.BASE_URL}icons.svg#arrow-up-icon`}></use>
          </svg>
          Name
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const value = getValue();
      return <span className="font-medium">{value}</span>;
    },
  }),
  columnHelper.accessor("species", {
    header: "Species",
  }),
  columnHelper.accessor("status", {
    header: ({ column }) => {
      const filterValue = column.getFilterValue() as string | undefined;
      return (
        <select value={filterValue} onChange={(e) => column.setFilterValue(e.target.value)}>
          <option value="">Status</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      );
    },
    cell: ({ getValue }) => {
      const value = getValue();
      const colors: Record<Character["status"], string> = {
        Alive: "bg-emerald-100 text-emerald-700",
        Dead: "bg-red-100 text-red-700",
        unknown: "bg-zinc-100 text-zinc-700",
      };
      return <Badge className={cn("", colors[value])}>{value}</Badge>;
    },
  }),
  columnHelper.accessor("gender", {
    header: ({ column }) => {
      const filterValue = column.getFilterValue() as string | undefined;
      return (
        <select value={filterValue} onChange={(e) => column.setFilterValue(e.target.value)}>
          <option value="">Gender</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
      );
    },
    cell: ({ getValue }) => {
      const value = getValue();
      const colors: Record<Character["gender"], string> = {
        Female: "bg-pink-100 text-pink-700",
        Male: "bg-sky-100 text-sky-700",
        Genderless: "bg-violet-100 text-violet-700",
        unknown: "bg-zinc-100 text-zinc-700",
      };
      const icons: Record<Character["gender"], string> = {
        Female: `${import.meta.env.BASE_URL}icons.svg#female-icon`,
        Male: `${import.meta.env.BASE_URL}icons.svg#male-icon`,
        Genderless: `${import.meta.env.BASE_URL}icons.svg#genderless-icon`,
        unknown: `${import.meta.env.BASE_URL}icons.svg#genderless-icon`,
      };
      return (
        <Badge className={cn("", colors[value])}>
          <svg aria-hidden="true" role="presentation" className="size-4">
            <use href={icons[value]}></use>
          </svg>
          {value}
        </Badge>
      );
    },
  }),
  columnHelper.accessor("origin", {
    header: "Origin",
    cell: ({ getValue }) => {
      const value = getValue();
      return <span>{value.name}</span>;
    },
  }),
  columnHelper.accessor("location", {
    header: "Location",
    cell: ({ getValue }) => {
      const value = getValue();
      return <span>{value.name}</span>;
    },
  }),
  columnHelper.accessor("episode", {
    header: "Episodes",
    cell: ({ getValue }) => {
      const value = getValue();
      return <span>{value.length} episodes</span>;
    },
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => {
      return <CharactersTableActions row={row} />;
    },
  }),
]);

export { charactersTableColumns };
