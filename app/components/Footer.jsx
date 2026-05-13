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
                        <img src="/images/LogoGold.webp" alt="Daily goli yellow logo" className='h-24 sm:h-32 lg:h-50 w-auto object-contain' width="2918" height="1871" loading="lazy" sizes="(min-width: 1024px) 200px, (min-width: 640px) 128px, 96px" />
                    </div>

                    {/* details & links container */}
                    <div className="flex flex-col md:flex-row gap-10 md:gap-16 lg:gap-20 w-full lg:w-auto justify-between lg:justify-end items-start lg:items-end mt-4 lg:mt-0">
                        {/* links wrapper to put them side by side on mobile */}
                        <div className="flex gap-16 sm:gap-24 md:gap-16 lg:gap-20">
                            {/* links 1 */}
                            <ul className='leading-relaxed md:leading-[188%] text-sm md:text-base flex flex-col gap-1' >
                                <li className='cursor-pointer hover:underline text-(--accent)' >
                                    <a href="/blogs" className="block">Blogs</a>
                                </li>
                                <li className='cursor-pointer hover:underline text-(--accent)' >
                                    <a target='_blank' href="https://www.flipkart.com/daily-goli-mb-360-support-glp-1-weight-fat-loss-capsules-women-men-60-capsule/p/itmc2fd4ef388f1d?pid=VSLHKZFGFFNUZMPB&lid=LSTVSLHKZFGFFNUZMPBN9HIRK&marketplace=FLIPKART&q=glp1&store=search.flipkart.com&srno=s_1_4&otracker=search&otracker1=search&fm=Search&iid=34af4032-2166-4aec-b05b-33f72163960b.VSLHKZFGFFNUZMPB.SEARCH&ppt=sp&ppn=sp&ssid=irt20nsye80000001777639329840&qH=d9551c57f803981b&ov_redirect=true&ov_redirect=true" className="block">On Flipkart</a>
                                </li>
                                <li className='cursor-pointer hover:underline text-(--accent)' >
                                    <a target='_blank' href="https://www.amazon.in/Daily-Goli-Metabolism-Plant-Based-Suppressant/dp/B0GS2TL1K8/ref=sr_1_19?crid=1UZE3YVPTIKDE&dib=eyJ2IjoiMSJ9.SzpewVEuZ4i0nswXovDVvULN49EVn9HTDonw27RfXjtdCQwAE7jVh6SNod4civ5_r0EwDcGLqqN2U9kX8vMNzTzFEKOmvekkxSrHZyhg4OEZdqWoDj4N6rQ9kKdA4JcBaas5ZulYRfE51VCphUCfGjarrm6OAVAYtc43-ZBCyl7Dou2Hqu2GmdnUIa76h3_ezb4d_SQN3Ss1EOvFI2D0i33GflCeYJQtRTcO9mxDmYXhjFmPX0yHmEi5qPWvAd17ZusMf3mP2s_7u0cZFI7YLVHHL3GIXXrOt7MU7ZwBAfA.nPJ75gs9XftKMHr9r6t31__pmNQVb31kma2niaVy3PM&dib_tag=se&keywords=glp+1&qid=1777639226&sprefix=glp+%2Caps%2C408&sr=8-19" className="block">On Amazon</a>
                                </li>
                                <li className='cursor-pointer hover:underline text-(--accent)' >
                                    <a href="#ingredients" className="block">Ingredients</a>
                                </li>
                                <li className='cursor-pointer hover:underline text-(--accent)' >
                                    <a href="#comparison" className="block">Comparison</a>
                                </li>
                            </ul>
                            {/* links 2 */}
                            <ul className='leading-relaxed md:leading-[188%] text-sm md:text-base flex flex-col gap-1' >
                                <li className='cursor-pointer hover:underline text-(--accent)' >
                                    <a href="#benefits" className="block">Benefits</a>
                                </li>
                                <li className='cursor-pointer hover:underline text-(--accent)' >
                                    <a href="#reviews" className="block">Reviews</a>
                                </li>
                                <li className='cursor-pointer hover:underline text-(--accent)' >
                                    <a href="#faqs" className="block">FAQs</a>
                                </li>
                                <li className='cursor-pointer hover:underline text-(--accent)' >
                                    <a href="/contact" className="block">Contact</a>
                                </li>
                                <li>
                                    <div className="flex gap-5 mt-2">
                                        <a href="https://www.instagram.com/dailygoli.official/" target="_blank" rel="noopener noreferrer" className='cursor-pointer hover:underline text-(--accent)' aria-label="Instagram"><Instagram /></a>
                                        <a href="https://www.facebook.com/share/1DzCcfkn2h/" target="_blank" rel="noopener noreferrer" className='cursor-pointer hover:underline text-(--accent)' aria-label="Facebook"><Facebook /></a>
                                        <a href="https://www.linkedin.com/company/daily-goli/" target="_blank" rel="noopener noreferrer" className='cursor-pointer hover:underline text-(--accent)' aria-label="LinkedIn"><Linkedin /></a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        {/* details */}
                        <div className='leading-relaxed md:leading-[200%] text-sm md:text-base' >
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
                        </div>

                    </div>
                </div>
                {/* top bar */}
                {/* <div className="border-t border-(--accent)"></div> */}
                {/* logos */}
                <div className='w-full min-h-20 bg-[#e0f3d1] p-4 flex items-center flex-wrap justify-center gap-4 rounded-2xl mt-2' >
                    <img src="/paymentLogos/amazon-pay.svg" alt="Amazon Pay" className="h-5 sm:h-8 w-auto" />
                    <img src="/paymentLogos/amex.svg" alt="American Express" className="h-5 sm:h-8 w-auto" />
                    <img src="/paymentLogos/diners-club.svg" alt="Diners Club" className="h-5 sm:h-8 w-auto" />
                    <img src="/paymentLogos/fpx.png" alt="FPX" className="h-5 sm:h-8 w-auto" />
                    <img src="/paymentLogos/grab-pay.png" alt="Grab Pay" className="h-5 sm:h-8 w-auto" />
                    <img src="/paymentLogos/hsbc.svg" alt="HSBC" className="h-5 sm:h-8 w-auto" />
                    <img src="/paymentLogos/maestro.svg" alt="Maestro" className="h-5 sm:h-8 w-auto" />
                    <img src="/paymentLogos/mastercard.svg" alt="Mastercard" className="h-5 sm:h-8 w-auto" />
                    <img src="/paymentLogos/paytm.png" alt="Paytm" className="h-5 sm:h-8 w-auto" />
                    <img src="/paymentLogos/rupay.png" alt="Rupay" className="h-5 sm:h-8 w-auto" />
                    <img src="/paymentLogos/tng.svg" alt="TNG" className="h-5 sm:h-8 w-auto" />
                    <img src="/paymentLogos/upi.svg" alt="UPI" className="h-5 sm:h-8 w-auto" />
                    <img src="/paymentLogos/visa.svg" alt="Visa" className="h-5 sm:h-8 w-auto" />
                    <img src="/paymentLogos/airtel-money.webp" alt="Airtel Money" className="h-5 sm:h-8 w-auto" />
                    <img src="/paymentLogos/boost.webp" alt="Boost" className="h-5 sm:h-8 w-auto" />
                    <img src="/paymentLogos/freecharge.svg" alt="Freecharge" className="h-5 sm:h-8 w-auto" />
                    <img src="/paymentLogos/mcash.png" alt="MCash" className="h-5 sm:h-8 w-auto" />
                    <img src="/paymentLogos/mobikwik.svg" alt="Mobikwik" className="h-5 sm:h-8 w-auto" />
                    <img src="/paymentLogos/payzapp.png" alt="Payzapp" className="h-5 sm:h-8 w-auto" />
                    <img src="/paymentLogos/other-pay.png" alt="Payment Method" className="h-5 sm:h-8 w-auto" />
                </div>
                {/* bottom line */}
                <div className='text-md leading-relaxed border-t border-(--accent) pt-6 mt-3  flex flex-col md:flex-row md:items-center justify-between gap-2 '>
                    © 2026 Daily Goli All rights reserved
                    <ul className='flex items-center gap-5'>
                        <li className='cursor-pointer hover:underline text-(--accent)' >
                            <Link to="/policies/privacy-policy" className="block">Privacy Policy</Link>
                        </li>
                        <li className='cursor-pointer hover:underline text-(--accent)' >
                            <Link to="/policies/terms-of-service" className="block">Terms of Service</Link>
                        </li>
                        <li className='cursor-pointer hover:underline text-(--accent)' >
                            <Link to="/policies/refund-policy" className="block">Refund Policy</Link>
                        </li>
                    </ul>
                    {/* Science-backed, plant-based health supplements Inspired by GLP-1 pathway science. Made in India, for the world. This is a food supplement, not for medicinal use. Keep out of reach of children. */}
                </div>
            </div>
        </>
    )
}

export default Footer
