async function request(path, options) {
  const baseUrl = process.env.EXPO_PUBLIC_API_URL;
  if (!baseUrl) {
    throw new Error('EXPO_PUBLIC_API_URL não está definida no .env');
  }

  const response = await fetch(`${baseUrl}/${path}`, options);
  if (!response.ok) {
    throw new Error(`Erro ${response.status} ao acessar ${path}`);
  }
  return response.json();
}

export const api = {
  get: (path) => request(path),
  create: (path, body) =>
    request(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }),
};