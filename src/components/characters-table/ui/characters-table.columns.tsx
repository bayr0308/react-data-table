import { createColumnHelper } from "@tanstack/react-table";

import { type Character } from "../../../data/types";
import { cn } from "../../../utils/cn";
import { Badge } from "../../ui/badge";
import { type CharactersTableFeatures } from "./characters-table.features";

const columnHelper = createColumnHelper<CharactersTableFeatures, Character>();

const charactersTableColumns = columnHelper.columns([
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
    header: "Name",
    cell: ({ getValue }) => {
      const value = getValue();
      return <span className="font-medium">{value}</span>;
    },
  }),
  columnHelper.accessor("species", {
    header: "Species",
  }),
  columnHelper.accessor("status", {
    header: "Status",
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
    header: "Gender",
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
]);

export { charactersTableColumns };
