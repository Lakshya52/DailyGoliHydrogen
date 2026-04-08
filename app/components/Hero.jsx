import React from 'react'

const Hero = () => {
    return (
        <div className='relative h-[80dvh] mt-5' >
            <div className='absolute inset-0 h-[80dvh] flex items-center justify-center ' >
            <img src="/images/bgIllustrations.png" className="w-full" />
            </div>
            <div className=' absolute inset-0 h-[80dvh] flex flex-col md:flex-row items-center justify-center px-4 md:px-25' >
                {/* left text section */}
                <div className="w-full md:w-1/2 flex flex-col justify-end items-center md:items-start text-center md:text-left">
                    <img src="/images/LogoGreen.webp" className='h-auto w-60 mb-5 md:w-80' alt="Daily Goli Logo Green" />
                    <p className='font-lex-reg text-(--color-primary) text-base md:text-xl mt-5' >
                        A plant-based supplement with CQR-300, <br />
                        Berberine & Chromium - designed to support <br />
                        your metabolism, manage cravings, and take <br />
                        control of your wellness journey
                    </p>
                </div>

                {/* right images section  */}
                <div className="w-full md:w-1/2 flex items-center justify-center">
                    <img src="/images/productMain.webp" alt="Daily goli MB-360 main product image" className="w-4/5 md:w-full" />
                </div>
            </div>
        </div>
    )
}

export default Hero
