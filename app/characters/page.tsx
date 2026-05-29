import PlaceholderPage from "../components/PlaceholderPage";
import ProjectPageShell from "../components/ProjectPageShell";

function CharactersPage() {
  return (
    <ProjectPageShell>
      <PlaceholderPage
        description="주요 인물과 조력자, 적대자, 관계성을 한 곳에서 관리합니다."
        items={["아르테미스", "케인", "말로크", "나디아"]}
        title="캐릭터"
      />
    </ProjectPageShell>
  );
}

export default CharactersPage;
