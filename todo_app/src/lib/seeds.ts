import seedData from '../../seed.json';

export type SeedFlags = typeof seedData;

export interface SeedConfig {
  mode: 'lite' | 'full';
  home?: Record<string, boolean>;
  auth?: Record<string, boolean>;
  tasks?: Record<string, boolean>;
  task?: Record<string, boolean>;
  projects?: Record<string, boolean>;
  calendar?: Record<string, boolean>;
  search?: Record<string, boolean>;
  settings?: Record<string, boolean>;
  onboarding?: Record<string, boolean>;
}

let runtimeSeeds: SeedConfig | null = null;

export function getSeedConfig(): SeedConfig {
  if (runtimeSeeds) {
    return runtimeSeeds;
  }
  return seedData as SeedConfig;
}

export function setSeedConfig(config: SeedConfig): void {
  runtimeSeeds = config;
}

export function isSeedEnabled(page: string, flag: string): boolean {
  const config = getSeedConfig();
  const pageSeeds = config[page as keyof Omit<SeedConfig, 'mode'>] as Record<string, boolean> | undefined;
  return pageSeeds?.[flag] === true;
}

export function getAllSeeds(): SeedConfig {
  return getSeedConfig();
}

export function updateSeeds(updates: Partial<SeedConfig>): SeedConfig {
  const current = getSeedConfig();
  const updated = { ...current, ...updates };
  runtimeSeeds = updated;
  return updated;
}
