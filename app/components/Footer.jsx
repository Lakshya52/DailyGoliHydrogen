import React from 'react'
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone } from 'lucide-react'

const Footer = () => {
    return (
        <>
            <div className='min-h-[50dvh] flex flex-col gap-10 bg-(--color-primary) text-(--accent) text-lg font-lex-light px-[100px] py-20' >
                {/* top */}
                <div className='flex items-end justify-between' >
                    {/* logo and social icons */}
                    <div className='flex flex-col gap-6'>
                        <img src="/images/LogoGold.webp" alt="Daily goli yellow logo" className='h-50' />
                        {/* Social Media Icons */}
                        <div className='flex gap-4'>
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" className='p-2 rounded-full hover:bg-(--accent) hover:bg-opacity-20 transition' title='Facebook'>
                                <Facebook size={24} className='text-(--accent)' />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" className='p-2 rounded-full hover:bg-(--accent) hover:bg-opacity-20 transition' title='Instagram'>
                                <Instagram size={24} className='text-(--accent)' />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noreferrer" className='p-2 rounded-full hover:bg-(--accent) hover:bg-opacity-20 transition' title='Twitter'>
                                <Twitter size={24} className='text-(--accent)' />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className='p-2 rounded-full hover:bg-(--accent) hover:bg-opacity-20 transition' title='LinkedIn'>
                                <Linkedin size={24} className='text-(--accent)' />
                            </a>
                        </div>
                    </div>
                    {/* details */}
                    <div className='leading-[188%]' >
                        K Dee Ventures, Shop No-106, MC Complex, <br /> 
                        Sector-15, Noida, UP–201301 <br /> 
                        <a href="mailto:kdeeventures9@gmail.com" className='flex items-center gap-2 hover:opacity-80 transition'>
                            <Mail size={16} />
                            kdeeventures9@gmail.com
                        </a>
                        <a href="tel:+917007436859" className='flex items-center gap-2 hover:opacity-80 transition'>
                            <Phone size={16} />
                            +91-7007436859
                        </a>
                        FSSAI License No.: 12724999000202  <br />
                        Mfg. FSSAI: 10019051003293 
                    </div>
                    {/* links 1 */}
                    <ul className=' leading-[188%] ' >
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
                    <ul className=' leading-[188%]' >
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
                <div>
                    © 2026 Daily Goli All rights reserved | Science-backed, plant-based health supplements Inspired by GLP-1 pathway science. Made in India, for the world. This is a food supplement, not for medicinal use. Keep out of reach of children.
                </div>
            </div>
        </>
    )
}

export default Footer
