async function fetchAsync(uri, opts = {}) {
  const api = import.meta.env.VITE_API_URL;
  try {
    const response = await fetch(api + uri, opts);
    const jsonData = await response.json();
    if (!response.ok) {
      const err = new Error(jsonData);
      err.status = response.status;
      throw err;
    }

    return jsonData;
  } catch (err) {
    err.message = "An error occured when fetching data.";
    return err;
  }
}

export default fetchAsync;
