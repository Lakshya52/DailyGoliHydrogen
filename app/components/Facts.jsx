import React, { useRef, useState } from "react";
import { Leaf, Activity, Utensils, Ban, Beaker, CheckCircle } from "lucide-react";

const Facts = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const factsData = [
    {
      title: "Plant Based",
      desc: "100% natural, botanically sourced ingredients for safe, daily wellness.",
      icon: <Leaf size={40} className="text-(--color-primary)" />,
    },
    {
      title: "Craving Control",
      desc: "Specifically targets and reduces unhealthy sugar and junk food cravings.",
      icon: <Ban size={40} className="text-(--color-primary)" />,
    },
    {
      title: "Weight Management",
      desc: "Supports healthy body weight by naturally optimizing your metabolic rate.",
      icon: <Activity size={40} className="text-(--color-primary)" />,
    },
    {
      title: "Appetite Control",
      desc: "Helps you feel fuller for longer, reducing the urge to snack between meals.",
      icon: <Utensils size={40} className="text-(--color-primary)" />,
    },
    {
      title: "Clinically Tested",
      desc: "Formulated with high-potency ingredients backed by modern scientific research.",
      icon: <Beaker size={40} className="text-(--color-primary)" />,
    }
  ];

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div id="benefits" className="px-6 md:px-25 relative min-h-[70dvh] bg-(--white) flex flex-col md:flex-row items-center justify-between pb-20 pt-20 overflow-hidden">
      <img
        src="/images/bottleWithPills.png"
        alt="MB-360 bottle with pills"
        className="hidden md:block absolute w-[35%] h-auto left-0 hover:scale-80 transition-transform duration-700 pointer-events-none z-10"
      />
      
      <div className="md:ml-[35%] w-full md:w-[65%] flex flex-col items-start justify-center gap-6">
        <div className="flex flex-col gap-2">
            <div className="font-lex-reg rounded-full text-sm w-fit h-10 px-6 bg-(--color-primary)  text-(--white) flex items-center justify-center">
              Facts & Benefits
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-(--color-primary) mt-2 font-lex-med leading-[108%] section-heading">Built for Performance</h2>
        </div>

        <div 
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-6 w-full overflow-x-auto pb-10 no-scrollbar snap-x snap-mandatory ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
          style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
        >
          {factsData.map((fact, index) => (
            <div 
              key={index} 
              className="h-80 min-w-70 md:min-w-[320px] bg-(--bg-light) rounded-3xl flex flex-col items-center justify-center gap-4 text-center p-8 snap-start border border-(--color-primary)/5 hover:border-(--color-primary)/20 transition-all duration-300 pointer-events-none"
            >
              <div className="p-4 bg-white rounded-2xl shadow-sm">
                {fact.icon}
              </div>
              <span className="font-lex-med text-(--color-primary) text-2xl">
                {fact.title}
              </span>
              <span className="text-lg font-lex-light text-(--color-primary) opacity-80 leading-relaxed">
                {fact.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Facts;
