import React from 'react'


const Footer = () => {
    return (
        <>
            <div className='min-h-[50dvh] flex flex-col gap-10 bg-(--color-primary) text-(--accent) text-lg font-lex-light px-[100px] py-20' >
                {/* top */}
                <div className='flex items-end justify-between' >
                    {/* logo */}
                    <img src="/images/LogoGold.webp" alt="Daily goli yellow logo" className='h-50' />
                    {/* details */}
                    <div className='leading-[188%]' >
                        K Dee Ventures, Shop No-106, MC Complex, <br /> 
                        Sector-15, Noida, UP–201301 <br /> 
                        kdeeventures9@gmail.com +91-7007436859 <br />
                        FSSAI License No.: 12724999000202  <br />
                        Mfg. FSSAI: 10019051003293 
                    </div>
                    {/* links 1 */}
                    <ul className=' leading-[188%] ' >
                        <a href="#blogs">
                            <li className='cursor-pointer hover:underline' >Blogs</li>
                        </a>
                        <a href="">
                            <li className='cursor-pointer hover:underline' >On Binkit</li>
                        </a>
                        <a href="">
                            <li className='cursor-pointer hover:underline' >On Flipkart</li>
                        </a>
                        <a href="">
                            <li className='cursor-pointer hover:underline' >On Amazon</li>
                        </a>
                        <a href="/contact">
                            <li className='cursor-pointer hover:underline' >Contact</li>
                        </a>
                    </ul>
                    {/* links 2 */}
                    <ul className=' leading-[188%]' >
                        <a href="#ingredients">
                            <li className='cursor-pointer hover:underline' >Ingredients</li>
                        </a>
                        <a href="#benefits">
                            <li className='cursor-pointer hover:underline' >Benefits</li>
                        </a>
                        <a href="#reviews">
                            <li className='cursor-pointer hover:underline' >Reviews</li>
                        </a>
                        <a href="#faqs">
                            <li className='cursor-pointer hover:underline' >FAQs</li>
                        </a>
                        <a href="#product">
                            <li className='cursor-pointer hover:underline' >Buy Now</li>
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
