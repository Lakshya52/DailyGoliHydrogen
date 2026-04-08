import React, { useRef } from 'react'
import { Star, Quote, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'

const reviews = [
  {
    text: "3 mahine se MB-360 le raha hoon. Cravings bahut kam ho gayi hai. Berberine wala combination kaafi effective hai. Packaging bhi premium lagti hai.",
    name: "Rahul S.",
    location: "Delhi NCR",
    stars: 5
  },
  {
    text: "Energy levels are way up. I don't feel sluggish after lunch anymore. Best decision I made for my wellness routine.",
    name: "Anjali K.",
    location: "Mumbai",
    stars: 5
  },
  {
    text: "Berberine aur gymnema ka combination solid hai. Sugar cravings control karne mein help mili hai. Neutral taste is a plus.",
    name: "Vikram P.",
    location: "Bangalore",
    stars: 5
  },
  {
    text: "Daily Goli has become my morning ritual. 5 stars for the ingredient transparency and the premium glass jar feel.",
    name: "Sarah J.",
    location: "Hyderabad",
    stars: 5
  },
  {
    text: "Tried many supplements before, but MB-360 is different. It actually works on my metabolism without any side effects.",
    name: "Ishaan M.",
    location: "Pune",
    stars: 4
  },
  {
    text: "Love the branding and the results. Most importantly, my digestion feels much lighter after just two weeks.",
    name: "Priyanka D.",
    location: "Kolkata",
    stars: 5
  }
]

const Reviews = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 420; // card width + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div id='reviews' className='min-h-fit flex flex-col items-center gap-10 justify-center font-lex-reg bg-(--white) py-12 md:py-24 px-4 md:px-25 overflow-hidden' >
        <div className='flex flex-col items-center justify-center' > 
            <div className="font-lex-reg rounded-full h-10 px-4 bg-(--color-primary) text-(--white) flex items-center justify-center">Reviews</div>
            <h1 className='text-2xl md:text-[65px] text-(--color-primary) font-lex-reg text-center leading-tight mt-4 font-lex-med leading-[108%] section-heading' >Join 1000+ Happy Customers</h1>
        </div>

        <div className="flex flex-col md:flex-row items-start justify-start w-full gap-6 md:gap-8 relative px-2 md:px-0" >
          
          {/* STICKY RATING SUMMARY */}
          <div className="w-full md:w-95 md:sticky md:top-24 flex flex-col justify-between bg-(--color-primary) text-(--accent) rounded-3xl p-6 md:p-10 h-fit z-10" >
            <div className="flex items-end justify-between mb-6 md:mb-8" >
              <h1 className="text-4xl md:text-6xl font-lex-reg">4.8</h1>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_,i)=>(
                  <Star key={i} fill="currentColor" size={20} className="md:w-6 md:h-6"/>
                ))}
              </div>
            </div>

            <p className="text-base md:text-xl mb-6 md:mb-8 opacity-90">Based on 100+ verified customer reviews</p>

            <div className="flex flex-col gap-4">
              {[
                {star:5, percent:82},
                {star:4, percent:12},
                {star:3, percent:4},
                {star:2, percent:1},
                {star:1, percent:1}
              ].map((item,i)=>(
                <div key={i} className="flex items-center gap-4">
                  <span className="w-4">{item.star}</span>
                  <div className="flex-1 h-1.5 bg-(--white)/20 rounded-full overflow-hidden">
                    <div className="h-full bg-(--accent) rounded-full" style={{width:`${item.percent}%`}}></div>
                  </div>
                  <span className="w-10 text-right">{item.percent}%</span>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-(--accent)/20">
               <div className="flex items-center gap-2 text-(--accent)">
                 <CheckCircle size={20} />
                 <span className="text-sm font-lex-reg">100% Genuine Reviews</span>
               </div>
            </div>
          </div>

          {/* SLIDING REVIEWS CAROUSEL */}
          <div className="relative flex-1 w-full overflow-hidden">
            <div 
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {reviews.map((review,i)=>(
                <div 
                  key={i} 
                  className="min-w-75 md:min-w-100 bg-(--bg-light) rounded-3xl p-8 flex flex-col justify-between snap-start border border-(--color-primary)/10 hover:border-(--color-primary)/30 transition-all duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                       <Quote size={40} className="text-(--color-primary) rotate-180 opacity-20"/>
                       <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full">
                          <CheckCircle size={14} fill="currentColor" className="text-white"/>
                          <span className="text-[10px] uppercase tracking-wider font-bold">Verified Buyer</span>
                       </div>
                    </div>

                    <div className="flex gap-1 mb-4 text-(--color-primary)">
                      {[...Array(review.stars)].map((_,idx)=>(
                        <Star key={idx} size={16} fill="currentColor"/>
                      ))}
                    </div>

                    <p className="text-lg text-(--color-primary) leading-relaxed">
                      "{review.text}"
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-(--color-primary)/5 flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-(--color-primary) text-(--white) flex items-center justify-center font-bold text-lg">
                        {review.name.charAt(0)}
                     </div>
                     <div>
                        <p className="font-bold text-(--color-primary)">{review.name}</p>
                        <p className="text-sm opacity-60 text-(--color-primary)">{review.location}</p>
                     </div>
                  </div>
                </div>
              ))}
            </div>

            {/* NAVIGATION BUTTONS */}
            <div className="mt-8 flex gap-4">
              <button 
                onClick={() => scroll('left')}
                className="h-14 w-14 rounded-full border-2 border-(--color-primary) flex items-center justify-center cursor-pointer hover:bg-(--color-primary) text-(--color-primary) hover:text-(--white) transition-all duration-300 shadow-lg hover:shadow-(--color-primary)/20"
              >
                <ArrowLeft size={24} />
              </button>

              <button 
                onClick={() => scroll('right')}
                className="h-14 w-14 rounded-full bg-(--color-primary) flex items-center justify-center cursor-pointer hover:bg-(--color-primary)/90 text-(--white) transition-all duration-300 shadow-lg hover:shadow-(--color-primary)/40"
              >
                <ArrowRight size={24} />
              </button>
            </div>
          </div>

        </div>

    </div>
  )
}

export default Reviews
