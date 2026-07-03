'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

interface FeatureProps {
  index: number
}

function FeatureCard({ index }: FeatureProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = document.getElementById(`feature-${index}`)
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [index])

  const features = [
    {
      title: 'Theo Dõi Giấc Ngủ Chuyên Sâu',
      description: 'Phân tích chi tiết các giai đoạn giấc ngủ: REM, NREM, và sâu. Nhận khuyến nghị cá nhân hóa để cải thiện chất lượng giấc ngủ của bạn mỗi đêm.',
      image: '/feature-sleep.png.webp',
      imagePosition: 'left',
    },
    {
      title: 'Đo Chỉ Số Sinh Tồn Liên Tục',
      description: 'Theo dõi nhịp tim, SpO2, nhiệt độ cơ thể và huyết áp 24/7. Ứng dụng thông minh cảnh báo bất thường tức thì cho sức khỏe tối ưu.',
      image: '/feature-vitals.png.webp',
      imagePosition: 'right',
    },
    {
      title: 'Chống Nước 5ATM & Pin 7 Ngày',
      description: 'Mang theo dưới nước đến độ sâu 50m. Pin tồn tại cả tuần, tránh cần sạc hàng ngày. Thiết kế nhẹ nhàng cho đeo thoải mái toàn thời gian.',
      image: '/feature-water.png.webp',
      imagePosition: 'left',
    },
  ]

  const feature = features[index]
  const isLeft = feature.imagePosition === 'left'

  return (
    <div
      id={`feature-${index}`}
      className={`opacity-0 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'translate-y-8'
      }`}
    >
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-20`}>
        {/* Image */}
        <div className={isLeft ? '' : 'md:order-last'}>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-accent/10 to-secondary/10">
            <Image
              src={feature.image}
              alt={feature.title}
              width={500}
              height={500}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              {feature.title}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-accent to-accent/50 rounded-full" />
          </div>

          <p className="text-lg text-foreground/60 leading-relaxed">
            {feature.description}
          </p>

          <ul className="space-y-3 pt-4">
            {index === 0 && (
              <>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-foreground/70">Phát hiện REM, NREM, giấc ngủ sâu</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-foreground/70">Báo cáo ngủ hàng tuần chi tiết</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-foreground/70">Gợi ý cải thiện thêm ngủ</span>
                </li>
              </>
            )}
            {index === 1 && (
              <>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-foreground/70">Kết nối Bluetooth 5.2 ổn định</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-foreground/70">Cảnh báo tức thời bất thường</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-foreground/70">Lịch sử dữ liệu 3 năm</span>
                </li>
              </>
            )}
            {index === 2 && (
              <>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-foreground/70">Titanium chống ăn mòn tuyệt đối</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-foreground/70">Trọng lượng chỉ 3.5g</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-foreground/70">Sạc nhanh 30 phút đầy 100%</span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Tính Năng Nổi Bật
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            HELI RING kết hợp công nghệ y tế tiên tiến với thiết kế sang trọng
          </p>
        </div>

        {/* Features */}
        <div className="space-y-20 md:space-y-32">
          <FeatureCard index={0} />
          <FeatureCard index={1} />
          <FeatureCard index={2} />
        </div>
      </div>
    </section>
  )
}
