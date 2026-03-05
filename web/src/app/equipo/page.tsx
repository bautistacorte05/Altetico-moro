import { PlayerCard } from '@/components/PlayerCard'
import fs from 'fs'
import path from 'path'
import { Users } from 'lucide-react'

export default function TeamPage() {
    const teamDir = path.join(process.cwd(), 'public', 'images', 'team')
    let players: any[] = []

    try {
        if (fs.existsSync(teamDir)) {
            const teamFiles = fs.readdirSync(teamDir)
                .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))

            players = teamFiles.map((file, index) => {
                const name = path.parse(file).name.replace(/_/g, ' ')
                return {
                    id: index,
                    name: name,
                    jersey_number: index + 1, // Mock number
                    position: "Jugador", // Generic position
                    photo_url: `/images/team/${file}`
                }
            })
        }
    } catch (e) {
        console.error("Error reading team images:", e)
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-10">
            {/* Header */}
            <div className="bg-moro-blue text-white py-12 mb-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Users className="w-12 h-12 mx-auto mb-4 text-moro-red" />
                    <h1 className="text-4xl font-black mb-2 tracking-tight">Plantel Completo</h1>
                    <p className="text-blue-200 text-lg max-w-2xl mx-auto">
                        Conoce a los jugadores que defienden nuestros colores en cada partido.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {players.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {players.map((player) => (
                            <PlayerCard key={player.id} player={player} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-500">
                        No se encontraron jugadores.
                    </div>
                )}
            </div>
        </div>
    )
}
