import React, { useState } from 'react';
import { ArrowRight, Lock, Mail, User } from 'lucide-react';
import { TruthLensLogo } from './TruthLensLogo.tsx';
import { triggerHaptic } from '../utils/haptics.ts';

interface LoginViewProps {
  onLoginSuccess: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('aditya@example.com');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Aditya Verma');
  const [confirmPassword, setConfirmPassword] = useState('••••••••••••');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerHaptic('tap');
    setIsSubmitting(true);
    setTimeout(() => {
      triggerHaptic('success');
      setIsSubmitting(false);
      onLoginSuccess();
    }, 400);
  };

  const handleGoogleLogin = () => {
    triggerHaptic('tap');
    setIsSubmitting(true);
    setTimeout(() => {
      triggerHaptic('success');
      setIsSubmitting(false);
      onLoginSuccess();
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#FFFBF4] flex flex-col justify-center items-center p-4 sm:p-6 font-sans select-none">
      <div className="w-full max-w-md space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-3 flex flex-col items-center">
          <TruthLensLogo size="lg" />
          <p className="text-xs sm:text-sm font-sans text-[#565449] pt-1">
            {mode === 'login' ? 'Sign in to access your digital forensic workspace' : 'Create your account for media authenticity analysis'}
          </p>
        </div>

        {/* Main Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-8">
          {/* Google Auth Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-2xl bg-[#FFFBF4] hover:bg-[#D8CFBC]/20 border border-[#565449]/20 text-[#11120D] text-xs sm:text-sm font-semibold flex items-center justify-center gap-3 transition-all cursor-pointer shadow-2xs active:scale-[0.99]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#565449]/15" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-semibold text-[#565449] tracking-wider">
              <span className="bg-[#FFFBF4] px-3">or continue with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="text-xs font-semibold text-[#11120D] block mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#565449] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Aditya Verma"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#D8CFBC]/20 border border-[#565449]/20 rounded-xl text-xs sm:text-sm text-[#11120D] focus:outline-none focus:ring-1 focus:ring-[#11120D]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-[#11120D] block mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#565449] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@organization.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#D8CFBC]/20 border border-[#565449]/20 rounded-xl text-xs sm:text-sm text-[#11120D] focus:outline-none focus:ring-1 focus:ring-[#11120D]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#11120D]">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => alert('Password reset link sent to demo email.')}
                    className="text-[11px] text-[#565449] hover:text-[#11120D] transition-colors cursor-pointer"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#565449] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#D8CFBC]/20 border border-[#565449]/20 rounded-xl text-xs sm:text-sm text-[#11120D] focus:outline-none focus:ring-1 focus:ring-[#11120D]"
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="text-xs font-semibold text-[#11120D] block mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#565449] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-[#D8CFBC]/20 border border-[#565449]/20 rounded-xl text-xs sm:text-sm text-[#11120D] focus:outline-none focus:ring-1 focus:ring-[#11120D]"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl bg-[#11120D] hover:bg-[#11120D]/90 text-[#FFFBF4] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.99] mt-2"
            >
              <span>{isSubmitting ? 'Authenticating...' : mode === 'login' ? 'Sign In to TruthLens' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Toggle between login & signup */}
          <div className="mt-5 pt-4 border-t border-[#565449]/10 text-center text-xs text-[#565449]">
            {mode === 'login' ? (
              <span>
                Don&apos;t have an account?{' '}
                <button
                  onClick={() => {
                    triggerHaptic('tap');
                    setMode('signup');
                  }}
                  className="font-bold text-[#11120D] hover:underline cursor-pointer"
                >
                  Create account
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{' '}
                <button
                  onClick={() => {
                    triggerHaptic('tap');
                    setMode('login');
                  }}
                  className="font-bold text-[#11120D] hover:underline cursor-pointer"
                >
                  Sign in
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-[11px] text-[#565449]/70 space-y-1">
          <p>Protected by cryptographic integrity hashing &amp; zero-biometric retention policy.</p>
          <p>© 2026 TruthLens Forensics. Built for trusted media journalism.</p>
        </div>

      </div>
    </div>
  );
};
