import type { Country } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:3001';

async function handleResponse<T>(r: Response): Promise<T> {
  if (!r.ok) throw new Error(`${r.status}`);
  return r.json() as Promise<T>;
}

export function fetchCountries(signal: AbortSignal): Promise<Country[]> {
  return fetch(`${API_BASE}/api/countries`, { signal }).then(handleResponse<Country[]>);
}

export function fetchCountry(slug: string, signal: AbortSignal): Promise<Country> {
  return fetch(`${API_BASE}/api/countries/${slug}`, { signal }).then(handleResponse<Country>);
}
