import React from 'react'
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone } from 'lucide-react'

const Footer = () => {
    return (
        <>
            <div className='min-h-auto md:min-h-[50dvh] flex flex-col gap-8 md:gap-10 bg-(--color-primary) text-(--accent) font-lex-light px-6 md:px-25 py-12 md:py-20' >
                {/* top */}
                <div className='flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 lg:gap-0' >
                    {/* logo and social icons */}
                    <div className='flex flex-col gap-6 w-full lg:w-auto items-start'>
                        <img src="/images/LogoGold.webp" alt="Daily goli yellow logo" className='h-24 sm:h-32 lg:h-50 w-auto object-contain' />
                    </div>

                    {/* details & links container */}
                    <div className="flex flex-col md:flex-row gap-10 md:gap-16 lg:gap-20 w-full lg:w-auto justify-between lg:justify-end items-start lg:items-end mt-4 lg:mt-0">
                        {/* details */}
                        <ul className='leading-relaxed md:leading-[200%] text-sm md:text-base' >
                            K Dee Ventures, Shop No-106, MC Complex, <br />
                            Sector-15, Noida, UP–201301 <br />
                            <a href="mailto:kdeeventures9@gmail.com" className='flex items-center gap-2 hover:opacity-80 transition text-(--accent) mt-2'>
                                <Mail size={16} className='text-(--accent) shrink-0' />
                                <span className='text-(--accent) break-all'>kdeeventures9@gmail.com</span>
                            </a>
                            <a href="tel:+919818974293" className='flex items-center gap-2 hover:opacity-80 transition text-(--accent) mb-2'>
                                <Phone size={16} className='text-(--accent) shrink-0' />
                                <span className='text-(--accent)'>+91 - 98189 74293</span>
                            </a>
                            FSSAI License No.: 12724999000202  <br />
                            Mfg. FSSAI: 10019051003293
                        </ul>

                        {/* links wrapper to put them side by side on mobile */}
                        <div className="flex gap-16 sm:gap-24 md:gap-16 lg:gap-20">
                            {/* links 1 */}
                            <ul className='leading-relaxed md:leading-[188%] text-sm md:text-base flex flex-col gap-1' >
                                <a href="/blogs" className="block">
                                    <li className='cursor-pointer hover:underline text-(--accent)' >Blogs</li>
                                </a>
                                <a href="" className="block">
                                    <li className='cursor-pointer hover:underline text-(--accent)' >On Blinkit</li>
                                </a>
                                <a href="" className="block">
                                    <li className='cursor-pointer hover:underline text-(--accent)' >On Flipkart</li>
                                </a>
                                <a href="" className="block">
                                    <li className='cursor-pointer hover:underline text-(--accent)' >On Amazon</li>
                                </a>
                                <a href="/contact" className="block">
                                    <li className='cursor-pointer hover:underline text-(--accent)' >Contact</li>
                                </a>
                            </ul>
                            {/* links 2 */}
                            <ul className='leading-relaxed md:leading-[188%] text-sm md:text-base flex flex-col gap-1' >
                                <a href="#ingredients" className="block">
                                    <li className='cursor-pointer hover:underline text-(--accent)' >Ingredients</li>
                                </a>
                                <a href="#benefits" className="block">
                                    <li className='cursor-pointer hover:underline text-(--accent)' >Benefits</li>
                                </a>
                                <a href="#reviews" className="block">
                                    <li className='cursor-pointer hover:underline text-(--accent)' >Reviews</li>
                                </a>
                                <a href="#faqs" className="block">
                                    <li className='cursor-pointer hover:underline text-(--accent)' >FAQs</li>
                                </a>
                                <a href="#product" className="block">
                                    <li className='cursor-pointer hover:underline text-(--accent)' >Buy Now</li>
                                </a>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* bottom line */}
                <div className='text-xs md:text-sm leading-relaxed border-t border-(--accent) border-opacity-30 pt-6 mt-4 opacity-80'>
                    © 2026 Daily Goli All rights reserved | Science-backed, plant-based health supplements Inspired by GLP-1 pathway science. Made in India, for the world. This is a food supplement, not for medicinal use. Keep out of reach of children.
                </div>
            </div>
        </>
    )
}

export default Footer
