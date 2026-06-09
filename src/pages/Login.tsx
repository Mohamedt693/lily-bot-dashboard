import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { loginSchema, type LoginFormData } from '../schemas/auth.schema';
import { ZodError } from 'zod';
import { Loader2, Lock, User } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState<LoginFormData>({ username: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const validatedData = loginSchema.parse(formData);
      setIsSubmitting(true);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'بيانات الدخول غير صحيحة');
      }

      const token = data.data?.token || data.token;
      login(token, { id: '001', username: validatedData.username });
      
      navigate(from, { replace: true });

    } catch (err: unknown) {
      if (err instanceof ZodError) {
        setError(err.issues[0].message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('حدث خطأ غير متوقع، يرجى المحاولة لاحقاً');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm space-y-6">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 font-bold text-xl border border-emerald-100">
            LC
          </div>
          <h2 className="text-xl font-bold text-zinc-900">Admin Portal</h2>
        </div>

        {error && (
          <div className="p-3 text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-100 rounded-lg text-center animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-3 text-zinc-400" size={16} />
            <input
              type="text"
              placeholder="Username"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 py-2.5 text-sm focus:border-emerald-500 transition-all outline-none"
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-zinc-400" size={16} />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl pl-10 py-2.5 text-sm focus:border-emerald-500 transition-all outline-none"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button
            disabled={isSubmitting}
            className="w-full bg-zinc-900 text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-zinc-800 transition cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? <Loader2 className="animate-spin mx-auto" size={16} /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}