import Image from 'next/image'

interface PlayerCardProps {
    player: {
        name: string
        jersey_number: number
        position: string
        photo_url?: string | null
    }
}

export function PlayerCard({ player }: PlayerCardProps) {
    // Use local placeholder images if photo_url is not set or use standard placeholder
    // Check if photo_url is a filename (like 'player1.jpg') or a full URL
    const getImageSrc = (url?: string | null) => {
        if (!url) return "https://placehold.co/300x400/blue/white?text=Jugador"
        if (url.startsWith('http') || url.startsWith('/')) return encodeURI(url)
        // Assuming local images in /images/
        return `/images/${encodeURI(url)}`
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="relative aspect-[3/4] bg-gray-100">
                <Image
                    src={getImageSrc(player.photo_url)}
                    alt={player.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-0 right-0 p-3">
                    <div className="bg-white/90 backdrop-blur text-moro-blue font-black text-xl w-10 h-10 flex items-center justify-center rounded-full shadow-lg border-2 border-moro-blue">
                        {player.jersey_number}
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-4 relative">
                <h3 className="font-bold text-lg text-gray-900 truncate">{player.name}</h3>
                <p className="text-moro-red font-medium text-sm uppercase tracking-wide">{player.position}</p>
            </div>
        </div>
    )
}
