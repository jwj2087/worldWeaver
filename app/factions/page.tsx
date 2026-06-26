import PlaceholderPage from "../components/PlaceholderPage";
import ProjectPageShell from "../components/ProjectPageShell";
import { getFactions } from "../lib/api";

async function FactionsPage() {
  const { factions } = await getFactions();

  return (
    <ProjectPageShell>
      <PlaceholderPage
        description="지도 위에 표시할 세력의 중심 거점, 영향권, 관계와 대표 색상을 관리합니다."
        items={factions.map((faction) => faction.name)}
        title="진영"
      />
    </ProjectPageShell>
  );
}

export default FactionsPage;
