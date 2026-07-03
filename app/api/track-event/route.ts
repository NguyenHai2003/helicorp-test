import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { events } = body;

    if (!events || !Array.isArray(events) || events.length === 0) {
      return NextResponse.json(
        { message: "No events provided" },
        { status: 400 },
      );
    }

    if (!supabaseServer) {
      console.warn(
        "Cảnh báo: Không tìm thấy SUPABASE_SERVICE_ROLE_KEY hoặc URL, bỏ qua lưu event",
      );
      return NextResponse.json({ message: "Skipped" }, { status: 200 });
    }

    // Insert multiple events into user_events table
    const { error } = await supabaseServer.from("user_events").insert(
      events.map((e: any) => ({
        event_type: e.event_type,
        event_target: e.event_target,
        session_id: e.session_id || "anonymous",
      })),
    );

    if (error) {
      console.error("Lỗi khi lưu user_events vào Supabase:", error);
      return NextResponse.json(
        { message: "Error saving events" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Events tracked successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Lỗi API Route /api/track-event:", error);
    return NextResponse.json(
      { message: "Đã xảy ra lỗi trên server" },
      { status: 500 },
    );
  }
}
