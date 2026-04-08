import React from "react";

const ingredientsData = [
  {
    amount: "296mg",
    name: "CQR-300",
    desc: (
      <>
        Patented extract for metabolic <br /> health and weight management.
      </>
    ),
  },
  {
    amount: "296mg",
    name: "Berberine HCl",
    desc: (
      <>
        Blood sugar balance and <br /> metabolic function support.
      </>
    ),
  },
  {
    amount: "148mg",
    name: "Eriocitrin (Citrus Fruit)",
    desc: (
      <>
        GLP-1 pathway support and <br /> metabolic efficiency.
      </>
    ),
  },
  {
    amount: "148mg",
    name: "Ceylon Cinnamon",
    desc: (
      <>
        (10:1) Purest cinnamon for blood <br /> sugar balance and metabolism.
      </>
    ),
  },
  {
    amount: "112mg",
    name: "Inulin (Chicory Root)",
    desc: (
      <>
        Prebiotic fiber for gut <br /> health and satiety.
      </>
    ),
  },
  {
    amount: "300mcg",
    name: "Chromium Picolinate",
    desc: (
      <>
        Gold-standard for appetite <br /> and cravings control.
      </>
    ),
  },
];

const Ingredients = () => {
  return (
    <div id="ingredients" className="min-h-dvh py-15 md:py-30  flex flex-col items-center justify-center gap-4 px-4 md:px-25">
      <div className="flex flex-col items-center justify-center my-5 gap-5 ">
        <div className="font-lex-reg w-fit rounded-full h-10 px-4 bg-(--color-primary) text-(--white) flex items-center justify-center text-sm md:text-base">Ingredients</div>
        <p className="text-(--color-primary) text-4xl md:text-[65px] font-lex-reg text-center section-heading" >
          ✦ In The Pill ✦
        </p>
      </div>
      <div className="min-h-fit w-full bg-(--white) rounded-2xl grid grid-cols-1 md:grid-cols-3 grid-rows-auto p-6 md:p-20 gap-8 md:gap-20">
        {ingredientsData.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-2 text-center"
          >
            <span className="font-lex-reg text-(--color-primary) text-3xl md:text-5xl">
              {item.amount}
            </span>

            <span className="font-lex-med text-(--color-primary) text-lg md:text-2xl">
              {item.name}
            </span>

            <span className="text-base md:text-xl font-lex-light text-(--color-primary)">
              {item.desc}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ingredients;
