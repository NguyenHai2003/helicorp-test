import { google } from '@ai-sdk/google'
import { streamText } from 'ai'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const maxDuration = 30 
const systemPrompt = `
Bạn là một nhân viên tư vấn nhiệt tình và chuyên nghiệp của HELI RING - một chiếc nhẫn thông minh theo dõi sức khỏe cao cấp.
Nhiệm vụ của bạn là giải đáp các thắc mắc của khách hàng về sản phẩm này một cách ngắn gọn, súc tích và thân thiện.
Lưu ý quan trọng khi tư vấn:
- Ngôn ngữ: Tiếng Việt.
- Nếu không chắc chắn, hãy khuyên khách hàng liên hệ đội ngũ hỗ trợ qua form đăng ký trên website.
- Không bịa đặt thêm các tính năng không có thật. Giữ thái độ chuyên nghiệp, lịch sự.
Một số thông tin về sản phẩm HELI RING:
- Tính năng: Theo dõi nhịp tim liên tục, đo nồng độ oxy trong máu (SpO2), phân tích giấc ngủ.
- Thiết kế & Chất liệu: Chế tác từ Titanium cao cấp (nhẹ, bền, chống dị ứng).
- Pin: Thời lượng sử dụng lên đến 7 ngày cho 1 lần sạc.
- Chống nước: Đạt chuẩn 5ATM (an toàn khi đi mưa, rửa tay, bơi lội nhẹ).
- Đối tượng: Phù hợp cho những người quan tâm sức khỏe, thích công nghệ đeo thông minh, cần một thiết bị thời trang, nhỏ gọn thay thế cho đồng hồ thông minh.
`
export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    // Kiểm tra API Key
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return NextResponse.json(
        { error: 'Server chưa được cấu hình GOOGLE_GENERATIVE_AI_API_KEY' },
        { status: 500 }
      )
    }
    // Chuyển đổi từ UIMessage (client) sang CoreMessage (server)
    const coreMessages = messages.map((msg: any) => ({
      role: msg.role,
      content: msg.parts ? msg.parts.map((p: any) => p.text).join('\n') : (msg.content || ''),
    }))

    // Gọi Gemini API thông qua Vercel AI SDK
    const result = streamText({
      model: google('gemini-3-flash-preview'),
      system: systemPrompt,
      messages: coreMessages,
    })
    // Trả về stream trực tiếp
    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error('Lỗi khi gọi AI API:', error)
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi trong quá trình xử lý yêu cầu' },
      { status: 500 }
    )
  }
}
