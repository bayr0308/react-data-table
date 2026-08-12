import { CharactersTable } from "./components/characters-table/";

interface AppProps {}

const App = ({}: AppProps) => {
  return (
    <div className="p-4">
      <CharactersTable />
    </div>
  );
};

export { App };
