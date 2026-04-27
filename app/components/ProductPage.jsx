import React from 'react'
import Product from './Product'
import Reviews from './Reviews'
import Ingredients from './Ingredients'
import Facts from './Facts'
import Faq from './Faq'

const ProductPage = ({ product }) => {
  return (
    <>
      <Product product={product} />
      <img src="/productPageImage/DetailedIngredients.webp" alt="Daily Goli product ingredients in details" />
      <Reviews />
      <Ingredients />
      <img src="/productPageImage/KeyBenefits.webp" alt="Daily Goli product benefits in details" />
      {/* <Facts /> */}
      <Faq />
    </>
  )
}

export default ProductPage