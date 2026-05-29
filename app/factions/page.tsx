import PlaceholderPage from "../components/PlaceholderPage";
import ProjectPageShell from "../components/ProjectPageShell";

function FactionsPage() {
  return (
    <ProjectPageShell>
      <PlaceholderPage
        description="왕실, 길드, 상단, 반란 세력처럼 세계의 권력 구조를 관리합니다."
        items={["왕실", "마법사 길드", "기억 상단", "폐허 탐사단"]}
        title="진영 & 세력"
      />
    </ProjectPageShell>
  );
}

export default FactionsPage;
