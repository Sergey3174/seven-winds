export default async function handler(req, res) {
  const backendUrl = import.meta.env.VITE_PROXY;
  const targetUrl = backendUrl + req.url.replace("/api/proxy", "");
  console.log("Target URL:", targetUrl);
  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        ...req.headers,
      },
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
    });

    if (response.ok) {
      const data = await response.json();
      res.status(response.status).json(data);
    } else {
      res.status(response.status).send(await response.text());
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка при запросе к бэкенду" });
  }
}
