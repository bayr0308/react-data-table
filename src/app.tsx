import { CharactersTable } from "./components/characters-table/";

interface AppProps {}

const App = ({}: AppProps) => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-2xl font-bold text-primary-foreground"> Rick and Morty characters</h1>
      <CharactersTable />
    </div>
  );
};

export { App };
