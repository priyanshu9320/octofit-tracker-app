const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export async function fetchApi(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API fetch failed: ${response.status}`);
  }
  return response.json();
}
