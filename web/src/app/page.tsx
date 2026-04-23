import Link from 'next/link'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'
import { Carousel } from '@/components/Carousel'
import { MatchCard } from '@/components/MatchCard'
import { PlayerCard } from '@/components/PlayerCard'


import { SociosCounter } from '@/components/SociosCounter'
import { Calendar as CalendarIcon, ArrowRight } from 'lucide-react'

export default async function Home() {
  // 1. Read Carousel Images
  const carouselDir = path.join(process.cwd(), 'public', 'images', 'carousel')
  let carouselImages: string[] = []

  try {
    if (fs.existsSync(carouselDir)) {
      carouselImages = fs.readdirSync(carouselDir)
        .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
        .map(file => `/images/carousel/${file}`)
    }
  } catch (e) {
    console.error("Error reading carousel images:", e)
  }

  // 2. Read Team Images to generate Players list
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

  // 3. Match History
  // Agregar aquí los resultados de cada sábado
  const matchHistory = [
    {
      opponent_name: "PSV Juvenil",
      date: "2026-02-21T12:20:00",
      result: "1 - 0"
    },
    {
      opponent_name: "Hacha y Magia",
      date: "2026-02-28T15:00:00",
      result: "1 - 1"
    },
    {
      opponent_name: "Funebrero",
      date: "2026-03-07T15:00:00",
      result: "1 - 2"
    },
    {
      opponent_name: "Bradford City",
      date: "2026-03-14T15:00:00",
      result: "1 - 1"
    },
    {
      opponent_name: "En una Baldosa",
      date: "2026-03-21T15:00:00",
      result: "2 - 1"
    },
    {
      opponent_name: "La 29",
      date: "2026-04-19T15:00:00",
      result: "1 - 0"
    }
  ]

  // 4. Static Next Match
  // Actualizar el rival y horario cada semana en esta variable
  const nextMatch = {
    opponent_name: "PSG",
    date: "2026-04-25T12:20:00",
    location: "Cancha 6",
    tournament: "Torneo El Campito",
    result: null
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 pb-10">

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <section className="relative bg-moro-red rounded-3xl p-8 md:p-12 shadow-xl border border-red-700 overflow-hidden text-center md:text-left mb-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-moro-blue/30 rounded-full blur-3xl -ml-16 -mb-16" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-white/80 font-bold tracking-wider uppercase text-sm mb-2 block">Torneo El Campito</span>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                Atlético Moro
              </h1>
              <p className="text-lg text-gray-100 leading-relaxed mb-6">
                Club fundado por miembros del colegio Santo Tomas Moro, dedicado a competir futbolísticamente con pasión y compromiso.
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-200 font-medium">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Temporada en curso
              </div>
            </div>

            {/* Socios Counter Component */}
            <SociosCounter />
          </div>
        </section>

        {/* Carousel Section */}
        {carouselImages.length > 0 && (
          <section className="rounded-3xl overflow-hidden shadow-xl mb-10">
            <Carousel images={carouselImages} />
          </section>
        )}

        {/* Matches Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Next Match */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Próximo Partido</h2>
            </div>
            {nextMatch ? (
              <MatchCard match={nextMatch} />
            ) : (
              <div className="bg-white p-8 rounded-xl border border-dashed border-gray-300 text-center text-gray-500">
                <CalendarIcon className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                No hay partidos programados próximamente.
              </div>
            )}
          </div>

          {/* Matches Schedule & History Column */}
          <div className="space-y-8 flex flex-col">
            {/* Matches Schedule */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Partidos</h2>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <ul className="space-y-4">
                  {[
                    { time: "12:20hs" },
                    { time: "13:10hs" },
                    { time: "15:00hs" }
                  ].map((match, index) => (
                    <li key={index} className="flex items-start gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                      <div className="bg-moro-red/10 text-moro-red p-2 rounded-lg font-bold min-w-[60px] text-center">
                        Sáb
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">
                          {match.time}
                        </div>
                        <div className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                          <MapPinIcon className="w-3 h-3" />
                          Cancha 2
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Match History */}
            <div className="space-y-4 flex-1">
              <h2 className="text-2xl font-bold text-gray-900">Historial</h2>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
                <ul className="space-y-4">
                  {matchHistory.length > 0 ? (
                    matchHistory.map((match, index) => (
                      <li key={index} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                        <div>
                          <div className="font-bold text-gray-900">Atlético Moro vs {match.opponent_name}</div>
                          <div className="text-sm text-gray-500 capitalize">
                            {new Date(match.date).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'short' })}
                          </div>
                        </div>
                        <div className="bg-moro-blue/10 text-moro-blue px-3 py-1 rounded-full font-bold text-sm">
                          {match.result}
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500 text-sm text-center">No hay partidos en el historial aún.</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Players Preview */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Jugadores Destacados</h2>
            <Link href="/equipo" className="text-moro-blue font-medium hover:underline flex items-center gap-1">
              Ver plantel completo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {players.filter(p => ["Tadeo Charras", "Santiago Nicolino"].includes(p.name)).map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function MapPinIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-9 13-9 13s-9-7-9-13a9 9 0 0 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
