import React from 'react'
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone } from 'lucide-react'

const Footer = () => {
    return (
        <>
            <div className='min-h-auto md:min-h-[50dvh] flex flex-col gap-6 md:gap-10 bg-(--color-primary) text-(--accent) text-sm md:text-lg font-lex-light px-4 md:px-25 py-10 md:py-20' >
                {/* top */}
                <div className='flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-0' >
                    {/* logo and social icons */}
                    <div className='flex flex-col gap-6 w-full md:w-auto'>
                        <img src="/images/LogoGold.webp" alt="Daily goli yellow logo" className='h-40 md:h-50 w-auto' />
                        {/* Social Media Icons */}
                        {/* <div className='flex gap-4'>
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" className='p-2 rounded-full hover:bg-(--accent) transition group' title='Facebook'>
                                <Facebook size={24} className='text-(--accent) group-hover:text-(--color-primary)' />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className='p-2 rounded-full hover:bg-(--accent) transition group' title='Instagram'>
                                <Instagram size={24} className='text-(--accent) group-hover:text-(--color-primary)' />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noreferrer" className='p-2 rounded-full hover:bg-(--accent) transition group' title='Twitter'>
                                <Twitter size={24} className='text-(--accent) group-hover:text-(--color-primary)' />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className='p-2 rounded-full hover:bg-(--accent) transition group' title='LinkedIn'>
                                <Linkedin size={24} className='text-(--accent) group-hover:text-(--color-primary)' />
                            </a>
                        </div> */}
                    </div>
                    {/* details */}
                    <ul className='leading-relaxed md:leading-[200%] text-xs md:text-base w-full md:w-auto' >
                        K Dee Ventures, Shop No-106, MC Complex, <br />
                        Sector-15, Noida, UP–201301 <br />
                        <a href="mailto:kdeeventures9@gmail.com" className='flex items-center gap-2 hover:opacity-80 transition text-(--accent)'>
                            <Mail size={16} className='text-(--accent)' />
                            <span className='text-(--accent)'>kdeeventures9@gmail.com</span>
                        </a>
                        <a href="tel:+919818974293" className='flex items-center gap-2 hover:opacity-80 transition text-(--accent)'>
                            <Phone size={16} className='text-(--accent)' />
                            <span className='text-(--accent)'>+91 - 98189 74293</span>
                        </a>
                        FSSAI License No.: 12724999000202  <br />
                        Mfg. FSSAI: 10019051003293
                    </ul>
                    {/* links 1 */}
                    <ul className='leading-relaxed md:leading-[188%] text-xs md:text-base w-full md:w-auto' >
                        <a href="#blogs">
                            <li className='cursor-pointer hover:underline text-(--accent)' >Blogs</li>
                        </a>
                        <a href="">
                            <li className='cursor-pointer hover:underline text-(--accent)' >On Binkit</li>
                        </a>
                        <a href="">
                            <li className='cursor-pointer hover:underline text-(--accent)' >On Flipkart</li>
                        </a>
                        <a href="">
                            <li className='cursor-pointer hover:underline text-(--accent)' >On Amazon</li>
                        </a>
                        <a href="/contact">
                            <li className='cursor-pointer hover:underline text-(--accent)' >Contact</li>
                        </a>
                    </ul>
                    {/* links 2 */}
                    <ul className='leading-relaxed md:leading-[188%] text-xs md:text-base w-full md:w-auto' >
                        <a href="#ingredients">
                            <li className='cursor-pointer hover:underline text-(--accent)' >Ingredients</li>
                        </a>
                        <a href="#benefits">
                            <li className='cursor-pointer hover:underline text-(--accent)' >Benefits</li>
                        </a>
                        <a href="#reviews">
                            <li className='cursor-pointer hover:underline text-(--accent)' >Reviews</li>
                        </a>
                        <a href="#faqs">
                            <li className='cursor-pointer hover:underline text-(--accent)' >FAQs</li>
                        </a>
                        <a href="#product">
                            <li className='cursor-pointer hover:underline text-(--accent)' >Buy Now</li>
                        </a>
                    </ul>
                </div>
                {/* bottom line */}
                <div className='text-xs md:text-sm leading-relaxed border-t border-(--accent) border-opacity-30 pt-6 md:pt-10'>
                    © 2026 Daily Goli All rights reserved | Science-backed, plant-based health supplements Inspired by GLP-1 pathway science. Made in India, for the world. This is a food supplement, not for medicinal use. Keep out of reach of children.
                </div>
            </div>
        </>
    )
}

export default Footer
