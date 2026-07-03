'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggleTheme = () => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode)
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  if (!mounted) return null

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/HeLiCorp.png.webp" alt="HELICORP Logo" className="h-10 w-auto object-contain dark:invert-0 invert" />
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-foreground/70 hover:text-accent transition-colors">
            Tính năng
          </a>
          <a href="#specs" className="text-sm text-foreground/70 hover:text-accent transition-colors">
            Thông số
          </a>
          <a href="#sizing" className="text-sm text-foreground/70 hover:text-accent transition-colors">
            Hướng dẫn size
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-accent" />
            ) : (
              <Moon className="w-5 h-5 text-foreground/70" />
            )}
          </button>
          <a href="#register" className="hidden sm:inline-flex">
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Đăng ký
            </Button>
          </a>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-foreground/70" />
            ) : (
              <Menu className="w-5 h-5 text-foreground/70" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background absolute w-full shadow-lg">
          <nav className="flex flex-col px-4 py-4 space-y-4">
            <a 
              href="#features" 
              className="text-sm font-medium text-foreground/70 hover:text-accent transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tính năng
            </a>
            <a 
              href="#specs" 
              className="text-sm font-medium text-foreground/70 hover:text-accent transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Thông số
            </a>
            <a 
              href="#sizing" 
              className="text-sm font-medium text-foreground/70 hover:text-accent transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Hướng dẫn size
            </a>
            <a 
              href="#register" 
              className="text-sm font-medium text-accent sm:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Đăng ký
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
