export function SpecsSection() {
  const specs = [
    { criterion: 'Chất Liệu', value: 'Titanium Grade 5 (Ti-6Al-4V)' },
    { criterion: 'Trọng Lượng', value: '3.5 - 4.2g (tùy theo size)' },
    { criterion: 'Kích Thước Hiển Thị', value: 'OLED 0.67\" cảm ứng' },
    { criterion: 'Pin', value: 'Pin LiPo 450mAh, tồn tại 7 ngày' },
    { criterion: 'Sạc', value: 'USB-C, sạc đầy 30 phút' },
    { criterion: 'Khả Năng Chống Nước', value: '5ATM (50m)', highlight: true },
    { criterion: 'Bluetooth', value: 'Bluetooth 5.2, BLE' },
    { criterion: 'Cảm Biến Sức Khỏe', value: 'Heart Rate, SpO2, Temp, BP' },
    { criterion: 'Hệ Điều Hành Tương Thích', value: 'iOS 15+, Android 11+' },
    { criterion: 'Tính Năng', value: 'Sleep Tracking, Workout, Notifications' },
    { criterion: 'Bảo Hành', value: '2 năm từ ngày mua, toàn cầu' },
    { criterion: 'Độ Bền', value: 'Kính Gorilla Glass Gen 6, khả chịu va đập' },
  ]

  return (
    <section id="specs" className="relative py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Thông Số Kỹ Thuật
          </h2>
          <p className="text-lg text-foreground/60">
            Tìm hiểu chi tiết về công nghệ bên trong HELI RING
          </p>
        </div>

        {/* Specifications Table */}
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <table className="w-full">
            <tbody>
              {specs.map((spec, index) => (
                <tr
                  key={index}
                  className={`border-b border-border transition-colors ${
                    index % 2 === 0 ? 'bg-card' : 'bg-secondary/30'
                  } hover:bg-accent/5`}
                >
                  <td className="px-6 md:px-8 py-4">
                    <span className={`font-semibold ${spec.highlight ? 'text-accent' : 'text-foreground'}`}>
                      {spec.criterion}
                    </span>
                  </td>
                  <td className="px-6 md:px-8 py-4 text-right md:text-left text-foreground/70">
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Highlight Box */}
        <div className="mt-12 bg-gradient-to-r from-accent/10 to-accent/5 rounded-xl p-8 border border-accent/20">
          <h3 className="text-lg font-semibold text-foreground mb-4">✓ Đạt Chứng Chỉ</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['FDA Approved', 'CE Certified', 'IP67 Rated', 'RoHS Compliant'].map((cert) => (
              <div key={cert} className="flex items-center gap-2">
                <span className="text-lg text-accent">✓</span>
                <span className="text-sm text-foreground/70">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
