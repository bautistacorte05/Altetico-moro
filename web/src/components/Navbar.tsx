'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 relative rounded-full overflow-hidden border-2 border-moro-red group-hover:border-moro-blue transition-colors">
                                <Image
                                    src="/images/logo.png"
                                    alt="Escudo"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-lg leading-none text-moro-blue">
                                    Atlético Moro
                                </span>
                                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                                    Sitio Oficial
                                </span>
                            </div>
                        </Link>
                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-moro-blue hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition-all"
                            >
                                Inicio
                            </Link>
                            <Link
                                href="/equipo"
                                className="text-gray-600 hover:text-moro-blue hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition-all"
                            >
                                Equipo
                            </Link>
                            <Link
                                href="/estadisticas"
                                className="text-gray-600 hover:text-moro-blue hover:bg-blue-50 px-3 py-2 rounded-md text-sm font-medium transition-all"
                            >
                                Estadísticas
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-gray-600 hover:text-moro-blue focus:outline-none p-2"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white">
                    <div className="px-4 pt-2 pb-4 space-y-1">
                        <Link
                            href="/"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-moro-blue hover:bg-blue-50"
                        >
                            Inicio
                        </Link>
                        <Link
                            href="/equipo"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-moro-blue hover:bg-blue-50"
                        >
                            Equipo
                        </Link>
                        <Link
                            href="/estadisticas"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-moro-blue hover:bg-blue-50"
                        >
                            Estadísticas
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}
