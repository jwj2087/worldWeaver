export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";
export const DEFAULT_PROJECT_ID = process.env.NEXT_PUBLIC_DEFAULT_PROJECT_ID ?? "project_asra";

export type ProjectSummary = {
  id: string;
  name: string;
  description: string | null;
  genre: string | null;
  status: "active" | "archived";
  updatedAt: string;
};

export type ProjectStats = {
  characterCount: number;
  regionCount: number;
  factionCount: number;
  documentCount: number;
};

export type WorkItem = {
  id: string;
  title: string;
  detail: string;
  status: string;
  targetType: string;
  targetId: string | null;
};

export type Character = {
  id: string;
  projectId: string;
  name: string;
  initials: string;
  role: string;
  status: string;
  factionId: string | null;
  factionName: string | null;
  arc: string;
  notes: string[];
  tags: string[];
  color: string;
  createdAt: string;
  updatedAt: string;
};

export type CharacterRelationship = {
  id: string;
  projectId: string;
  sourceCharacterId: string;
  targetCharacterId: string;
  type: string;
  description: string;
  strength: number;
};

export type Faction = {
  id: string;
  projectId: string;
  name: string;
  description: string;
  color: string;
  baseRegionId: string | null;
  influence: "low" | "medium" | "high" | "dominant";
  relationships: Array<{
    targetFactionId: string;
    status: "ally" | "neutral" | "rival" | "enemy";
    description: string;
  }>;
  createdAt: string;
  updatedAt: string;
};

export type WorldNote = {
  id: string;
  projectId: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type DocumentItem = {
  id: string;
  projectId: string;
  title: string;
  content: string;
  type: "setting" | "scene" | "note" | "outline";
  status: "draft" | "in_progress" | "complete" | "needs_review";
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type TimelineEvent = {
  id: string;
  projectId: string;
  title: string;
  description: string;
  era: string;
  dateLabel: string;
  order: number;
  linkedDocumentId: string | null;
  linkedCharacterIds: string[];
  createdAt: string;
  updatedAt: string;
};

export type ProjectMap = {
  id: string;
  projectId: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  layers: Array<{ id: string; name: string; type: string; visible: boolean; order: number }>;
  regions: Array<{ id: string; name: string; description: string; factionId: string | null }>;
  routes: Array<{ id: string; name: string; style: string }>;
  markers: Array<{ id: string; label: string; type: string; targetId: string | null }>;
  createdAt: string;
  updatedAt: string;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
};

export type UserPreferences = {
  defaultMapType: string;
  defaultStyle: string;
  visibleLayers: string[];
};

export type NotificationSettings = {
  mapGenerationComplete: boolean;
  projectChangeSummary: boolean;
  collaborationComments: boolean;
};

export type ProjectOverview = {
  project: ProjectSummary;
  stats: ProjectStats;
  currentWorks: WorkItem[];
  worldNotes: WorldNote[];
  characters: Character[];
};

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as { message?: string; err?: string } | null;
    throw new Error(body?.message ?? body?.err ?? "API 요청에 실패했습니다.");
  }

  return (await response.json()) as T;
}

export function getProjectOverview(projectId = DEFAULT_PROJECT_ID) {
  return apiFetch<ProjectOverview>(`/projects/${projectId}/overview`);
}

export function getProjectMap(projectId = DEFAULT_PROJECT_ID) {
  return apiFetch<{ map: ProjectMap }>(`/projects/${projectId}/map`);
}

export function getCharacters(projectId = DEFAULT_PROJECT_ID) {
  return apiFetch<{ characters: Character[] }>(`/projects/${projectId}/characters`);
}

export function getCharacterRelationships(projectId = DEFAULT_PROJECT_ID, characterId?: string) {
  const params = characterId ? `?characterId=${encodeURIComponent(characterId)}` : "";
  return apiFetch<{ relationships: CharacterRelationship[] }>(`/projects/${projectId}/character-relationships${params}`);
}

export function getFactions(projectId = DEFAULT_PROJECT_ID) {
  return apiFetch<{ factions: Faction[] }>(`/projects/${projectId}/factions`);
}

export function getWorldNotes(projectId = DEFAULT_PROJECT_ID) {
  return apiFetch<{ notes: WorldNote[] }>(`/projects/${projectId}/world-notes`);
}

export function getDocuments(projectId = DEFAULT_PROJECT_ID) {
  return apiFetch<{ documents: DocumentItem[] }>(`/projects/${projectId}/documents`);
}

export function getTimelineEvents(projectId = DEFAULT_PROJECT_ID) {
  return apiFetch<{ events: TimelineEvent[] }>(`/projects/${projectId}/timeline-events`);
}

export function getMe() {
  return apiFetch<{ user: UserProfile }>("/me");
}

export function getPreferences() {
  return apiFetch<{ preferences: UserPreferences }>("/me/preferences");
}

export function getNotifications() {
  return apiFetch<{ notifications: NotificationSettings }>("/me/notifications");
}
