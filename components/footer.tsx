export function Footer() {
  return (
    <footer className="bg-foreground/5 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/HeLiCorp.png.webp" alt="HELICORP Logo" className="h-10 w-auto object-contain dark:invert-0 invert" />
            </div>
            <p className="text-sm text-foreground/60">
              Công nghệ sức khỏe hàng đầu thế giới
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Sản Phẩm</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-sm text-foreground/60 hover:text-accent transition-colors">
                  Tính Năng
                </a>
              </li>
              <li>
                <a href="#specs" className="text-sm text-foreground/60 hover:text-accent transition-colors">
                  Thông Số
                </a>
              </li>
              <li>
                <a href="#sizing" className="text-sm text-foreground/60 hover:text-accent transition-colors">
                  Hướng Dẫn Size
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Công Ty</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-foreground/60 hover:text-accent transition-colors">
                  Về Chúng Tôi
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-foreground/60 hover:text-accent transition-colors">
                  Liên Hệ
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-foreground/60 hover:text-accent transition-colors">
                  Tin Tức
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Pháp Lý</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-foreground/60 hover:text-accent transition-colors">
                  Chính Sách Bảo Mật
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-foreground/60 hover:text-accent transition-colors">
                  Điều Khoản Dịch Vụ
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-foreground/60 hover:text-accent transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-foreground/50">
              © 2026 HELICORP
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-sm text-foreground/60 hover:text-accent transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-sm text-foreground/60 hover:text-accent transition-colors"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-sm text-foreground/60 hover:text-accent transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
