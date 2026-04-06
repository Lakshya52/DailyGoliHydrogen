import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqData = [
  {
    q: "What is Daily Goli MB-360?",
    a: "Daily Goli MB-360 is a plant-based supplement formulated with CQR-300, Berberine and Chromium to support metabolism and manage cravings."
  },
  {
    q: "How does MB-360 support metabolism?",
    a: "The ingredients help regulate glucose metabolism and may support energy balance and appetite control."
  },
  {
    q: "Is Daily Goli MB-360 vegan?",
    a: "Yes, MB-360 is completely plant-based and suitable for vegan diets."
  },
  {
    q: "How many capsules should I take daily?",
    a: "Follow the dosage mentioned on the product label or consult your healthcare professional."
  },
  {
    q: "Does it help with sugar cravings?",
    a: "Yes, the formula is designed to help manage cravings and support metabolic balance."
  },
  {
    q: "Are there any side effects?",
    a: "Most people tolerate the supplement well, but consult a healthcare professional before use."
  },
  {
    q: "Can I take MB-360 with other supplements?",
    a: "It is generally safe, but consult a professional if you are already taking other supplements."
  },
  {
    q: "How long before I see results?",
    a: "Results vary by individual, but consistent use along with healthy habits is recommended."
  },
  {
    q: "Is MB-360 safe for long term use?",
    a: "When taken according to instructions, it is designed to be safe for ongoing use."
  },
  {
    q: "Where can I buy Daily Goli MB-360?",
    a: "You can purchase it directly from our official website."
  }
];

const Faq = () => {
    const [openItems, setOpenItems] = useState([]);

  const toggleItem = (index) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter((item) => item !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };
  return (
    <div id="faqs" className="min-h-dvh flex items-center justify-start flex-col py-20 px-[10px] md:px-[100px]">
        <div className='flex flex-col items-center justify-center' > 
            <div className="font-lex-reg rounded-full h-10 px-4 bg-(--color-primary) text-(--white) flex items-center justify-center">Any Last Questions ?</div>
            <h1 className='text-[35px] md:text-[65px] text-(--color-primary) font-lex-reg text-center' >Frequent Asked Questions</h1>
            <p className='font-lex-reg text-(--color-primary) text-xl text-center' >Everything you need to know about Daily Goli MB-360, before you buy.</p>
        </div>

         {/* questions container */}
        <div className="w-full md:w-[70%] mt-15 flex flex-col gap-4">
          {faqData.map((item, index) => {
            const isOpen = openItems.includes(index);
            return (
              <div
                key={index}
                className={`rounded-2xl font-lex-reg text-xl w-full text-(--color-primary) transition-all duration-300 ${isOpen ? "bg-(--accent)" : "bg-(--white) hover:bg-(--color-primary) hover:text-(--white) cursor-pointer"}`}
              >
                {/* question */}
                <div
                  onClick={() => toggleItem(index)}
                  className="flex items-center justify-between min-h-20 py-4 px-6 cursor-pointer"
                >
                  <h3 className={`${isOpen ? "font-lex-med" :""} `}>
                    {item.q}
                  </h3>

                  <div className="">
                    {isOpen ? <Minus size={22} /> : <Plus size={22} />}
                  </div>
                </div>

                {/* answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 px-6 ${
                    isOpen ? "max-h-96 pb-6" : "max-h-0"
                  }`}
                >
                  <p className="font-lex-reg text-(--color-primary)">
                    {item.a}
                  </p>
                </div>

              </div>
            );
          })}

        </div>
    </div>
  )
}

export default Faq
