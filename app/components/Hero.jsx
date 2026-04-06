import React from 'react'

const Hero = () => {
    return (
        <div className='relative h-[80dvh] mt-5' >
            <div className='absolute inset-0 h-[80dvh] flex items-center justify-center ' >
            <img src="/images/bgIllustrations.png" className="w-full" />
            </div>
            <div className=' absolute inset-0 h-[80dvh] flex items-center justify-center px-[100px]' >
                {/* left text section */}
                <div className="w-1/2 flex flex-col justify-end items-start">
                    <img src="/images/LogoGreen.webp" className='h-auto w-80' alt="Daily Goli Logo Green" />
                    <p className='font-lex-reg text-(--color-primary) text-xl mt-5' >
                        A plant-based supplement with CQR-300, <br />
                        Berberine & Chromium - designed to support <br />
                        your metabolism, manage cravings, and take <br />
                        control of your wellness journey
                    </p>
                </div>

                {/* right images section  */}
                <div className="w-1/2">
                    <img src="/images/productMain.webp" alt="Daily goli MB-360 main product image" />
                </div>
            </div>
        </div>
    )
}

export default Hero
