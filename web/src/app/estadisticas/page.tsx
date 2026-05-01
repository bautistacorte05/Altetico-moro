import { Trophy, Goal, Award, Flag, UserCheck } from 'lucide-react'

const STRIKERS: { name: string, value: number }[] = [
    { name: "Alvaro Charras", value: 1 },
    { name: "Ruso", value: 1 },
    { name: "Elias Corte", value: 1 },
    { name: "Matias Madariaga", value: 1 },
    { name: "Moto", value: 1 },
    { name: "Bautista Corte", value: 1 },
    { name: "Claudio Di Bin", value: 1 },
];
const ASSISTS: { name: string, value: number }[] = [
    { name: "Alvaro Charras", value: 1 },
    { name: "Moto", value: 1 },
    { name: "Santiago Nicolino", value: 1 },
    { name: "Bautista Giorgia", value: 1 },
];
const YELLOW_CARDS: { name: string, value: number }[] = [];
const RED_CARDS: { name: string, value: number }[] = [];
const MATCHES_PLAYED: { name: string, value: number }[] = [];

// PAST TOURNAMENT DATA
const PAST_TOURNAMENT_STRIKERS = [
    { name: "Moto", value: 2 }
];
const PAST_TOURNAMENT_ASSISTS = [
    { name: "Bautista Corte", value: 2 }
];

export const metadata = {
    title: 'Estadísticas | Atlético Moro',
    description: 'Estadísticas oficiales del plantel de Atlético Moro.',
}

function StatTable({ title, data, icon: Icon, colorClass, highlightTop = true }: any) {
    // Sort data by value, descending
    const sortedData = [...data].sort((a, b) => b.value - a.value);

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden h-full">
            <div className={`p-4 flex items-center gap-3 border-b border-gray-100 ${colorClass}`}>
                <Icon className="w-6 h-6" />
                <h3 className="font-bold text-lg">{title}</h3>
            </div>
            <div className="p-0">
                <ul className="divide-y divide-gray-50">
                    {sortedData.length > 0 ? (
                        sortedData.map((item, index) => (
                            <li key={index} className={`flex items-center justify-between p-4 ${index === 0 && highlightTop && item.value > 0 ? 'bg-amber-50/50' : 'hover:bg-gray-50'} transition-colors`}>
                                <div className="flex items-center gap-4">
                                    <span className={`font-black text-lg ${index === 0 && highlightTop && item.value > 0 ? 'text-amber-500' : 'text-gray-400'}`}>
                                        {index + 1}
                                    </span>
                                    <span className="font-medium text-gray-900">{item.name}</span>
                                </div>
                                <div className="font-bold text-lg text-gray-700">
                                    {item.value}
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="p-6 text-center text-gray-500 text-sm">Sin registros.</li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default function EstadisticasPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">

                {/* Header Section */}
                <div className="text-center md:text-left mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-moro-blue mb-4 tracking-tight uppercase">
                        ESTADÍSTICAS OFICIALES
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl">
                        Rendimiento, goles y tarjetas del plantel durante el torneo. Actualizado partido a partido.
                    </p>
                </div>

                {/* Top Performers Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <StatTable
                        title="Goleadores"
                        data={STRIKERS}
                        icon={Goal}
                        colorClass="bg-green-50 text-green-700"
                    />
                    <StatTable
                        title="Asistencias"
                        data={ASSISTS}
                        icon={Award}
                        colorClass="bg-blue-50 text-blue-700"
                    />
                </div>

                {/* Discipline and Attendance Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <StatTable
                        title="Tarjetas Amarillas"
                        data={YELLOW_CARDS}
                        icon={Flag}
                        colorClass="bg-yellow-50 text-yellow-700"
                        highlightTop={false}
                    />
                    <StatTable
                        title="Tarjetas Rojas"
                        data={RED_CARDS}
                        icon={Flag}
                        colorClass="bg-red-50 text-red-700"
                        highlightTop={false}
                    />
                    <StatTable
                        title="Partidos Jugados"
                        data={MATCHES_PLAYED}
                        icon={UserCheck}
                        colorClass="bg-moro-blue/10 text-moro-blue"
                        highlightTop={false}
                    />
                </div>

                {/* Past Tournament Section */}
                <div className="mt-16 border-t border-gray-200 pt-16">
                    <div className="text-center md:text-left mb-8">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight uppercase">
                            HISTORIAL: TORNEO PASADO
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl">
                            Estadísticas destacadas de participaciones anteriores.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <StatTable
                            title="Goleadores"
                            data={PAST_TOURNAMENT_STRIKERS}
                            icon={Goal}
                            colorClass="bg-gray-100 text-gray-700"
                        />
                        <StatTable
                            title="Asistencias"
                            data={PAST_TOURNAMENT_ASSISTS}
                            icon={Award}
                            colorClass="bg-gray-100 text-gray-700"
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}
