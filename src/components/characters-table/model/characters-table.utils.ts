import { type Character, type CharacterFilter, type Info } from "@/data/types";

const fetchCharactersData = async (filter: CharacterFilter): Promise<Info<Character[]>> => {
  const params = new URLSearchParams();
  Object.entries(filter).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.set(key, String(value));
    }
  });

  const url = new URL("https://rickandmortyapi.com/api/character/");
  url.search = params.toString();

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const data: Info<Character[]> = await response.json();
  return data;
};

export { fetchCharactersData };
