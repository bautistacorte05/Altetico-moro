import { Calendar, Clock, MapPin, Trophy } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface MatchCardProps {
    match: {
        opponent_name: string
        date: string
        location: string
        tournament: string
        result?: string | null
    }
}

export function MatchCard({ match }: MatchCardProps) {
    const date = new Date(match.date)

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group">
            <div className="bg-moro-blue p-4 flex justify-between items-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-moro-blue to-blue-900 opacity-90" />
                <h3 className="text-white font-bold text-lg relative z-10 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    {match.tournament}
                </h3>
                {match.result && (
                    <span className="relative z-10 bg-white/20 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-sm">
                        Finalizado
                    </span>
                )}
            </div>
            <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
                    <div className="text-center md:text-left">
                        <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider block mb-1">Local</span>
                        <span className="text-xl font-bold text-moro-blue">Atlético Moro</span>
                    </div>
                    <div className="flex flex-col items-center">
                        {match.result ? (
                            <span className="text-3xl font-black text-gray-800 tracking-widest">{match.result}</span>
                        ) : (
                            <span className="text-2xl font-bold text-gray-300">VS</span>
                        )}
                    </div>
                    <div className="text-center md:text-right">
                        <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider block mb-1">Visitante</span>
                        <span className="text-xl font-bold text-moro-red">{match.opponent_name}</span>
                    </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-gray-600">
                        <Calendar className="w-5 h-5 text-moro-red" />
                        <span className="capitalize font-medium">{format(date, "EEEE d 'de' MMMM", { locale: es })}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                        <Clock className="w-5 h-5 text-moro-blue" />
                        <span className="font-medium">{format(date, "HH:mm 'hs'", { locale: es })}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <span>{match.location}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
