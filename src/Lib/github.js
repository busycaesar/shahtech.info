const USERNAME = "busycaesar";

// GitHub only exposes pinned repos through GraphQL, which needs a token.
// This public service reads them from the profile page instead.
const PINNED_URL = `https://pinned.berrysauce.dev/get/${USERNAME}`;
const FALLBACK_URL = `https://api.github.com/users/${USERNAME}/repos?sort=pushed&per_page=12`;

const fromPinned = (repo) => ({
  name: repo.name,
  description: repo.description,
  language: repo.language,
  languageColor: repo.languageColor,
  stars: repo.stars,
  url: `https://github.com/${repo.author}/${repo.name}`,
});

const fromRest = (repo) => ({
  name: repo.name,
  description: repo.description,
  language: repo.language,
  languageColor: null,
  stars: repo.stargazers_count,
  url: repo.html_url,
});

export const getPinnedRepos = async () => {
  try {
    const response = await fetch(PINNED_URL);
    if (!response.ok) throw new Error("Failed to fetch pinned repos");
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) return data.map(fromPinned);
  } catch (error) {
    console.log(error);
  }

  // Fallback: most recently pushed repos that aren't forks.
  try {
    const response = await fetch(FALLBACK_URL);
    if (!response.ok) throw new Error("Failed to fetch repos");
    const data = await response.json();
    return data
      .filter((repo) => !repo.fork && repo.name !== USERNAME)
      .slice(0, 6)
      .map(fromRest);
  } catch (error) {
    console.log(error);
    return [];
  }
};
