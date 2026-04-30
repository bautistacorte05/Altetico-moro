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

            const jerseyNumbers: Record<string, number> = {
                "Agustin Arcidiacono": 10,
                "Alvaro Charras": 11,
                "Bautista Corte": 5,
                "Claudio Di Bin": 9,
                "Elias Corte": 21,
                "Santiago Diaz": 22,
                "Santiago Nicolino": 77,
                "Matias Madariaga": 2,
                "Tadeo Charras": 6,
                "Ezequiel Madariaga": 4,
            }

            players = teamFiles.map((file, index) => {
                const name = path.parse(file).name.replace(/_/g, ' ')
                return {
                    id: index,
                    name: name,
                    jersey_number: jerseyNumbers[name] ?? index + 1,
                    position: "Jugador",
                    photo_url: `/images/team/${file}`
                }
            }).sort((a, b) => b.jersey_number - a.jersey_number)
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
