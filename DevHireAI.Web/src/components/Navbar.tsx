import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles, 
  BookOpen, 
  FileText, 
  HelpCircle 
} from 'lucide-react';

interface NavbarProps {
  onLoginClick?: () => void;
  onGetStartedClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onGetStartedClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-200 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs' 
        : 'bg-white border-b border-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Left: Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              DevHire<span className="text-blue-600">AI</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <a 
              href="#home" 
              className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Home
            </a>
            <a 
              href="#features" 
              className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Features
            </a>
            <a 
              href="#for-developers" 
              className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-50 transition-colors"
            >
              For Developers
            </a>
            <a 
              href="#for-recruiters" 
              className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-50 transition-colors"
            >
              For Recruiters
            </a>
            <a 
              href="#pricing" 
              className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Pricing
            </a>

            {/* Resources Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setResourcesOpen(!resourcesOpen)}
                onBlur={() => setTimeout(() => setResourcesOpen(false), 200)}
                className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 rounded-lg hover:bg-slate-50 transition-colors inline-flex items-center gap-1"
              >
                Resources
                <ChevronDown className={`w-4 h-4 transition-transform ${resourcesOpen ? 'rotate-180 text-blue-600' : ''}`} />
              </button>

              {resourcesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <a href="#how-it-works" className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    How It Works
                  </a>
                  <a href="#documentation" className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                    <FileText className="w-4 h-4 text-blue-600" />
                    API Documentation
                  </a>
                  <a href="#guides" className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    Career Guides
                  </a>
                  <a href="#help" className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg transition-colors">
                    <HelpCircle className="w-4 h-4 text-blue-600" />
                    Help & Support
                  </a>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button 
              onClick={onLoginClick}
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
            >
              Login
            </button>

            <button 
              onClick={onGetStartedClick}
              className="px-4.5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs shadow-blue-600/25 transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              Get Started Free
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            <a href="#home" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Home</a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Features</a>
            <a href="#for-developers" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg">For Developers</a>
            <a href="#for-recruiters" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg">For Recruiters</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Pricing</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg">How It Works</a>
          </div>
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <button onClick={() => { setMobileMenuOpen(false); onLoginClick?.(); }} className="w-full py-2.5 text-center font-medium text-slate-700 border border-slate-200 rounded-xl">Login</button>
            <button onClick={() => { setMobileMenuOpen(false); onGetStartedClick?.(); }} className="w-full py-2.5 text-center font-semibold text-white bg-blue-600 rounded-xl shadow-xs">Get Started Free</button>
          </div>
        </div>
      )}
    </header>
  );
};
