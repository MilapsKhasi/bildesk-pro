
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import Logo from '../components/Logo';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      if (isLogin) {
        const { error, data } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        // Immediate navigation if session is active
        if (data.session) {
          navigate('/companies', { replace: true });
        }
      } else {
        const { error, data } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: {
              name: email.split('@')[0] // Basic default name
            }
          }
        });
        
        if (error) throw error;
        
        // When 'Confirm Email' is disabled in Supabase dashboard, 
        // a session is returned immediately.
        if (data.session) {
          navigate('/companies', { replace: true });
        } else {
          setSuccessMsg('Account created successfully! You can now log in.');
          setIsLogin(true);
          setPassword(''); // Clear password for security after registration
        }
      }
    } catch (err: any) {
      // Clean up common error messages if needed, but display primary error
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-sm bg-[#ffea79] rounded-[15px] p-2 animate-in zoom-in-95 duration-700 border border-slate-200/20 shadow-none">
        
        <div className="flex flex-col items-center py-8">
          <Logo size={64} className="mb-4" />
          <h2 className="text-2xl font-semibold text-slate-900">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
        </div>

        <div className="bg-white rounded-[12px] p-6 pb-10 shadow-none border border-slate-100">
          <form onSubmit={handleAuth} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-[11px] rounded-[8px] font-semibold text-center animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}

            {successMsg && (
              <div className="p-3 bg-green-50 border border-green-100 text-green-600 text-[11px] rounded-[8px] font-semibold text-center animate-in fade-in slide-in-from-top-1">
                {successMsg}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-[#f9f9f9] border border-slate-200 rounded-[10px] outline-none focus:border-slate-400 font-medium text-slate-900 transition-all placeholder:text-slate-300 text-sm shadow-none"
                    placeholder="Your Email Address"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 tracking-wider">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-[#f9f9f9] border border-slate-200 rounded-[10px] outline-none focus:border-slate-400 font-medium text-slate-900 transition-all placeholder:text-slate-300 text-sm shadow-none"
                    placeholder="Your Password"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-[10px] font-bold bg-[#ffea79] text-slate-900 hover:bg-[#f0db69] transition-all flex items-center justify-center disabled:opacity-50 text-[11px] tracking-[0.15em] border border-transparent active:scale-[0.98] shadow-none uppercase"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : (isLogin ? 'SIGN IN' : 'REGISTER')} 
              </button>

              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="w-full text-center text-[10px] text-slate-400 font-medium"
              >
                {isLogin ? (
                  <>Don't have an account? <span className="text-[#38b6ff] font-bold uppercase ml-1">SIGN UP</span></>
                ) : (
                  <>Already have an account? <span className="text-[#38b6ff] font-bold uppercase ml-1">LOGIN</span></>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
