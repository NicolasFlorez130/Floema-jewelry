import React, { useContext, useEffect, useRef, useState, useMemo } from "react"
import { AboutContext } from "../App";
import Data from "./../components/Data";
import Highlight from "./../components/Highlight";
import Scrollbar, { ScrollbarPlugin } from 'smooth-scrollbar';
import Gallery from "../components/Gallery";
import gsap from "gsap";
import { ScrollTrigger as scrollTrigger } from 'gsap/ScrollTrigger';
import { DisableScrollPlugin, setScrollSmooth } from "../utils/utils";
import Nav from './../components/Nav';


Scrollbar.use(DisableScrollPlugin);

gsap.registerPlugin(scrollTrigger);

const About = () => {

   const about = useRef();

   const [aux, setAux] = useState(0);
   const [elements] = useState(() => {
      return {
         gallery1: [],
         gallery2: [],
         data1: {
            label: "ABOUT ME",
            text: [
               "Valentina’s work plays around the surprise of what is possible to make with a simple and thin line: a thread.",
               "Coming from a family with a strong feminine tailoring tradition, she wanted to bring this passionate root into her jewellery world, finding new ways of working with textiles.",
               "She weaves freely thousands of meters of threads on a hydrosoluble fabric, cutting or interlacing them one with the other, to let unexpected connections appear.",
               "Her approach is both experimental and traditional: she likes to combine contemporary methods with ancient techniques, like Filigree.",
               "The latest work was chosen by the “Triennale Design Museum” in Milan to be part of the exhibition “W. Women in Italian design” (April 2016- February 2017)."
            ],
            image: ''
         }, data2: {
            label: "THE BRAND",
            text: [
               "FLOEMA is a new jewelry brand all design and handmade by me, Valentina Caprini, goldsmith, and artist based in Florence.",
               "The name FLOEMA is inspired by the vascular tissue of the plants, which brings the lifeblood from the roots to the branches and makes flowers and fruits bloom.",
               "Each FLOEMA piece is elegant and unique, created with a refined goldsmith’s technique in a small laboratory equipped with machines dated to the beginning of the ‘900.",
               "Like the lifeblood makes the plant evolve, so FLOEMA gives part of its income to PLAN INTERNATIONAL, a charity that works hard to eliminate the child brides phenomenon."
            ],
            image: ''
         }, data3: {
            label: "JEWELRY CARE",
            text: [
               "All FLOEMA jewels are exclusively realized using precious metals: 925 silver (pure for the Filigree) and 18kt gold. All metals are subjected to a natural oxidation process, that depends either on natural factors like oxygen in the air, the salt in the sea, sunlight, skin ph, or on chemical factors, like creams and perfumes.",
               "Please find two ways to clean gold and silver with natural ingredients, To make your piece return to its original condition: Gold is slightly subjected to the oxidation process. To make your jewel shine again put your jewels in a solution of half cup of white vinegar and salt for at least 30 minutes. With a white cotton soft cloth dipped in the solution first brush your piece and then rinse it with plenty of water and voila!",
               "To take the oxidation off silver you have to use one ingredient only: bicarbonate. Pour 250ml of lukewarm water and 5 spoons of bicarbonate in a container. Mixed until it is melted. Leave your silver jewels in the solution over the night, then brush them with a toothbrush until they shine again. Finally, rinse and dry with soft cloth."
            ],
            image: ''
         }, data4: {
            label: "SUSTAINABILITY",
            text: [
               "FLOEMA engages in its own small way to choose green solutions as much as possible.",
               "You will receive each piece in a handmade box realized by Florentine typography using eco-friendly paper (made by 90% of pure cellulose and 10% by cotton fibers), in a recycled and 100% recyclable parcel.",
               "The business cards are realized with recycled cotton fiber cardboard.",
               "All the pieces are created in a small laboratory in the Florentine countryside, preferring using green materials and recycling precious materials."
            ],
            image: ''
         }, highlight1: {
            title: "floema",
            image_1: '',
            image_2: '',
         }, highlight2: {
            title: "Instagram",
            image_1: '',
            image_2: '',
         }
      }
   })

   let pageContent = [];

   const doc = useContext(useMemo(() => AboutContext, [AboutContext]));

   useEffect(() => {

      if (doc) {
         pageContent = [...doc.data.body]
      } else {
         return;
      }

      const arrayAux1 = [];
      pageContent[0].items.forEach(photo => {
         arrayAux1.push(photo.poster.url)
      });
      elements.gallery1 = arrayAux1;

      elements.data1.image = pageContent[1].primary.image.url;

      elements.highlight1.image_1 = pageContent[2].primary.first_image.url
      elements.highlight1.image_2 = pageContent[2].primary.second_image.url

      elements.data2.image = pageContent[3].primary.image.url

      const arrayAux2 = [];
      pageContent[4].items.forEach(poster => {
         arrayAux2.push(poster.poster.url)
      });
      elements.gallery2 = arrayAux2;

      elements.data3.image = pageContent[5].primary.image.url

      elements.data4.image = pageContent[6].primary.image.url

      elements.highlight2.image_1 = pageContent[7].primary.first_image.url
      elements.highlight2.image_2 = pageContent[7].primary.second_image.url

      setAux(last => last += 1);

   }, [doc])

   useEffect(() => {

      if (elements.highlight2.image_2 === '') return;

      //scroll settings
      setScrollSmooth(document.querySelector('.about > .wrapper'), '', 'x');

      const highlights = document.querySelectorAll('.highlight');

      //gsap settings
      gsap.utils.toArray('.about .cover').forEach(cover => {
         gsap.fromTo(cover, { height: '100%' }, {
            scrollTrigger: {
               scroller: '.about > .wrapper',
               trigger: cover,
               start: 'top bottom',
            }, duration: 2, height: 0, ease: 'Power2.in'
         })
      })

      gsap.utils.toArray('.highlight img').forEach((img, i) => {
         gsap.fromTo(img, { y: 200 }, {
            scrollTrigger: {
               scroller: '.about > .wrapper',
               trigger: highlights[i == 0 || i == 1 ? 0 : 1],
               start: 'top bottom',
               end: 'bottom top',
               scrub: 1,
            }, y: -50
         })
      })

      gsap.fromTo('.about .rotable', { rotate: -5 }, {
         scrollTrigger: {
            scroller: '.about > .wrapper',
            trigger: '.about .rotable',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
         }, rotate: 5
      })

      return () => { };

   }, [elements.highlight2.image_2])


   return (
      <section ref={about} className="about | bg-gray text-lightblue overflow-hidden w-[100vw]">
         <Nav buttonValue={'Collections'} color={'text-lightblue'} blur={true} />
         <div className="wrapper | pt-24 h-[100vh]">

            <Gallery images={elements.gallery1} id={'photos'} />

            <h1 className="title | mb-24 mx-6 text-6xl text-center">Creating new dialogues <br />
               between threads and metal.</h1>

            <Data info={elements.data1} imgStyles={'px-6 rounded-t-full'} reversed={true} />

            <Highlight info={elements.highlight1} />

            <Data info={elements.data2} />

            <Gallery images={elements.gallery2} id={'posters'} />

            <div className="relative">
               <h2 className="mb-24 mx-6 text-6xl text-center">The surprise of what is possible <br />
                  tho create from a single,
                  thin thread.</h2>
               <span className="cover | absolute bg-gray bottom-[-10%] h-[110%] w-full"></span>
            </div>

            <Data info={elements.data3} reversed={true} />

            <Data info={elements.data4} imgStyles={'rotable | px-12'} />

            <Highlight info={elements.highlight2} />
         </div>
      </section>
   )
}

export default About