import ProjectPageShell from "../components/ProjectPageShell";
import { getMe, getNotifications, getPreferences } from "../lib/api";

async function AccountPage() {
  const [{ user }, { preferences }, { notifications }] = await Promise.all([
    getMe(),
    getPreferences(),
    getNotifications(),
  ]);
  const initials = user.name.slice(0, 2).toUpperCase();

  return (
    <ProjectPageShell>
      <div className="min-h-0 flex-1 overflow-auto bg-[#FAFAF8]">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-5 px-5 py-6">
          <section className="rounded-lg border border-stone-200 bg-white p-5">
            <p className="mb-2 text-sm font-medium text-[#534AB7]">계정 설정</p>
            <h1 className="text-2xl font-semibold text-stone-950">내 계정</h1>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              프로필, 작업 기본값, 지도 생성 환경을 간단히 관리합니다.
            </p>
          </section>

          <section className="rounded-lg border border-stone-200 bg-white p-5">
            <h2 className="text-base font-semibold text-stone-950">프로필</h2>
            <div className="mt-4 flex items-center gap-4">
              <span className="flex size-14 items-center justify-center rounded-full bg-[#EEEDFE] text-sm font-semibold text-[#534AB7]">
                {initials}
              </span>
              <div className="grid flex-1 gap-3 md:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-xs font-medium text-stone-500">이름</span>
                  <input
                    className="h-10 rounded-md border border-stone-200 px-3 text-sm outline-none focus:border-[#534AB7]"
                    defaultValue={user.name}
                  />
                </label>
                <label className="grid gap-2">
                  <span className="text-xs font-medium text-stone-500">이메일</span>
                  <input
                    className="h-10 rounded-md border border-stone-200 px-3 text-sm outline-none focus:border-[#534AB7]"
                    defaultValue={user.email}
                  />
                </label>
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-stone-200 bg-white p-5">
            <h2 className="text-base font-semibold text-stone-950">지도 생성 기본값</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {[
                ["기본 지도 유형", preferences.defaultMapType],
                ["기본 스타일", preferences.defaultStyle],
                ["표시 레이어", preferences.visibleLayers.join(" · ")],
              ].map(([label, value]) => (
                <label className="grid gap-2" key={label}>
                  <span className="text-xs font-medium text-stone-500">{label}</span>
                  <select
                    className="h-10 rounded-md border border-stone-200 px-3 text-sm outline-none focus:border-[#534AB7]"
                    defaultValue={value}
                  >
                    <option>{value}</option>
                    <option>도시</option>
                    <option>왕국</option>
                    <option>전략 지도</option>
                  </select>
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-stone-200 bg-white p-5">
            <h2 className="text-base font-semibold text-stone-950">알림</h2>
            <div className="mt-4 grid gap-3">
              {[
                { label: "지도 생성 완료 알림", checked: notifications.mapGenerationComplete },
                { label: "프로젝트 변경사항 요약", checked: notifications.projectChangeSummary },
                { label: "협업 댓글 알림", checked: notifications.collaborationComments },
              ].map(({ label, checked }) => (
                <label className="flex items-center justify-between rounded-md border border-stone-200 px-3 py-2" key={label}>
                  <span className="text-sm text-stone-700">{label}</span>
                  <input className="size-4 accent-[#534AB7]" defaultChecked={checked} type="checkbox" />
                </label>
              ))}
            </div>
          </section>
        </div>
      </div>
    </ProjectPageShell>
  );
}

export default AccountPage;
