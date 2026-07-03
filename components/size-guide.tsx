'use client'

import { useState } from 'react'

export function SizeGuide() {
  const [mm, setMm] = useState('')
  const [size, setSize] = useState<string | null>(null)

  const sizeChart = [
    { range: '46-49', size: '4' },
    { range: '50-52', size: '5' },
    { range: '53-56', size: '6' },
    { range: '57-60', size: '7' },
    { range: '61-64', size: '8' },
    { range: '65-67', size: '9' },
    { range: '68-71', size: '10' },
    { range: '72-75', size: '11' },
    { range: '76-79', size: '12' },
  ]

  const calculateSize = (value: string) => {
    const num = parseInt(value)
    if (isNaN(num)) {
      setSize(null)
      return
    }

    const found = sizeChart.find(({ range }) => {
      const [min, max] = range.split('-').map(Number)
      return num >= min && num <= max
    })

    setSize(found ? `Size ${found.size}` : 'Không xác định')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMm(value)
    calculateSize(value)
  }

  return (
    <section id="sizing" className="relative py-20 md:py-32 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Hướng Dẫn Chọn Size
          </h2>
          <p className="text-lg text-foreground/60">
            Đo vòng ngón tay của bạn bằng cm, sau đó chuyển sang mm
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Measurement Steps */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl p-8 border border-border hover:border-accent/50 transition-colors">
              <h3 className="text-lg font-semibold text-foreground mb-4">Các Bước Đo Kích Thước</h3>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Chuẩn Bị Dây Đo</p>
                    <p className="text-sm text-foreground/60">Sử dụng dây mềm hoặc sợi chỉ để đo vòng ngón tay</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Đo Vòng Ngón Tay</p>
                    <p className="text-sm text-foreground/60">Quấn dây xung quanh phần lớn nhất của ngón tay</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Ghi Lại Số Đo</p>
                    <p className="text-sm text-foreground/60">Đo độ dài dây bằng thước kẻ, ghi lại giá trị mm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Calculator */}
          <div className="bg-card rounded-xl p-8 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-6">Máy Tính Size Nhẫn</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nhập Số Đo (mm)
                </label>
                <input
                  type="number"
                  value={mm}
                  onChange={handleChange}
                  placeholder="Ví dụ: 60"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder-foreground/50 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                />
              </div>

              {size && (
                <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg p-6 border border-accent/20">
                  <p className="text-sm text-foreground/60 mb-2">Kích Thước Của Bạn:</p>
                  <p className="text-3xl font-bold text-accent">{size}</p>
                </div>
              )}

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-foreground/50 mb-4">Bảng Quy Đổi:</p>
                <div className="grid grid-cols-2 gap-2">
                  {sizeChart.map(({ range, size }) => (
                    <div
                      key={size}
                      className="text-xs bg-secondary/50 rounded p-2 text-center text-foreground/70"
                    >
                      <span className="font-semibold">{range}mm</span>
                      <span className="mx-1">→</span>
                      <span className="font-semibold">S{size}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
