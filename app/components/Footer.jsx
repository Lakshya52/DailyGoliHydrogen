import React from 'react'
import { Link } from 'react-router'
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
                        {/* links wrapper to put them side by side on mobile */}
                        <div className="flex gap-16 sm:gap-24 md:gap-16 lg:gap-20">
                            {/* links 1 */}
                            <ul className='leading-relaxed md:leading-[188%] text-sm md:text-base flex flex-col gap-1' >
                                <a href="/blogs" className="block">
                                    <li className='cursor-pointer hover:underline text-(--accent)' >Blogs</li>
                                </a>
                                {/* <a href="" className="block">
                                    <li className='cursor-pointer hover:underline text-(--accent)' >On Blinkit</li>
                                </a> */}
                                <a target='_blank' href="https://www.flipkart.com/daily-goli-mb-360-support-glp-1-weight-fat-loss-capsules-women-men-60-capsule/p/itmc2fd4ef388f1d?pid=VSLHKZFGFFNUZMPB&lid=LSTVSLHKZFGFFNUZMPBN9HIRK&marketplace=FLIPKART&q=glp1&store=search.flipkart.com&srno=s_1_4&otracker=search&otracker1=search&fm=Search&iid=34af4032-2166-4aec-b05b-33f72163960b.VSLHKZFGFFNUZMPB.SEARCH&ppt=sp&ppn=sp&ssid=irt20nsye80000001777639329840&qH=d9551c57f803981b&ov_redirect=true&ov_redirect=true" className="block">
                                    <li className='cursor-pointer hover:underline text-(--accent)' >On Flipkart</li>
                                </a>
                                <a target='_blank' href="https://www.amazon.in/Daily-Goli-Metabolism-Plant-Based-Suppressant/dp/B0GS2TL1K8/ref=sr_1_19?crid=1UZE3YVPTIKDE&dib=eyJ2IjoiMSJ9.SzpewVEuZ4i0nswXovDVvULN49EVn9HTDonw27RfXjtdCQwAE7jVh6SNod4civ5_r0EwDcGLqqN2U9kX8vMNzTzFEKOmvekkxSrHZyhg4OEZdqWoDj4N6rQ9kKdA4JcBaas5ZulYRfE51VCphUCfGjarrm6OAVAYtc43-ZBCyl7Dou2Hqu2GmdnUIa76h3_ezb4d_SQN3Ss1EOvFI2D0i33GflCeYJQtRTcO9mxDmYXhjFmPX0yHmEi5qPWvAd17ZusMf3mP2s_7u0cZFI7YLVHHL3GIXXrOt7MU7ZwBAfA.nPJ75gs9XftKMHr9r6t31__pmNQVb31kma2niaVy3PM&dib_tag=se&keywords=glp+1&qid=1777639226&sprefix=glp+%2Caps%2C408&sr=8-19" className="block">
                                    <li className='cursor-pointer hover:underline text-(--accent)' >On Amazon</li>
                                </a>
                                <a href="#ingredients" className="block">
                                    <li className='cursor-pointer hover:underline text-(--accent)' >Ingredients</li>
                                </a>
                                <a href="#comparison" className="block">
                                    <li className='cursor-pointer hover:underline text-(--accent)' >Comparison</li>
                                </a>
                            </ul>
                            {/* links 2 */}
                            <ul className='leading-relaxed md:leading-[188%] text-sm md:text-base flex flex-col gap-1' >
                                <a href="#benefits" className="block">
                                    <li className='cursor-pointer hover:underline text-(--accent)' >Benefits</li>
                                </a>
                                <a href="#reviews" className="block">
                                    <li className='cursor-pointer hover:underline text-(--accent)' >Reviews</li>
                                </a>
                                <a href="#faqs" className="block">
                                    <li className='cursor-pointer hover:underline text-(--accent)' >FAQs</li>
                                </a>
                                <a href="/contact" className="block">
                                    <li className='cursor-pointer hover:underline text-(--accent)' >Contact</li>
                                </a>
                                <span className="flex gap-5">
                                    <a href="https://www.instagram.com/dailygoli.official/" target="_blank" rel="noopener noreferrer" className='cursor-pointer hover:underline text-(--accent)' ><Instagram /></a>
                                    <a href="https://www.facebook.com/share/1DzCcfkn2h/" target="_blank" rel="noopener noreferrer" className='cursor-pointer hover:underline text-(--accent)' ><Facebook /></a>
                                    <a href="https://www.linkedin.com/company/daily-goli/" target="_blank" rel="noopener noreferrer" className='cursor-pointer hover:underline text-(--accent)' ><Linkedin /></a>
                                </span>

                            </ul>
                        </div>
                        {/* details */}
                        <ul className='leading-relaxed md:leading-[200%] text-sm md:text-base' >
                            K Dee Ventures, Shop No-106, <br className='hidden sm:block' />
                            MC Complex, Sector-15, Noida, <br className='hidden sm:block' />
                            Uttar Pradesh – 201301 <br className='hidden sm:block' />
                            <a href="mailto:kdeeventures9@gmail.com" className='flex items-center gap-2 hover:opacity-80 transition text-(--accent) mt-2'>
                                <Mail size={16} className='text-(--accent) shrink-0' />
                                <span className='text-(--accent) break-all'>kdeeventures9@gmail.com</span>
                            </a>
                            <a href="tel:+919818974293" className='flex items-center gap-2 hover:opacity-80 transition text-(--accent) mb-2'>
                                <Phone size={16} className='text-(--accent) shrink-0' />
                                <span className='text-(--accent)'>+91 - 98189 74293</span>
                            </a>
                            FSSAI License No.: 12724999000202  <br />
                            {/* Mfg. FSSAI: 10019051003293 */}
                        </ul>

                    </div>
                </div>
                {/* bottom line */}
                <div className='text-md leading-relaxed border-t border-(--accent) pt-6 mt-4  flex flex-col md:flex-row md:items-center justify-between gap-2 '>
                    © 2026 Daily Goli All rights reserved
                    <ul className='flex items-center gap-5'>
                        <Link to="/policies/privacy-policy" className="block">
                            <li className='cursor-pointer hover:underline text-(--accent)' >Privacy Policy</li>
                        </Link>
                        <Link to="/policies/terms-of-service" className="block">
                            <li className='cursor-pointer hover:underline text-(--accent)' >
                                Terms of Service
                            </li>
                        </Link>
                        <Link to="/policies/refund-policy" className="block">
                            <li className='cursor-pointer hover:underline text-(--accent)' >Refund Policy</li>
                        </Link>
                    </ul>
                    {/* Science-backed, plant-based health supplements Inspired by GLP-1 pathway science. Made in India, for the world. This is a food supplement, not for medicinal use. Keep out of reach of children. */}
                </div>
            </div>
        </>
    )
}

export default Footer
