import React, { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import sizes from '../assets/icons/sizes.svg';
import star from '../assets/icons/star.svg';
import { useRef } from 'react';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger as scrollTrigger } from 'gsap/ScrollTrigger';
import { ColorContext } from '../App';
import { hide, show } from './Transition';
import useScrollSmooth from '../hooks/useScrollSmooth';

gsap.registerPlugin(scrollTrigger);

const ItemData = ({ item }) => {
   const setColor = useContext(ColorContext);

   const nav = useNavigate();

   const wrapper = useRef();
   const container = useRef();
   const image = useRef();

   function switchImage() {
      const tl = gsap.timeline();
      tl.to(image.current, {
         duration: 0.5,
         rotateY: 90,
         ease: 'power3.in',
         onComplete: () => {
            image.current.src =
               image.current.src === item.product_image.url
                  ? item.model_image.url
                  : item.product_image.url;
         },
      });
      tl.to(image.current, { duration: 0.5, rotateY: 0, ease: 'power3.out' });
   }

   async function buttonClick() {
      setColor('text-orange');
      await show();
      nav('/collections');
      hide();
   }

   useEffect(() => {
      gsap.fromTo(
         image.current,
         { y: '-100vh' },
         { duration: 0.8, y: 0, ease: 'power3.in', opacity: 1 }
      );

      if (item) {
         useScrollSmooth(document.querySelector('.itemData > .wrapper'), 'y', 'x');

         gsap.utils.toArray('.itemData .cover').forEach(cover => {
            gsap.to(cover, {
               scrollTrigger: {
                  scroller: '.itemData > .wrapper',
                  trigger: cover,
                  start: 'top 80%',
                  end: '200% top',
               },
               duration: 0.3,
               height: 0,
               ease: 'Power2.in',
            });
         });
      }
   }, [item]);

   return (
      <section ref={container} className=" itemData | font-light text-light">
         <div
            ref={wrapper}
            className="wrapper | h-[100vh] py-14 px-6 w-full
            lg:p-14">
            <div className="firstContainer | m-auto max-w-[1200px] lg:grid lg:grid-cols-2">
               <div className="imageWrapper | pb-8 relative lg:inline-block lg:relative lg:w-full">
                  <img
                     ref={image}
                     onClick={switchImage}
                     className="image | aspect-[3/4] cursor-pointer m-auto object-cover opacity-0 w-[100%]
                        sm:w-3/5 | lg:w-4/5"
                     src={item.product_image.url}
                     alt={item.alt}
                  />
                  <img className="hidden" src={item.model_image.url} alt={item.alt} />
               </div>
               <div className="overflow-hidden lg:pl-8">
                  <div className="title | relative">
                     <span className="cover | absolute bg-brown bottom-0 h-[100%] w-full"></span>
                     <h2 className="font-['Suisse'] pb-6 text-lg uppercase lg:text-sm">
                        {item.collection}
                     </h2>
                     <h1 className="text-8xl lg:text-7xl">
                        {item.name
                           .replaceAll('-', ' ')
                           .split('_')
                           .map((span, i) => {
                              return i === 2 ? (
                                 <span key={i} className="flex gap-2 items-center">
                                    {span.split(' ').map((subSpan, i) =>
                                       i === 1 ? (
                                          <span key={i} className="text-6xl">
                                             {' '}
                                             {subSpan}{' '}
                                          </span>
                                       ) : (
                                          <span key={i} className="text-xl">
                                             {subSpan}
                                          </span>
                                       )
                                    )}
                                    <br />
                                 </span>
                              ) : (
                                 <span key={i}>
                                    {span}
                                    <br />
                                 </span>
                              );
                           })}
                     </h1>
                  </div>
                  <div className="technicDetails | py-5 relative lg:py-3">
                     <span className="cover | absolute bg-brown bottom-0 h-full w-full"></span>
                     <div className="sizes | flex items-center mr-6 my-6 lg:my-4">
                        <span className="icon">
                           <img
                              className="w-12 mr-10 lg:w-10 lg:mr-6"
                              src={sizes}
                              alt="sizes icon"
                           />
                        </span>
                        <span>{item.sizes}</span>
                     </div>
                     <div className="materials | flex items-center my-6">
                        <span className="icon">
                           <img
                              className="w-12 mr-10 lg:w-10 lg:mr-6"
                              src={star}
                              alt="sizes icon"
                           />
                        </span>
                        <span>{item.material}</span>
                     </div>
                  </div>
               </div>
            </div>
            <div className="m-auto max-w-[1200px]">
               <div className="moreInfo | relative lg:grid lg:grid-cols-2 lg:gap-8">
                  <div className="info | flex mb-6 mr-6">
                     <span className="cover | absolute bg-brown bottom-0 h-full w-full"></span>
                     <p className="label | flex-none h-12 font-light min-w-[4rem] mr-6 w-min">
                        INFO
                     </p>
                     <div>{item.description}</div>
                  </div>
                  <div className="info | flex mr-6">
                     <span className="cover | absolute bg-brown bottom-0 h-full w-full"></span>
                     <p className="label | flex-none h-12 font-light min-w-[4rem] mr-6 w-min">
                        YOU SHOULD KNOW
                     </p>
                     <div>
                        Each FLOEMA jewel is entirely handmade: any difference from the original
                        picture evidences the unique and artisanal manufacture of the piece.
                     </div>
                  </div>
               </div>
               <div className="buttons | pt-8 relative">
                  <a href="https://www.floemajewelry.com/" className="text-4xl">
                     Shop It <span className="font-['Suisse']">↗</span>
                  </a>
                  <button
                     onClick={buttonClick}
                     className="block border-[1px] border-light border-solid m-auto mt-12 px-10 py-4 rounded-[100%] lg:mt-4 hover:bg-light hover:text-brown transition-[.2s]">
                     CLOSE
                  </button>
               </div>
            </div>
         </div>
      </section>
   );
};

export default ItemData;
