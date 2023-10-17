export function get(url: string) {
  return fetch(url);
}

export function post({
  url,
  body,
}: {
  url: string;
  body: Record<string, unknown>;
}) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
}
