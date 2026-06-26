import PlaceholderPage from "../components/PlaceholderPage";
import ProjectPageShell from "../components/ProjectPageShell";
import { getWorldNotes } from "../lib/api";

async function WorldPage() {
  const { notes } = await getWorldNotes();

  return (
    <ProjectPageShell>
      <PlaceholderPage
        description="지도 생성의 기준이 되는 세계의 장르, 지형 규칙, 마법/기술 체계와 사회 구조를 관리합니다."
        items={notes.map((note) => note.title)}
        title="세계관"
      />
    </ProjectPageShell>
  );
}

export default WorldPage;
