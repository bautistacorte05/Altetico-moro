'use client'

import { useState, useEffect } from 'react'
import { Users } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export function SociosCounter() {
    const [count, setCount] = useState<number | null>(null)
    const [isMember, setIsMember] = useState(false)
    const [loading, setLoading] = useState(false)

    const supabase = createClient()

    // Load the count from Supabase and localStorage on mount
    useEffect(() => {
        const fetchCount = async () => {
            const { data } = await supabase
                .from('membership_stats')
                .select('active_count')
                .single()
            if (data) setCount(data.active_count)
        }
        fetchCount()

        const savedIsMember = localStorage.getItem('isMember') === 'true'
        setIsMember(savedIsMember)
    }, [])

    const handleBecomeMember = async () => {
        console.log('--- handleBecomeMember CLICKED ---');
        console.log('Current state: isMember=', isMember, 'loading=', loading);

        if (!isMember && !loading) {
            setLoading(true)
            console.log('Calling Supabase RPC increment_membership_count...');
            // Increment using atomic RPC function (no race condition)
            const { data: newCount, error } = await supabase
                .rpc('increment_membership_count')

            console.log('RPC Response:', { newCount, error });

            if (!error && newCount !== null) {
                console.log('Success! Updating local state to count:', newCount);
                setCount(newCount)
                setIsMember(true)
                localStorage.setItem('isMember', 'true')
            } else {
                console.error('Error incrementing membership count:', error)
            }
            setLoading(false)
            console.log('Loading set to false');
        } else {
            console.log('Action ignored: User is already member or loading is in progress.');
        }
    }

    return (
        <div className="bg-gradient-to-br from-moro-blue to-blue-900 text-white p-6 rounded-2xl shadow-lg min-w-[200px] text-center transform hover:scale-105 transition-transform duration-300">
            <Users className="w-8 h-8 mx-auto mb-2 text-blue-200" />
            <div className="text-4xl font-black mb-1">
                {count !== null ? count.toLocaleString() : '...'}
            </div>
            <div className="text-blue-100 text-sm font-medium mb-3">Socios Activos</div>

            <button
                onClick={handleBecomeMember}
                disabled={isMember || loading}
                className={`text-xs px-4 py-2 rounded-full font-bold transition-all ${isMember
                    ? 'bg-green-500 text-white'
                    : loading
                        ? 'bg-gray-300 text-gray-500'
                        : 'bg-white text-moro-blue hover:bg-gray-100'
                    }`}
            >
                {isMember ? '¡Ya sos socio!' : loading ? 'Guardando...' : '¡Hacerme Socio!'}
            </button>
        </div>
    )
}
