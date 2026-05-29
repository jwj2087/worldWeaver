import PlaceholderPage from "../components/PlaceholderPage";
import ProjectPageShell from "../components/ProjectPageShell";

function DocumentsPage() {
  return (
    <ProjectPageShell>
      <PlaceholderPage
        description="생성된 설정 문서, 장면 초안, 작업 메모를 모아 관리합니다."
        items={["1장 이동 경로 정리", "마법사 길드 규칙", "도시 부유 장치 설정", "북부 왕국 설정"]}
        title="문서"
      />
    </ProjectPageShell>
  );
}

export default DocumentsPage;
