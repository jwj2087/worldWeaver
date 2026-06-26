import PlaceholderPage from "../components/PlaceholderPage";
import ProjectPageShell from "../components/ProjectPageShell";
import { getTimelineEvents } from "../lib/api";

async function TimelinePage() {
  const { events } = await getTimelineEvents();

  return (
    <ProjectPageShell>
      <PlaceholderPage
        description="과거 사건, 현재 진행 중인 이야기, 장면의 시간 흐름을 정리합니다."
        items={events.map((event) => event.title)}
        title="연표"
      />
    </ProjectPageShell>
  );
}

export default TimelinePage;
