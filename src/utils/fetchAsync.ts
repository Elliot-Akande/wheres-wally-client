async function fetchAsync<T extends {}>(
  uri: string,
  opts?: RequestInit
): Promise<T | Error> {
  const api = import.meta.env.VITE_API_URL;
  try {
    const response = await fetch(api + uri, opts);
    const jsonData = await response.json();
    if (!response.ok) {
      throw new Error();
    }

    return jsonData;
  } catch (err) {
    return new Error("An error occured when fetching data.");
  }
}

export default fetchAsync;
