import React from 'react';

const UsVsThem = () => {
  return (
    <>
<div className='flex items-center justify-center w-full pb-20' id='comparison' >

    <div className="w-full md:w-[80%] mt-20 flex flex-col gap-8 px-6 md:px-0">
      <div className="flex flex-col items-center justify-center gap-3">
        <h2 className="text-3xl md:text-5xl font-lex-med text-(--color-primary) text-center leading-relaxed section-heading">
          Same price. Double the capsules. More ingredients. The choice is clear.
        </h2>
      </div>
      <div className="overflow-x-auto border border-(--bg-light) custom-scrollbar">
        <table className="w-full border-collapse min-w-[550px] md:min-w-full text-sm md:text-base">
          <thead>
            <tr className="bg-(--bg-light)">
              <th className="p-4 md:p-6 text-left"></th>
              <th className="bg-(--color-primary) text-(--accent) p-4 md:p-6 text-left font-lex-reg ">
                Daily Goli MB-360
              </th>
              <th className="p-4 md:p-6 text-left font-lex-reg min-w-[120px]">Others</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b border-(--bg-light)">
              <td className="p-4 md:p-6 font-lex-reg">Price</td>
              <td className="p-4 md:p-6 bg-(--color-primary) text-(--accent) font-lex-reg">₹1,499</td>
              <td className="p-4 md:p-6">₹1,799+</td>
            </tr>

            <tr className="border-b border-(--bg-light)">
              <td className="p-4 md:p-6">Capsules</td>
              <td className="p-4 md:p-6 bg-(--color-primary) text-(--accent) font-lex-reg">60 Capsules</td>
              <td className="p-4 md:p-6">30–60 Capsules</td>
            </tr>

            <tr className="border-b border-(--bg-light)">
              <td className="p-4 md:p-6">Value/Day</td>
              <td className="p-4 md:p-6 bg-(--color-primary) text-(--accent) font-lex-reg">₹50/day</td>
              <td className="p-4 md:p-6">₹33–₹100</td>
            </tr>

            <tr className="border-b border-(--bg-light)">
              <td className="p-4 md:p-6">Berberine HCl</td>
              <td className="p-4 md:p-6 bg-(--color-primary) text-(--accent) font-lex-reg">✓ 296mg</td>
              <td className="p-4 md:p-6">✕ Usually Not</td>
            </tr>

            <tr className="border-b border-(--bg-light)">
              <td className="p-4 md:p-6">CQR-300</td>
              <td className="p-4 md:p-6 bg-(--color-primary) text-(--accent) font-lex-reg">✓ 296mg</td>
              <td className="p-4 md:p-6">✕ Rarely</td>
            </tr>

            <tr className="border-b border-(--bg-light)">
              <td className="p-4 md:p-6">Inulin Prebiotic</td>
              <td className="p-4 md:p-6 bg-(--color-primary) text-(--accent) font-lex-reg">✓ 112mg</td>
              <td className="p-4 md:p-6">✕ Rarely</td>
            </tr>

            <tr className="border-b border-(--bg-light)">
              <td className="p-4 md:p-6">Total Ingredients</td>
              <td className="p-4 md:p-6 bg-(--color-primary) text-(--accent) font-lex-reg">6 Active</td>
              <td className="p-4 md:p-6">2–3 Ingredients</td>
            </tr>

            <tr>
              <td className="p-4 md:p-6 rounded-bl-2xl">WHO-GMP Certified</td>
              <td className="p-4 md:p-6 bg-(--color-primary) text-(--accent) font-lex-reg">✓ Yes</td>
              <td className="p-4 md:p-6 rounded-br-2xl">Varies</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</div>

    </>
  );
};

export default UsVsThem;
