import React from 'react';

const PromoBar = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-8 bg-(--color-primary) text-white z-[10001] flex items-center overflow-hidden border-b border-white/10 shadow-sm">
      <div className="flex items-center gap-12 animate-marquee whitespace-nowrap">
        <div className="flex items-center gap-12">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="w-1 h-1 bg-accent rounded-full animate-pulse"></span>
            Free Shipping!
          </span>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="w-1 h-1 bg-accent rounded-full animate-pulse"></span>
            Use code <span className="text-accent">DAILYGOLI12</span> for 12% off
          </span>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="w-1 h-1 bg-accent rounded-full animate-pulse"></span>
            100% Organic & Natural Ingredients
          </span>
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex items-center gap-12">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="w-1 h-1 bg-accent rounded-full animate-pulse"></span>
            Free Shipping!
          </span>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="w-1 h-1 bg-accent rounded-full animate-pulse"></span>
            Use code <span className="text-accent">DAILYGOLI12</span> for 12% off
          </span>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="w-1 h-1 bg-accent rounded-full animate-pulse"></span>
            100% Organic & Natural Ingredients
          </span>
        </div>
      </div>
    </div>
  );
};

export default PromoBar;

