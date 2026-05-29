import PlaceholderPage from "../components/PlaceholderPage";
import ProjectPageShell from "../components/ProjectPageShell";

function WorldSettingsPage() {
  return (
    <ProjectPageShell>
      <PlaceholderPage
        description="세계의 장르, 핵심 규칙, 마법/기술 체계, 금기와 사회 구조를 관리합니다."
        items={["기억 거래 규칙", "부유 장치 원리", "왕실의 금기", "도시 경제 구조"]}
        title="세계관 설정"
      />
    </ProjectPageShell>
  );
}

export default WorldSettingsPage;
