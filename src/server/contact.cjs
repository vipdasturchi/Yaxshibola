import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "Maydonlar to'liq emas" });
    }

    const BOT_TOKEN = process.env.TG_BOT_TOKEN;
    const CHAT_ID = process.env.TG_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      return res.status(500).json({ message: "TG sozlamalari yo'q" });
    }

    const text =
      `📩 Yangi xabar!\n\n` +
      `👤 Ism: ${name}\n` +
      `📧 Email: ${email}\n` +
      `🎯 Maqsad: ${subject}\n\n` +
      `📝 Xabar:\n${message}`;

    const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    });

    if (!tgRes.ok) {
      const err = await tgRes.text();
      return res.status(500).json({ message: "Telegram xatosi: " + err });
    }

    return res.json({ ok: true });
  } catch (e) {
    return res.status(500).json({ message: "Server xatosi" });
  }
});

app.listen(5050, () => console.log("Server running on http://localhost:5050"));
