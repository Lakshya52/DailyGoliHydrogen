import React from 'react'

const Hero = () => {
    return (
        <div className='relative h-fit min-h-[80dvh] mt-5' >
            <div className='absolute inset-0 flex items-center justify-center pointer-events-none' >
                <img src="/images/bgIllustrations.png" alt='Hero background illustration' className="w-full h-full object-cover" width="1920" height="1080" fetchPriority="high" />
            </div>
            <div className='relative z-10 h-fit py-10 lg:py-0 min-h-[80dvh] flex flex-col lg:flex-row items-center justify-center px-7 md:px-25 gap-10' >
                {/* left text section */}
                <div className="w-full lg:w-1/2 flex flex-col justify-end items-start text-left gap-7">
                    <img src="/images/LogoGreen.webp" className='h-auto w-[40vw] sm:w-[30vw] lg:w-[17.57vw] mb-[1.464vw] md:w-[23.426vw]' alt="Daily Goli Logo Green" width="300" height="150" sizes="(min-width: 1024px) 18vw, (min-width: 768px) 23vw, 40vw" />
                    <h1 className='font-lex-reg text-(--color-primary) lg:max-w-[45ch] text-[1.171vw] md:text-[1.464vw] mt-[1.464vw]' >
                        A plant-based supplement with CQR-300,
                        Berberine & Chromium - designed to support
                        your metabolism, manage cravings, and take
                        control of your wellness journey
                    </h1>
                </div>

                {/* right images section  */}
                <div className="w-full lg:w-1/2 flex items-center justify-center">
                    <img src="/images/productMain.webp" alt="Daily goli MB-360 main product image" className="w-full" width="600" height="600" loading="eager" fetchPriority="high" sizes="(min-width: 1024px) 50vw, 100vw" />
                </div>
            </div>
        </div>
    )
}

export default Hero
