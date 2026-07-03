import { NextResponse } from "next/server";
import { registrationSchema } from "@/lib/validation";

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

    // 2. Send to real Webhook
    const webhookUrl = process.env.WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(validatedData.data),
        });

        if (!response.ok) {
          console.error("Lỗi khi gửi tới Webhook:", await response.text());
          // We can choose to fail the request or just log it. We'll proceed as success but log error.
        }
      } catch (webhookError) {
        console.error("Không thể kết nối tới Webhook:", webhookError);
      }
    } else {
      console.warn("Cảnh báo: Không tìm thấy process.env.WEBHOOK_URL");
    }

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
