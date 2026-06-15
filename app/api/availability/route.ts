import { NextRequest, NextResponse } from "next/server";
import { getBusySlots } from "@/lib/google-calendar";

// GET /api/availability?date=YYYY-MM-DD
export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "date inválida" }, { status: 400 });
  }

  // Dias fechados: domingo (0) e segunda (1)
  const dow = new Date(date + "T12:00:00").getDay();
  if (dow === 0 || dow === 1) {
    return NextResponse.json({ busy: [], closed: true });
  }

  try {
    const busy = await getBusySlots(date);
    return NextResponse.json({ busy, closed: false }, {
      headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" },
    });
  } catch (err) {
    console.error("[availability]", err);
    // Graceful degradation: retorna vazio para não quebrar a UI
    return NextResponse.json({ busy: [], closed: false, error: "calendar_unavailable" });
  }
}
