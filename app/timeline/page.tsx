import PlaceholderPage from "../components/PlaceholderPage";
import ProjectPageShell from "../components/ProjectPageShell";

function TimelinePage() {
  return (
    <ProjectPageShell>
      <PlaceholderPage
        description="과거 사건, 현재 진행 중인 이야기, 장면의 시간 흐름을 정리합니다."
        items={["도시 부유식", "기억 경매 합법화", "1장 이동 경로", "장치 균열 사건"]}
        title="연표"
      />
    </ProjectPageShell>
  );
}

export default TimelinePage;
