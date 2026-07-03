'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

interface FormData {
  name: string
  phone: string
  email: string
}

interface FormErrors {
  name?: string
  phone?: string
  email?: string
}

export function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập tên'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại'
    } else if (!/^[0-9+\-\s()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSubmitted(true)
      setFormData({ name: '', phone: '', email: '' })

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="register" className="relative py-20 md:py-32 bg-secondary/20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Đăng Ký Nhận Thông Tin
            </h2>
            <p className="text-foreground/60">
              Nhận cập nhật sản phẩm mới, ưu đãi đặc biệt và bản demo sớm
            </p>
          </div>

          {submitted ? (
            <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg p-8 border border-accent/20 text-center">
              <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Cảm ơn bạn đã đăng ký!
              </h3>
              <p className="text-foreground/60">
                Chúng tôi sẽ gửi thông tin chi tiết đến email của bạn trong vòng 24 giờ.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Họ và Tên *
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nguyễn Văn A"
                  className={`w-full px-4 py-3 rounded-lg bg-background border transition-all ${
                    errors.name
                      ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-border focus:border-accent focus:ring-2 focus:ring-accent/20'
                  } text-foreground placeholder-foreground/50 focus:outline-none`}
                />
                {errors.name && (
                  <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </div>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Số Điện Thoại *
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+84 123 456 789"
                  className={`w-full px-4 py-3 rounded-lg bg-background border transition-all ${
                    errors.phone
                      ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-border focus:border-accent focus:ring-2 focus:ring-accent/20'
                  } text-foreground placeholder-foreground/50 focus:outline-none`}
                />
                {errors.phone && (
                  <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.phone}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className={`w-full px-4 py-3 rounded-lg bg-background border transition-all ${
                    errors.email
                      ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                      : 'border-border focus:border-accent focus:ring-2 focus:ring-accent/20'
                  } text-foreground placeholder-foreground/50 focus:outline-none`}
                />
                {errors.email && (
                  <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Đang Xử Lý...
                  </>
                ) : (
                  'Đăng Ký Ngay'
                )}
              </Button>

              <p className="text-center text-xs text-foreground/50">
                Chúng tôi respects your privacy. Không spam.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
