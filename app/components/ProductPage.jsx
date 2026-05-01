import React from 'react'
import Product from './Product'
import Reviews from './Reviews'
import Ingredients from './Ingredients'
import Facts from './Facts'
import Faq from './Faq'
import UsVsThem from './UsVsThem'

const ProductPage = ({ product }) => {
  return (
    <>
      <Product product={product} />
      <div className='flex items-center justify-center w-dvw bg-[#f3f6ed] min-h-fit ' >
        {/* Desktop Image */}
        <img
          className='hidden sm:block w-[92dvw]'
          src={`/productPageImage/DetailedIngredients.webp`}
          alt="Daily Goli product ingredients in details"
        />

        {/* Mobile Image */}
        <img
          className='block sm:hidden w-[92dvw]'
          src={`/productPageImage/DetailedIngredientsMobile.webp`}
          alt="Daily Goli product ingredients in details"
        />
      </div>
      <Ingredients />
      <div className='flex items-center justify-center w-dvw bg-[#fbfbf8]' >
        {/* Desktop Image */}
        <img
          className='hidden sm:block w-[92dvw]'
          src={`/productPageImage/KeyBenefits.webp`}
          alt="Daily Goli product benefits in details"
        />

        {/* Mobile Image */}
        <img
          className='block sm:hidden w-[92dvw]'
          src={`/productPageImage/KeyBenefitsMobile.webp`}
          alt="Daily Goli product benefits in details"
        />

      </div>
      {/* Us vs Them section */}
      <UsVsThem />
      <Reviews />
      {/* <Facts /> */}
      <Faq />
    </>
  )
}

export default ProductPage