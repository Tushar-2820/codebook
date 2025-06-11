import React from 'react'
import { Hero } from './components/Hero.jsx'
import { FeaturedProducts } from './components/FeaturedProducts.jsx'
import  { Testimonial } from './components/Testimonial.jsx'
import { Faq } from './components/Faq.jsx'
import { useTitle } from '../../hooks/useTitle.jsx'


export const HomePage = () => {
  useTitle({title: 'The Ultimate eBook Store'});
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Testimonial />
      <Faq />
    </main>
  )
}


