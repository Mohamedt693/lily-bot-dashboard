import { useAuth } from '../contexts/AuthContext';
import { LogOut } from 'lucide-react';

export default function LogoutButton({ className }: { className?: string }) {
    const { logout } = useAuth();

    return (
        <button
        onClick={logout}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${className}`}
        >
            <LogOut size={18} />
            <span>Logout</span>
        </button>
    );
}