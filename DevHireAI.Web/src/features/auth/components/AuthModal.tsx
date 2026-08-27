import React, { useState, useEffect } from 'react';
import { 
  X, 
  Cpu, 
  Mail, 
  Lock, 
  User, 
  Briefcase, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { authService } from '../services/authService';
import { UserRole } from '../types/auth.types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.Candidate);
  const [agreeTerms, setAgreeTerms] = useState(false);

  useEffect(() => {
    setMode(initialMode);
    setErrorMessage(null);
    setSuccessMessage(null);
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (mode === 'signup' && !agreeTerms) {
      setErrorMessage('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }

    setLoading(true);

    try {
      if (mode === 'login') {
        const res = await authService.login({ email, password });
        setSuccessMessage(`Welcome back! Logged in as ${res.email}`);
        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        await authService.register({
          firstName,
          lastName,
          email,
          password,
          role,
        });
        setSuccessMessage('Registration successful! You can now log in.');
        setTimeout(() => {
          setMode('login');
          setSuccessMessage(null);
        }, 1500);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Outer Card Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT PANEL: Branding & Visuals (Hidden on small mobile) */}
        <div className="hidden md:flex md:col-span-5 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 p-8 text-white flex-col justify-between relative overflow-hidden">
          
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl pointer-events-none" />

          {/* Logo */}
          <div className="flex items-center gap-2.5 relative z-10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">
              DevHire<span className="text-blue-400">AI</span>
            </span>
          </div>

          {/* Feature Callouts */}
          <div className="space-y-6 relative z-10 py-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              AI Hiring Platform
            </div>

            <h3 className="text-2xl font-extrabold leading-tight text-white">
              {mode === 'login' 
                ? 'Welcome Back to Your Career Engine' 
                : 'Join 10,000+ Engineers & Hiring Teams'}
            </h3>

            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>98% Accuracy ATS Keyword Matcher</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1-Page "Interview Tomorrow" Prep Sheet</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Multi-Candidate Leaderboard Ranking</span>
              </li>
            </ul>
          </div>

          {/* Footer Badge */}
          <div className="text-[11px] text-slate-400 border-t border-slate-800 pt-4">
            Secure 256-bit encrypted authentication.
          </div>

        </div>

        {/* RIGHT PANEL: Form Controls */}
        <div className="col-span-12 md:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          
          {/* Top Mode Switcher Pills */}
          <div className="flex bg-slate-100 p-1 rounded-xl mb-6 border border-slate-200/80">
            <button
              onClick={() => { setMode('login'); setErrorMessage(null); }}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('signup'); setErrorMessage(null); }}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                mode === 'signup'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form Header */}
          <div className="mb-6 space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {mode === 'login' ? 'Sign in to DevHireAI' : 'Create your free account'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {mode === 'login'
                ? 'Enter your credentials to access your dashboard'
                : 'Get started in under 30 seconds'}
            </p>
          </div>

          {/* Feedback Banners */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2.5 px-3 border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2.5 px-3 border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <svg className="w-4 h-4 fill-slate-900" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              <span>GitHub</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider absolute">
              Or continue with email
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Registration Role Selector */}
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Select Your Account Role</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole(UserRole.Candidate)}
                    className={`p-2.5 border rounded-xl text-left transition-all ${
                      role === UserRole.Candidate
                        ? 'border-blue-600 bg-blue-50/70 text-blue-900'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold">
                      <User className="w-3.5 h-3.5 text-blue-600" />
                      Candidate
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">Job seeker / Engineer</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole(UserRole.Recruiter)}
                    className={`p-2.5 border rounded-xl text-left transition-all ${
                      role === UserRole.Recruiter
                        ? 'border-blue-600 bg-blue-50/70 text-blue-900'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold">
                      <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                      Recruiter
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">Hiring manager / Team</p>
                  </button>
                </div>
              </div>
            )}

            {/* Name Fields for Registration */}
            {mode === 'signup' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Alex"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Rivera"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Work or Personal Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">Password</label>
                {mode === 'login' && (
                  <a href="#forgot" className="text-[11px] font-bold text-blue-600 hover:underline">
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-9 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Registration Terms Checkbox */}
            {mode === 'signup' && (
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="terms" className="text-[11px] text-slate-600 leading-tight">
                  I agree to the <a href="#terms" className="text-blue-600 underline">Terms of Service</a> and <a href="#privacy" className="text-blue-600 underline">Privacy Policy</a>.
                </label>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-600/25 transition-all flex items-center justify-center gap-2 group mt-2"
            >
              <span>{loading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Free Account'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Bottom Switch Mode Callout */}
          <div className="mt-6 text-center text-xs text-slate-500">
            {mode === 'login' ? (
              <span>
                Don't have an account?{' '}
                <button
                  onClick={() => { setMode('signup'); setErrorMessage(null); }}
                  className="font-bold text-blue-600 hover:underline"
                >
                  Create one now
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button
                  onClick={() => { setMode('login'); setErrorMessage(null); }}
                  className="font-bold text-blue-600 hover:underline"
                >
                  Sign in
                </button>
              </span>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
