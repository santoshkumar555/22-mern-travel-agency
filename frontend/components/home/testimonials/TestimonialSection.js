"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import { testimonials } from "./testimonials";

export default function TestimonialsSection() {
    const swiperRef = useRef(null);

    if (!testimonials.length) return null;

    return (
        <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="font-black text-4xl md:text-5xl text-slate-900">
                    What Our{" "}
                    <span className="text-teal-600 underline decoration-orange-400 decoration-4 underline-offset-8">
                        Travelers Say
                    </span>
                </h2>
                <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
                    Real experiences from our premium travelers across the world. Every journey is crafted with precision, comfort, and unforgettable moments.
                </p>
            </div>

            <div className="relative">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    slidesPerView={1}
                    spaceBetween={32}
                    speed={800}
                    loop={testimonials.length > 3}
                    grabCursor={true}
                    autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                    pagination={{
                        clickable: true,
                        el: ".testimonial-swiper-pagination",
                        bulletClass: "testimonial-bullet",
                        bulletActiveClass: "testimonial-bullet-active",
                        renderBullet: (_, className) => `<span class="${className}"></span>`,
                    }}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1280: { slidesPerView: 3 },
                    }}
                    onSwiper={(s) => { swiperRef.current = s; }}
                    className="w-full"
                >
                    {testimonials.map((item) => (
                        <SwiperSlide key={item.id} className="h-auto!">
                            <article className="flex flex-col items-center text-center space-y-6 h-full">
                                <div className="flex gap-1 text-orange-400">
                                    {[...Array(5)].map((_, idx) => (
                                        <Star key={idx} className="w-5 h-5 fill-current" />
                                    ))}
                                </div>
                                <p className="font-black text-xl text-slate-800 leading-snug">&quot;{item.title}&quot;</p>
                                <p className="text-sm text-slate-500 leading-relaxed">{item.review}</p>
                                <div className="pt-4 border-t border-sky-100 w-16 mx-auto" />
                                <div className="flex flex-col items-center gap-3">
                                    <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-orange-200">
                                        <Image src={item.avatar} alt={item.name} fill sizes="56px" className="object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 uppercase tracking-widest text-sm">{item.name}</p>
                                        <p className="font-bold text-xs text-teal-600 mt-1 uppercase tracking-widest">{item.destination}</p>
                                    </div>
                                </div>
                            </article>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {testimonials.length > 1 && (
                    <>
                        <button
                            type="button"
                            aria-label="Previous"
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="absolute left-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 -translate-x-6 items-center justify-center rounded-full border border-sky-100 bg-white text-slate-700 shadow-md transition hover:border-orange-200 hover:text-orange-500 lg:flex"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            aria-label="Next"
                            onClick={() => swiperRef.current?.slideNext()}
                            className="absolute right-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 translate-x-6 items-center justify-center rounded-full border border-sky-100 bg-white text-slate-700 shadow-md transition hover:border-orange-200 hover:text-orange-500 lg:flex"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </>
                )}
            </div>

            {testimonials.length > 1 && (
                <div className="mt-10 flex justify-center">
                    <div className="testimonial-swiper-pagination static! flex! w-auto! items-center gap-2" />
                </div>
            )}
        </section>
    );
}
