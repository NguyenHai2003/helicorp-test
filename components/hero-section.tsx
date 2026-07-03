'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-b from-background via-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                HELI RING
              </h1>
              <p className="text-xl md:text-2xl text-foreground/70 font-light">
                Sức Khỏe Trong Tầm Tay
              </p>
            </div>

            <p className="text-lg text-foreground/60 max-w-xl leading-relaxed">
              Thiết bị theo dõi nhịp sinh học và giấc ngủ cao cấp, bọc trong chất liệu Titanium siêu nhẹ. Kết nối liền mạch với ứng dụng di động của bạn để theo dõi sức khỏe toàn diện.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#register">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2 w-full sm:w-auto">
                  Đăng Ký Nhận Thông Tin
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <a href="#features">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-accent text-accent hover:bg-accent/5">
                  Khám Phá Tính Năng
                </Button>
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-col gap-3 pt-8 border-t border-border">
              <p className="text-sm text-foreground/50">Tin Cậy Bởi:</p>
              <div className="flex items-center gap-6">
                <span className="text-xs text-foreground/60">✓ Công Nghệ Tiên Tiến</span>
                <span className="text-xs text-foreground/60">✓ Chứng Chỉ Y Tế</span>
                <span className="text-xs text-foreground/60">✓ Bảo Hành 2 Năm</span>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative h-96 md:h-full min-h-96 animate-fade-in-down">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent/5 rounded-3xl blur-3xl" />
            <div className="relative h-full flex items-center justify-center">
              <Image
                src="/heli-ring-hero.png.webp"
                alt="HELI RING Smart Health Tracking Ring"
                width={400}
                height={400}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                fetchPriority="high"
                className="w-full h-full object-contain drop-shadow-lg hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-accent rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
