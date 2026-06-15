import { google } from "googleapis";

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID!;

function getAuth() {
  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!credentials) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON não configurado");

  const key = JSON.parse(credentials);
  return new google.auth.GoogleAuth({
    credentials: key,
    scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
  });
}

export async function getBusySlots(date: string): Promise<string[]> {
  const auth = getAuth();
  const calendar = google.calendar({ version: "v3", auth });

  const dayStart = new Date(`${date}T00:00:00-03:00`);
  const dayEnd   = new Date(`${date}T23:59:59-03:00`);

  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin: dayStart.toISOString(),
      timeMax: dayEnd.toISOString(),
      timeZone: "America/Sao_Paulo",
      items: [{ id: CALENDAR_ID }],
    },
  });

  const busy = res.data.calendars?.[CALENDAR_ID]?.busy ?? [];
  const ALL_SLOTS = ["08:00","09:00","10:00","11:00","13:00","14:00","15:00","16:00","17:00"];

  return ALL_SLOTS.filter((slot) => {
    const [h, m] = slot.split(":").map(Number);
    const slotStart = new Date(`${date}T${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:00-03:00`);
    const slotEnd   = new Date(slotStart.getTime() + 60 * 60 * 1000);

    return busy.some((b) => {
      const bs = new Date(b.start!);
      const be = new Date(b.end!);
      return slotStart < be && slotEnd > bs;
    });
  });
}
