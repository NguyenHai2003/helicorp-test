"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { registrationSchema } from "@/lib/validation";
import { toast } from "sonner";
import { z } from "zod";

interface FormData {
  name: string;
  phone: string;
  email: string;
}

// Custom hooks for tracking behavior
function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
}

function useThrottle<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
) {
  const lastCallRef = useRef<number>(0);
  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCallRef.current >= delay) {
        lastCallRef.current = now;
        callback(...args);
      }
    },
    [callback, delay],
  );
}

export function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Batching tracking events
  const eventQueue = useRef<any[]>([]);

  const flushEvents = useCallback(async () => {
    if (eventQueue.current.length === 0) return;

    const eventsToSend = [...eventQueue.current];
    eventQueue.current = [];

    try {
      await fetch("/api/track-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ events: eventsToSend }),
      });
    } catch (err) {
      console.error("Failed to send tracking events:", err);
      // If failed, we could push back to queue, but keeping it simple for now
    }
  }, []);

  useEffect(() => {
    // Flush every 10 seconds
    const interval = setInterval(flushEvents, 10000);

    // Flush on page unload
    window.addEventListener("beforeunload", flushEvents);

    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", flushEvents);
      flushEvents(); // flush on unmount
    };
  }, [flushEvents]);

  // Tracking Click (Debounce)
  const handleFormClick = useDebounce(() => {
    eventQueue.current.push({
      event_type: "click",
      event_target: "registration_form",
      session_id: "anonymous", // You can replace with real session ID if available
    });
    toast.info("Đã ghi nhận hành vi: Click vào khu vực đăng ký (Gom cụm)", {
      duration: 2000,
      id: "track-click",
    });
    console.log("User Behavior: Clicked on registration form");
  }, 1000);

  // Tracking Scroll (Throttle)
  const handleScroll = useThrottle(() => {
    eventQueue.current.push({
      event_type: "scroll",
      event_target: "page",
      session_id: "anonymous",
    });
    toast.info("Đã ghi nhận hành vi: Cuộn trang (Gom cụm)", {
      duration: 2000,
      id: "track-scroll",
    });
    console.log("User Behavior: Scrolled page");
  }, 2000);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const validateForm = (): boolean => {
    const validatedData = registrationSchema.safeParse(formData);

    if (!validatedData.success) {
      setErrors(validatedData.error.flatten().fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: [],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Vui lòng kiểm tra lại thông tin đăng ký");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors);
        }
        throw new Error(result.message || "Có lỗi xảy ra khi gửi đăng ký");
      }

      setSubmitted(true);
      setFormData({ name: "", phone: "", email: "" });
      toast.success("Đăng ký thành công!");

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="register"
      className="relative py-20 md:py-32 bg-secondary/20"
      onClick={handleFormClick}
    >
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
                Chúng tôi sẽ gửi thông tin chi tiết đến email của bạn trong vòng
                24 giờ.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
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
                    errors.name && errors.name.length > 0
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-border focus:border-accent focus:ring-2 focus:ring-accent/20"
                  } text-foreground placeholder-foreground/50 focus:outline-none`}
                />
                {errors.name && errors.name.length > 0 && (
                  <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name[0]}
                  </div>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-foreground mb-2"
                >
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
                    errors.phone && errors.phone.length > 0
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-border focus:border-accent focus:ring-2 focus:ring-accent/20"
                  } text-foreground placeholder-foreground/50 focus:outline-none`}
                />
                {errors.phone && errors.phone.length > 0 && (
                  <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.phone[0]}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
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
                    errors.email && errors.email.length > 0
                      ? "border-red-500 focus:ring-2 focus:ring-red-200"
                      : "border-border focus:border-accent focus:ring-2 focus:ring-accent/20"
                  } text-foreground placeholder-foreground/50 focus:outline-none`}
                />
                {errors.email && errors.email.length > 0 && (
                  <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email[0]}
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
                  "Đăng Ký Ngay"
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
  );
}
