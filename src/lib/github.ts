const GITHUB_ORG = ((import.meta.env.GITHUB_ORG as string) || 'ZenithVertex').trim();

export function getGitHubHeaders(token?: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

export async function fetchRepos() {
  const token = (import.meta.env.GITHUB_TOKEN as string | undefined) || undefined;
  const url = `https://api.github.com/orgs/${encodeURIComponent(GITHUB_ORG)}/repos?per_page=100&sort=updated`;
  const response = await fetch(url, {
    headers: getGitHubHeaders(token),
  } as any);

  if (!response.ok) {
    console.error(`GitHub API error: ${response.status} ${response.statusText}`);
    return [];
  }

  return response.json() as Promise<Record<string, unknown>[]>;
}

export { GITHUB_ORG };
