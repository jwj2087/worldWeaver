import PlaceholderPage from "../components/PlaceholderPage";
import ProjectPageShell from "../components/ProjectPageShell";
import { getDocuments } from "../lib/api";

async function DocumentsPage() {
  const { documents } = await getDocuments();

  return (
    <ProjectPageShell>
      <PlaceholderPage
        description="생성된 설정 문서, 장면 초안, 작업 메모를 모아 관리합니다."
        items={documents.map((document) => document.title)}
        title="문서"
      />
    </ProjectPageShell>
  );
}

export default DocumentsPage;
