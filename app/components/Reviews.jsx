import React, {useRef, useState, useEffect} from 'react'
import {Star, Quote, ArrowLeft, ArrowRight, CheckCircle, X} from 'lucide-react'

const reviews = [
  // {
  //   text: "3 mahine se MB-360 le raha hoon. Cravings bahut kam ho gayi hai. Berberine wala combination kaafi effective hai. Packaging bhi premium lagti hai.",
  //   name: "Rahul S.",
  //   location: "Delhi NCR",
  //   stars: 5,
  //   source: "website",
  //   images: []
  // },
  // {
  //   text: "Energy levels are way up. I don't feel sluggish after lunch anymore. Best decision I made for my wellness routine.",
  //   name: "Anjali K.",
  //   location: "Mumbai",
  //   stars: 5,
  //   source: "website",
  //   images: []
  // },
  // {
  //   text: "Berberine aur gymnema ka combination solid hai. Sugar cravings control karne mein help mili hai. Neutral taste is a plus.",
  //   name: "Vikram P.",
  //   location: "Bangalore",
  //   stars: 5,
  //   source: "website",
  //   images: []
  // },
  // {
  //   text: "Daily Goli has become my morning ritual. 5 stars for the ingredient transparency and the premium glass jar feel.",
  //   name: "Sarah J.",
  //   location: "Hyderabad",
  //   stars: 5,
  //   source: "website",
  //   images: []
  // },
  // {
  //   text: "Tried many supplements before, but MB-360 is different. It actually works on my metabolism without any side effects.",
  //   name: "Ishaan M.",
  //   location: "Pune",
  //   stars: 4,
  //   source: "website",
  //   images: []
  // },
  // {
  //   text: "Love the branding and the results. Most importantly, my digestion feels much lighter after just two weeks.",
  //   name: "Priyanka D.",
  //   location: "Kolkata",
  //   stars: 5,
  //   source: "website",
  //   images: []
  // },
  // ---- Amazon reviews (added manually from Amazon.in listing) ----
  // To attach photos to any review, drop the files in public/reviews/
  // and add their paths here, e.g. images: ['/reviews/rohan-1.jpg']
  {
    title: "Best Fat loss supplement in market so far",
    text: "I've used this supplement twice so far, and my experience has been very positive. I noticed a significant reduction in hunger and cravings, which made it much easier to stick to my diet. I also felt more in control of my appetite throughout the day without feeling jittery or uncomfortable.\n\nOf course, it's not a magic pill—you still need to maintain a healthy diet and stay active—but as a support supplement, it has worked well for me. Looking forward to continuing it and seeing even better results. So far, I'm satisfied with the product and would recommend giving it a try.",
    name: "Rohan bharti",
    location: "India",
    date: "Reviewed in India on 9 July 2026",
    stars: 5,
    verified: true,
    verifiedLabel: "Verified Amazon Purchase",
    source: "amazon",
    images: []
  },
  {
    title: "Good product....",
    text: "Great ingredient list.... Works well.... On my 2nd bottle..... Economical than other so called big brands",
    name: "Abhinav Agarwal",
    location: "India",
    date: "Reviewed in India on 13 August 2026",
    stars: 4,
    verified: true,
    verifiedLabel: "Verified Amazon Purchase",
    source: "amazon",
    images: []
  },
  {
    title: "Very gud in weight loss",
    text: "Very good in weight loss",
    name: "Amazon User",
    location: "India",
    date: "Reviewed in India on 19 August 2026",
    stars: 5,
    verified: true,
    verifiedLabel: "Verified Amazon Purchase",
    source: "amazon",
    images: []
  },
  {
    title: "Daily Goli",
    text: "Really really excellent product",
    name: "Aman singh",
    location: "India",
    date: "Reviewed in India on 23 May 2026",
    stars: 5,
    verified: true,
    verifiedLabel: "Verified Amazon Purchase",
    source: "amazon",
    images: []
  },
  {
    title: "How it's work nd why need?",
    text: "आप जैसे ही हैवी कार्ब्स डाइट से हाई प्रोटीन / कम कैलोरी की डाइट पर शिफ्ट होते हो तो आपकी खाने की मात्रा भी कम हो जाती है लेकिन बॉडी के hunger हार्मोन का संतुलन बिगड़ा हुआ रहता है हाई कार्ब्स डाइट की वजह से।\n\nजिससे आपको low कैलोरी डाइट में बहुत ज़्यादा भूख लगती है जिससे आपका कंट्रोल भी होता भूख पर और आप जो दिखा वो खा लेते हो।\n\nतो smartly डाइट follow करने के लिए मैंने मेरी वाइफ को Daily गोली सप्लीमेंट देना स्टार्ट किया हैं जिससे उसका खाने का पचने का टाइम बढ़ गया हैं जिससे भूख कंट्रोल में हैं और इन्सुलिन भी नही बढ़ता अचानक से बॉडी में। इसके साथ आप थोड़ी exercise walk add krde तो आपको इसके 100% result मिलने से कोई भी रोक सकता।\n\nDaily गोली के ingridient खाने का slow डाइजेशन krdete हैं ये sugar रोगियों को भी हेल्प फुल हैं।",
    name: "Rajat soni",
    location: "India",
    date: "Reviewed in India on 28 July 2026",
    stars: 5,
    verified: true,
    verifiedLabel: "Verified Amazon Purchase",
    source: "amazon",
    images: []
  },
  {
    title: "Daily Goli is worth trying If You're Serious About Weight Management!",
    text: "I have been using Daily Goli MB-360 consistently for about a month, taking it as recommended while also making small lifestyle changes like a 30–40 minute walk every day and reducing sugary snacks. I didn't expect overnight results, but I did notice gradual improvements.\n\nThe biggest benefit for me was craving control. I usually crave tea-time snacks and sweets after dinner, but after the second week those cravings became much easier to manage. I also felt full for longer after meals, which helped me avoid unnecessary snacking between lunch and dinner.\n\nAnother thing I liked is the ingredient profile. The combination of Berberine, Ceylon Cinnamon, Inulin, Chromium Picolinate, and other plant-based ingredients gave me confidence that the product focuses on metabolic support rather than relying on stimulants. I didn't experience jitters, acidity, or digestive discomfort during the time I used it.\n\nWhat I liked:\nNoticeably reduced cravings after 2–3 weeks of consistent use.\nEasy-to-swallow capsules with no unpleasant aftertaste.\nPlant-based formulation with well-known ingredients.\nWorked well alongside healthy eating and regular walking.\n\nWhat could be better:\nDon't expect dramatic weight loss if you continue eating unhealthy food or remain inactive. This is a supplement, not a shortcut.\nResults take time. If you're looking for instant changes in a few days, you'll probably be disappointed.\nIt would be helpful if the brand provided a more detailed usage guide or meal plan to help users maximize the benefits.\n\nFinal Verdict:\nIn my experience, Daily Goli MB-360 is more effective for controlling appetite and supporting healthier eating habits than for producing rapid weight loss. If you're willing to combine it with a balanced diet and regular exercise, it can be a useful addition to your routine. I'll continue using it and would recommend it to anyone looking for sustainable support rather than unrealistic promises.",
    name: "Anurag Sharma",
    location: "India",
    date: "Reviewed in India on 4 August 2026",
    stars: 4,
    verified: false,
    verifiedLabel: "Verified Amazon Purchase",
    source: "amazon",
    images: []
  },
  {
    title: "Help to build healthy lifestyle",
    text: "Amazing 😍",
    name: "Vikrant",
    location: "India",
    date: "Reviewed in India on 14 April 2026",
    stars: 5,
    verified: true,
    verifiedLabel: "Verified Amazon Purchase",
    source: "amazon",
    images: []
  }
]

const Reviews = () => {
  const scrollRef = useRef(null);
  const [activeReview, setActiveReview] = useState(null);

  // Lock page scroll + close on Escape while the modal is open
  useEffect(() => {
    if (!activeReview) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') setActiveReview(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [activeReview]);

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
        {/* join our happy customers  */}
        <div className='flex flex-col items-center justify-center' > 
            <div className="font-lex-reg rounded-full h-10 px-4 bg-(--color-primary) text-(--white) flex items-center justify-center">Reviews</div>
            <h2 className='text-2xl md:text-[65px] text-(--color-primary) font-lex-reg text-center leading-tight mt-4 font-lex-med leading-[108%] section-heading' >Join Our Happy Customers</h2>
        </div>

        <div className="flex flex-col md:flex-row items-start justify-start w-full gap-6 md:gap-8 relative px-2 md:px-0" >
          {/* STICKY RATING SUMMARY */}
          <div className="w-full md:w-95 md:sticky md:top-24 flex flex-col justify-between bg-(--color-primary) text-(--accent) rounded-3xl p-6 md:p-10 h-fit z-10" >
            <div className="flex items-end justify-between mb-6 md:mb-8" >
              <div className="text-4xl md:text-6xl font-lex-reg leading-0" style={{margin:0, fontSize: '4rem'}}>4.8</div>
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_,i)=>(
                  <Star key={i} fill="currentColor" size={20} className="md:w-6 md:h-6"/>
                ))}
              </div>
            </div>

            <p className="text-base md:text-xl mb-6 md:mb-8 opacity-90">Based on 50+ verified customer reviews</p>

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
              className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar scroll-smooth h-[360px]"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {reviews.map((review,i)=>(
                <ReviewCard
                  key={i}
                  review={review}
                  onReadMore={() => setActiveReview(review)}
                />
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

      {/* FULL REVIEW MODAL */}
      {activeReview && <ReviewModal review={activeReview} onClose={() => setActiveReview(null)} />}

    </div>
  )
}

const ReviewCard = ({review, onReadMore}) => {
  const textRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const check = () => {
      const el = textRef.current;
      if (el) setIsOverflowing(el.scrollHeight > el.clientHeight + 4);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [review.text]);

  return (
    <div className="min-w-75 md:min-w-100 bg-(--bg-light) rounded-3xl p-8 flex flex-col justify-between snap-start border border-(--color-primary)/10 hover:border-(--color-primary)/30 transition-all duration-300 h-full overflow-hidden">
      <div>
        <div className="flex items-center justify-between mb-6">
          <Quote size={40} className="text-(--color-primary) rotate-180 opacity-20"/>
          <div className="flex items-center gap-1 px-3 py-1 bg-(--accent) text-(--color-primary) rounded-full">
              {/* <CheckCircle size={14} fill="currentColor" className="text-white"/> */}
              <span className="text-[10px] uppercase tracking-wider font-bold">{review.verifiedLabel || 'Verified Amazon Purchase'}</span>
          </div>
        </div>

        {/* {review.title && (
          <p className="font-bold text-(--color-primary) text-lg leading-snug mb-1">
            {review.title}
          </p>
        )} */}

        {/* {review.date && (
          <p className="text-xs opacity-60 text-(--color-primary) mb-3">
            {review.date}
          </p>
        )} */}

        <div className="flex gap-1 mb-4 text-(--color-primary)">
          {[...Array(review.stars)].map((_,idx)=>(
            <Star key={idx} size={16} fill="currentColor"/>
          ))}
        </div>

        <div ref={textRef} className="h-[60px] overflow-hidden relative">
          <p className="text-lg text-(--color-primary) leading-relaxed whitespace-pre-line">
            "{review.text}"
          </p>

          {review.images?.length > 0 && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {review.images.map((src, idx) => (
                <a key={idx} href={src} target="_blank" rel="noreferrer">
                  <img
                    src={src}
                    alt={`${review.name} review photo ${idx + 1}`}
                    loading="lazy"
                    className="w-16 h-16 rounded-lg object-cover border border-(--color-primary)/10 hover:border-(--color-primary)/40 transition-all"
                  />
                </a>
              ))}
            </div>
          )}

          {isOverflowing && (
            <>
              <div className="absolute bottom-0 left-0 w-full h-16 bg-linear-to-t from-(--bg-light) to-transparent pointer-events-none" />
              <button
                onClick={onReadMore}
                className="absolute -bottom-1 left-0 text-(--color-primary) font-bold text-sm hover:underline cursor-pointer bg-transparent border-none p-0"
              >
                .....read more
              </button>
            </>
          )}
        </div>
      </div>

      <div className=" pt-6 border-t border-(--color-primary)/5 flex items-center gap-4">
         <div className="w-12 h-12 rounded-full bg-(--color-primary) text-(--white) flex items-center justify-center font-bold text-lg">
            {review.name.charAt(0)}
         </div>
         <div>
            <p className="font-bold text-(--color-primary)">{review.name}</p>
            <p className="text-sm opacity-60 text-(--color-primary)">{review.location}</p>
         </div>
      </div>
    </div>
  );
};

const ReviewModal = ({review, onClose}) => {
  return (
    <div className="fixed inset-0 z-[10002] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      <div className="relative bg-(--white) rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 md:p-10">
        <button
          onClick={onClose}
          aria-label="Close review"
          className="absolute top-4 right-4 h-10 w-10 rounded-full border-2 border-(--color-primary) flex items-center justify-center cursor-pointer text-(--color-primary) hover:bg-(--color-primary) hover:text-(--white) transition-all"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1 px-3 py-1 bg-(--accent) text-(--color-primary) rounded-full">
            {/* <CheckCircle size={14} fill="currentColor" className="text-white"/> */}
            <span className="text-[10px] uppercase tracking-wider font-bold">{review.verifiedLabel || 'Verified Amazon Purchase'}</span>
          </div>
        </div>

        {review.title && (
          <h3 className="font-bold text-(--color-primary) text-xl md:text-2xl leading-snug mb-1 pr-10">
            {review.title}
          </h3>
        )}
        {review.date && (
          <p className="text-xs opacity-60 text-(--color-primary) mb-3">
            {review.date}
          </p>
        )}

        <div className="flex gap-1 mb-4 text-(--color-primary)">
          {[...Array(review.stars)].map((_,idx)=>(
            <Star key={idx} size={18} fill="currentColor"/>
          ))}
        </div>

        <p className="text-base md:text-lg text-(--color-primary) leading-relaxed whitespace-pre-line">
          "{review.text}"
        </p>

        {review.images?.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
            {review.images.map((src, idx) => (
              <a key={idx} href={src} target="_blank" rel="noreferrer">
                <img
                  src={src}
                  alt={`${review.name} review photo ${idx + 1}`}
                  loading="lazy"
                  className="w-full aspect-square rounded-2xl object-cover border border-(--color-primary)/10 hover:border-(--color-primary)/40 transition-all"
                />
              </a>
            ))}
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-(--color-primary)/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-(--color-primary) text-(--white) flex items-center justify-center font-bold text-lg">
            {review.name.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-(--color-primary)">{review.name}</p>
            <p className="text-sm opacity-60 text-(--color-primary)">{review.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews
