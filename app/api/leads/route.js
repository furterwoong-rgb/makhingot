export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (!data?.name || !data?.phone || !data?.grade || !data?.consent) {
    return Response.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  const entry = {
    received_at: new Date().toISOString(),
    name: data.name,
    phone: data.phone,
    grade: data.grade,
    where: data.where || "",
    pain: data.pain || "",
  };

  const webhookUrl = process.env.LEADS_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
      if (!res.ok) throw new Error(`webhook responded ${res.status}`);
    } catch (err) {
      // Webhook failed — still log server-side so nothing is silently lost,
      // but tell the client it didn't go through so they can retry.
      console.error("leads webhook failed", err, entry);
      return Response.json({ ok: false, error: "webhook_failed" }, { status: 502 });
    }
  } else {
    // No webhook configured yet — this shows up in Vercel's function logs.
    // Set LEADS_WEBHOOK_URL in the project's Environment Variables once
    // the Google Sheets Apps Script (or any other endpoint) is ready.
    console.log("new lead (no webhook configured):", entry);
  }

  return Response.json({ ok: true });
}
