export default async function handler(req, res) {
  const backendUrl = import.meta.env.VITE_URL;
  const targetUrl =
    backendUrl +
    req.url.replace("https://seven-winds-hja8.vercel.app/api/proxy/", "");
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

    if (response.ok) {
      const data = await response.json(); // Получаем данные как JSON
      res.status(response.status).json(data); // Отправляем на фронтенд
    } else {
      res.status(response.status).send(await response.text()); // Если не JSON, отправляем текст
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка при запросе к бэкенду" });
  }
}
