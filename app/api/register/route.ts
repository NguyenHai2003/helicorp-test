import { NextResponse } from "next/server";
import { registrationSchema } from "@/lib/validation";
import { supabaseServer } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Validate data using Zod
    const validatedData = registrationSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        {
          message: "Dữ liệu không hợp lệ",
          errors: validatedData.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, phone, email } = validatedData.data;

    // 2. Perform tasks in parallel: Supabase Insert and Webhook Fetch
    const tasks: Promise<any>[] = [];

    // 2a. Supabase Insert
    if (supabaseServer) {
      const supabaseTask = (async () => {
        const { error } = await supabaseServer
          .from("registrations")
          .insert([{ full_name: name, phone, email }]);

        if (error) {
          console.error("Lỗi khi lưu vào Supabase registrations:", error);
        }
      })();
      tasks.push(supabaseTask);
    } else {
      console.warn(
        "Cảnh báo: Không tìm thấy SUPABASE_SERVICE_ROLE_KEY hoặc URL, bỏ qua lưu Supabase",
      );
    }

    // 2b. Webhook Fetch
    const webhookUrl = process.env.WEBHOOK_URL;
    if (webhookUrl) {
      const webhookTask = fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData.data),
      })
        .then(async (res) => {
          if (!res.ok)
            console.error("Lỗi khi gửi tới Webhook:", await res.text());
        })
        .catch((err) => console.error("Không thể kết nối tới Webhook:", err));

      tasks.push(webhookTask);
    } else {
      console.warn("Cảnh báo: Không tìm thấy process.env.WEBHOOK_URL");
    }

    // Execute all tasks
    await Promise.all(tasks);

    // 3. Return success response
    return NextResponse.json(
      { message: "Đăng ký thành công", data: validatedData.data },
      { status: 200 },
    );
  } catch (error) {
    console.error("Lỗi API Route /api/register:", error);
    return NextResponse.json(
      { message: "Đã xảy ra lỗi trên server" },
      { status: 500 },
    );
  }
}
