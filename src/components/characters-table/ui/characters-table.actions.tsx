import { type Row } from "@tanstack/react-table";

import { type Character } from "../../../data/types";
import { Button } from "../../ui/button";
import { type CharactersTableFeatures } from "./characters-table.features";

interface CharactersTableActionsProps {
  row: Row<CharactersTableFeatures, Character>;
}

const CharactersTableActions = ({ row }: CharactersTableActionsProps) => {
  return (
    <div>
      <Button>Edit {row.original.id}</Button>
    </div>
  );
};

export { CharactersTableActions };
