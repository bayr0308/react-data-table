import { type Row } from "@tanstack/react-table";

import { type CharactersTableFeatures } from "./characters-table.features";
import { Button } from "@/components/ui/button";
import { type Character } from "@/data/types";

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
