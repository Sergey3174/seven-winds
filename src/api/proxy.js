export default async function handler(req, res) {
  const backendUrl = import.meta.env.VITE_URL;
  const targetUrl = backendUrl + req.url.replace("/api/proxy", "");
  console.log(targetUrl);
  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        ...req.headers,
      },
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
    });

    res.status.send(response);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при запросе к бэкенду" });
  }
}
