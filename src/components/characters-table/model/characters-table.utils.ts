import { type Info, type Character } from "../../../data/types";

const fetchCharactersData = async (page: number): Promise<Info<Character[]>> => {
  const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
  const data: Info<Character[]> = await response.json();
  return data;
};

export { fetchCharactersData };
