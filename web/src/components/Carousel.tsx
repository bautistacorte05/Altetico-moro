"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function Carousel({ images }: { images: string[] }) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const next = useCallback(() => {
        setCurrentIndex((current) => (current + 1) % images.length)
    }, [images.length])

    const prev = useCallback(() => {
        setCurrentIndex((current) => (current - 1 + images.length) % images.length)
    }, [images.length])

    useEffect(() => {
        const timer = setInterval(() => {
            next()
        }, 5000)
        return () => clearInterval(timer)
    }, [next])

    if (!images.length) return null

    return (
        <div className="relative group w-full h-[500px] md:h-[600px] overflow-hidden rounded-2xl shadow-xl">
            <div
                className="absolute inset-0 transition-transform duration-700 ease-out flex"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((src, index) => (
                    <div key={src} className="relative w-full h-full flex-shrink-0">
                        <Image
                            src={src}
                            alt={`Slide ${index + 1}`}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                ))}
            </div>

            <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                aria-label="Previous slide"
            >
                <ChevronLeft size={24} />
            </button>

            <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/30 backdrop-blur text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                aria-label="Next slide"
            >
                <ChevronRight size={24} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentIndex ? "bg-white w-8" : "bg-white/50 hover:bg-white/80"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
