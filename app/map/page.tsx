import PlaceholderPage from "../components/PlaceholderPage";
import ProjectPageShell from "../components/ProjectPageShell";
import { getProjectMap } from "../lib/api";

async function MapPage() {
  const { map } = await getProjectMap();
  const items = [
    map.title,
    ...map.regions.map((region) => region.name),
    ...map.routes.map((route) => route.name),
    ...map.markers.map((marker) => marker.label),
  ];

  return (
    <ProjectPageShell>
      <PlaceholderPage
        description={map.description ?? "텍스트로 생성된 지도 위에 지역, 캐릭터 위치, 진영 영향권과 이동 경로를 확인합니다."}
        items={items}
        title="지도"
      />
    </ProjectPageShell>
  );
}

export default MapPage;
