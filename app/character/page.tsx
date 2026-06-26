import ProjectPageShell from "../components/ProjectPageShell";
import { getCharacterRelationships, getCharacters } from "../lib/api";
import CharacterManager from "./_components/CharacterManager";

async function CharacterPage() {
  const [{ characters }, { relationships }] = await Promise.all([
    getCharacters(),
    getCharacterRelationships(),
  ]);

  return (
    <ProjectPageShell>
      <CharacterManager characters={characters} relationships={relationships} />
    </ProjectPageShell>
  );
}

export default CharacterPage;
