import PlaceholderPage from "../components/PlaceholderPage";
import ProjectPageShell from "../components/ProjectPageShell";

function MapPage() {
  return (
    <ProjectPageShell>
      <PlaceholderPage
        description="지역, 도시, 이동 경로와 공간 관계를 정리합니다."
        items={["아스라", "북부 시장", "기억 경매장", "남쪽 황야"]}
        title="지역과 지도"
      />
    </ProjectPageShell>
  );
}

export default MapPage;
