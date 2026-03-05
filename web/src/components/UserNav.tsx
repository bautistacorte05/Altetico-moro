'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { LogOut, User } from 'lucide-react'
import { User as AuthUser } from '@supabase/supabase-js'

export function UserNav({ user }: { user: AuthUser }) {
    const router = useRouter()
    const supabase = createClient()

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/login')
        router.refresh()
    }

    return (
        <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                <User className="w-4 h-4 text-moro-blue" />
                <span className="truncate max-w-[150px]">{user.email}</span>
            </div>
            <button
                onClick={handleSignOut}
                className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors border border-red-100"
            >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Salir</span>
            </button>
        </div>
    )
}
