import { createColumnHelper } from "@tanstack/react-table";
import { type CharactersTableFeatures } from "./characters-table.features";
import type { Character } from "../../utils/interfaces";
import { cn } from "../../utils/cn";

const columnHelper = createColumnHelper<CharactersTableFeatures, Character>();

const charactersTableColumns = columnHelper.columns([
  columnHelper.accessor("image", {
    header: "Avatar",
    cell: ({ getValue, row }) => {
      const value = getValue();
      return (
        <img
          src={value}
          alt={row.original.name}
          className="size-10 rounded-full border object-cover"
        />
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
      return (
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
            colors[value],
          )}
        >
          {value}
        </span>
      );
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
      return (
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
            colors[value],
          )}
        >
          {value}
        </span>
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
