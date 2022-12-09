import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { useEffect, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import LocomotiveScroll from 'locomotive-scroll'
import Comp  from './Matter'
import Header from './Header'
import { use } from 'matter-js'
import plus from './assets/img/plusx4.png'
import spotify from './assets/img/spotify-3D.png'
import apple from './assets/img/apple-3D.png'
import deezer from './assets/img/deezer-3D.png'
import balloon1 from './assets/img/balloon1.png'
import balloon2 from './assets/img/balloon2.png'
import balloon3 from './assets/img/balloon3.png'
import podium from './assets/img/podium_rendu_v2.png'
import sticker1 from './assets/img/sticker1.png'
import sticker2 from './assets/img/sticker2.png'
import sticker3 from './assets/img/sticker3.png'
import gobelins1 from './assets/img/gobelins1.png'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const peoplesNumber = 40
  
  const [isVisible, setIsVisible] = useState(false)
  const [loadingCount, setLoadingCount] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [pplbg1, setPplbg1] = useState('hidden')
  const [pplbg2, setPplbg2] = useState('hidden')
  const [pplbg3, setPplbg3] = useState('hidden')

  function handleHover(pplbg) {
    console.log(pplbg);
    if (pplbg === 1) {
      console.log('pplbg1');
      setPplbg1('visible')
    } else if (pplbg === 2) {
      setPplbg2('visible')
    } else if (pplbg === 3) {
      setPplbg3('visible')
    }
  }

  function handleLeave(pplbg) {
    if (pplbg === 1) {
      setPplbg1('hidden')
    } else if (pplbg === 2) {
      setPplbg2('hidden')
    } else if (pplbg === 3) {
      setPplbg3('hidden')
    }
  }


  function useWindowPosition() {
    const [scrollPosition, setPosition] = useState(0);
    useLayoutEffect(() => {
      function updatePosition() {
        setPosition(window.pageYOffset);
      }
      window.addEventListener('scroll', updatePosition);
      updatePosition();
      return () => window.removeEventListener('scroll', updatePosition);
    }, []);
    console.log(scrollPosition);
    return scrollPosition;
  }

  const scrollPosition = useWindowPosition();

  useEffect(() => {
    if (!isLoaded) {
      if (loadingCount < 100) {
        const interval = setInterval(() => {
          setLoadingCount(loadingCount + 1)
          // console.log(loadingCount);
        }, Math.floor(Math.random() * 10))
        return () => clearInterval(interval)
      } else {
        setInterval(() => {
        setIsLoaded(true)
        }, 300)
      }
    }
  }, [loadingCount, isLoaded])

  useEffect(() => {
    if (scrollPosition > 7650) {
      setIsVisible(true)
    }
  }, [scrollPosition])


  const slideInTop = (e, easing, duration) => {
    gsap.from(
      e, 
      {
        duration: duration || 1,
        ease: easing || 'power4.out',
        delay: 0,
        scrollTrigger: {
          trigger: e,
          start : "center center",
          end : "bottom center",
        // markers : {
        //   startColor : "purple",
        //   endColor : "fuchsia",
        //   fontSize : "3rem",
        // },
         scrub: true,
        },
        y: -500,
      }
      )
  }

  const slideInRight = (e, easing, duration) => {
    gsap.from(
      e,
      {
        duration: duration || 1,
        ease: easing || 'power4.out',
        delay: 0,
        scrollTrigger: {
          trigger: "#boxTransi",
          start : "top center",
          end : "center center",
          // markers : true,
        },
        x: 500,
      }
      )
  }

  const slideInLeft = (e, easing, duration) => {
    gsap.from(
      e,
      {
        duration: duration || 1,
        ease: easing || 'power4.out',
        delay: 0,
        scrollTrigger: {
          trigger: "#boxTransi",
          start : "top center",
          end : "center center",
        },
        x: -500,
      }
      )
  }

  const fadeInTop = (e, trigger) => {

    let tl = gsap.timeline();
    tl.fromTo(
      e,
      {
        opacity : 0,
        y: 100
      },
      {
        opacity : 1,
        y: 0,
        duration: 8,
        delay: 0,
        scrollTrigger: {
          trigger: trigger,
          start : "10% center",
          end : "+=80% center",
          scrub : 1,
        // markers : {
        //   startColor : "purple",
        //   endColor : "fuchsia",
        //   fontSize : "3rem",
        // },
        }
      }
    )
    tl.fromTo(
      e,
      {
        opacity : 1,
        y: 0
      },
      {
        opacity : 0,
        y: -100,
        duration: 8,
        delay: 0,
        scrollTrigger: {
          trigger: trigger,
          start : "45% center",
          end : "+=200% center",
          scrub : 1,
        // markers : {
        //   startColor : "purple",
        //   endColor : "fuchsia",
        //   fontSize : "3rem",
        // },
        }
      }
      )
  }

  useEffect(() => {
    fadeInTop(".transition-peoples", "#box5")
  }, [])

  useEffect(() => {
    fadeInTop(".podiumTransi", "#box3")
  }, [])

  useEffect(() => {
    fadeInTop(".pre-transi", "#boxPreTransi")
  }, [])


  let peoplesRef = useRef(null);
  let legendesRef = useRef(null);
  

  const appearPeople = () => {
    peoplesRef.current = gsap.utils.toArray(".people");
    legendesRef.current = gsap.utils.toArray(".legende-item");
    gsap.set(peoplesRef.current, { autoAlpha: 0, opacity: 0 });
    gsap.set(legendesRef.current, { autoAlpha: 0, opacity: 0 });
    
    setTimeout(() => {
      let tl = gsap.timeline();
      tl.to(peoplesRef.current, {
        autoAlpha: 1,
        opacity: 1,
        delay: 5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".peoples",
          scrub: true,
          start: "top center",
          // markers: true,
          end: "center center"
        }
      });
      tl.to(legendesRef.current, {
        autoAlpha: 1,
        opacity: 1,
        delay: 5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".peoples",
          scrub: true,
          start: "center center",
          // markers: true,
          end: "+=10%"
        }
      });
      
    });
  }

  useEffect(() => {
    appearPeople()
  }, [])

  // useEffect(() => {
  //   slideInTop("#spotify")

  // }, [])

  // useEffect(() => {
  //   fadeInTop("#box3")
  // }, [])


  useEffect(() => {
    gsap.to(".bicycle", {
      x: 1100,
      duration: 0.5,
      scrollTrigger: {
        trigger: "#box2",
        start : "30% 50%",
        end : "+=100% 50%",
        scrub : 1,
        // toggleActions: "restart none none none",
        // pin : '#box2',
        // markers : {
        //   startColor : "purple",
        //   endColor : "fuchsia",
        //   fontSize : "3rem",
        // }
      }
    })
    gsap.to("#box2", {
      x: 500, 
      duration: 0.5,
      scrollTrigger: {
        trigger: "#box2",
        start : "40% 50%",
        end : "bottom 50%",
        scrub : 1,
        // toggleActions: "restart none
      }
    
    })

  }, [])

  let almostRef = useRef(null);
  let cardsRef = useRef(null);

  useEffect(() => {
    cardsRef.current = gsap.utils.toArray(".cardLink");
    const apple = cardsRef.current[1];
    cardsRef.current[1] = cardsRef.current[2];
    cardsRef.current[2] = apple;
    gsap.set(cardsRef.current, { autoAlpha: 0, y : 0, opacity: 0 });
    gsap.to(cardsRef.current, {
      autoAlpha: 1,
      y : -700,
      opacity: 1,
      delay: 5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: "#boxTransi",
        scrub: true,
        start: "center center",
        // markers: true,
        end: "+=40% center"
      }
    });
  }, [])

  let balloonsRef = useRef(null);

  useEffect(() => {
    balloonsRef.current = gsap.utils.toArray(".balloon");
    console.log(balloonsRef.current)
    gsap.set(balloonsRef.current, { y : 400 })
    gsap.to(balloonsRef.current[0], {
      y : 0,
      delay: 5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".balloons",
        scrub: true,
        start: "top center",
        // markers: true,
        end: "+=80% center"
      }
    });

    gsap.to(balloonsRef.current[1], {
      y : -300,
      delay: 5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".balloons",
        scrub: true,
        start: "top center",
        // markers: true,
        end: "+=80% center"
      }
    });

    gsap.to(balloonsRef.current[2], {
      y : -700,
      delay: 5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".balloons",
        scrub: true,
        start: "top center",
        // markers: true,
        end: "+=80% center"
      }
    });
  }, [])

  useEffect(() => {
    slideInRight(".dispo")
  }, [])

  useEffect(() => {
    slideInLeft(".everywhere")
  }, [])

  useEffect(() => {
    gsap.to(".dispo", {
      x: -100,
      duration: 0.5,
      scrollTrigger: {
        trigger : "#boxTransi",
        scrub : true,
        start : "top center",
        end : "+=10%",
        // markers : true,
      }
    })
  }, [])

  useEffect(() => {
    almostRef.current = gsap.utils.toArray(".almost");
    gsap.set(almostRef.current, { autoAlpha: 0, opacity: 0 });
    gsap.to(almostRef.current, {
      autoAlpha: 1,
      opacity: 1,
      delay: 5,
      scrollTrigger: {
        trigger: "#boxTransi",
        scrub: true,
        start: "center center",
        // markers: true,
        end: "+=10%"
      }
    });
  }
  , [])

  let cloudRef = useRef(null);

  useEffect(() => {
    cloudRef.current = gsap.utils.toArray(".cloud-circle");
    // Set x, y, background color and border
    gsap.set(cloudRef.current, { x: 0, y: 0, backgroundColor: "#1B1B19", border: "none" });

    gsap.to(cloudRef.current[0], {
      x: -100,
      y: 100,
      backgroundColor: "transparent",
      border: "3px solid black",
      scrollTrigger: {
        trigger: "#box9",
        start : "50% 50%",
        end : "+=70% 50%",
        scrub : 1,
        // toggleActions: "restart none none none",
        // markers : {
        //   startColor : "purple",
        //  endColor : "fuchsia",
        //   fontSize : "3rem",
        // }
      }
    })
    gsap.to(cloudRef.current[1], {
      x: 0,
      y: -130,
      backgroundColor: "transparent",
      border: "3px solid black",
      scrollTrigger: {
        trigger: "#box9",
        start : "50% 50%",
        end : "+=50% 50%",
        scrub : 1,
        // toggleActions: "restart none none none",
        // markers : {
        //   startColor : "purple",
        //  endColor : "fuchsia",
        //   fontSize : "3rem",
        // }
      }
    })
    gsap.to(cloudRef.current[2], {
      x: 150,
      y: 0,
      backgroundColor: "transparent",
      border: "3px solid black",
      scrollTrigger: {
        trigger: "#box9",
        start : "50% 50%",
        end : "+=50% 50%",
        scrub : 1,
        // toggleActions: "restart none none none",
        // markers : {
        //   startColor : "purple",
        //  endColor : "fuchsia",
        //   fontSize : "3rem",
        // }
      }
    })
    gsap.to(cloudRef.current[3], {
      x: 200,
      y: -300,
      backgroundColor: "transparent",
      border: "3px solid black",
      scrollTrigger: {
        trigger: "#box9",
        start : "50% 50%",
        end : "+=50% 50%",
        scrub : 1,
        // toggleActions: "restart none none none",
        // markers : {
        //   startColor : "purple",
        //  endColor : "fuchsia",
        //   fontSize : "3rem",
        // }
      }
    })
    gsap.to(cloudRef.current[4], {
      x: -100,
      y: -50,
      backgroundColor: "transparent",
      border: "3px solid black",
      scrollTrigger: {
        trigger: "#box9",
        start : "50% 50%",
        end : "+=50% 50%",
        scrub : 1,
        // toggleActions: "restart none none none",
        // markers : {
        //   startColor : "purple",
        //  endColor : "fuchsia",
        //   fontSize : "3rem",
        // }
      }
    })
    gsap.to(cloudRef.current[5], {
      x: 150,
      y: 150,
      backgroundColor: "transparent",
      border: "3px solid black",
      scrollTrigger: {
        trigger: "#box9",
        start : "50% 50%",
        end : "+=50% 50%",
        scrub : 1,
        // toggleActions: "restart none none none",
        // markers : {
        //   startColor : "purple",
        //  endColor : "fuchsia",
        //   fontSize : "3rem",
        // }
      }
    })

  }, [])

  let spotifyRef = useRef(null);
  let appleRef = useRef(null);
  let deezerRef = useRef(null);

  useEffect(() => {
    spotifyRef.current = gsap.utils.toArray(".spoItem");
    appleRef.current = gsap.utils.toArray(".appleItem");
    deezerRef.current = gsap.utils.toArray(".deezerItem");
    // console.log(spotifyRef.current);
    // Set x, y, background color and border
    gsap.set(spotifyRef.current, { scale: 0 });
    gsap.set(appleRef.current, { scale: 0 });
    gsap.set(deezerRef.current, { scale: 0 });

    gsap.to(spotifyRef.current,
       {
      scale: 1,
      stagger : 0.1,
      scrollTrigger: {
        trigger: "#box8",
        start: "25% center",
        end: "+=250% center",
        scrub: true,
        // markers : true,
      }

    })

    gsap.to(appleRef.current,
      {
     scale: 1,
     stagger : 0.1,
     scrollTrigger: {
       trigger: "#box8",
       start: "25% center",
       end: "+=250% center",
       scrub: true,
      //  markers : true,
     }

   })

   gsap.to(deezerRef.current,
    {
   scale: 1,
   stagger : 0.1,
   scrollTrigger: {
     trigger: "#box8",
     start: "25% center",
     end: "+=250% center",
     scrub: true,
    //  markers : true,
   }

 })
  }, [])

  let stickersRef = useRef(null);

  useEffect(() => {
    stickersRef.current = gsap.utils.toArray(".sticker");
    gsap.to(stickersRef.current, {
      y : -100,
      stagger : 0.1,
      scrollTrigger: {
        trigger: "#box1",
        start : "40% 50%",
        end : "bottom 50%",
        scrub : 1,
        
        }
        }
        )
  }, [])

  return (
    <div className="App">
      <Header />
      <section className={isLoaded ? 'loader loader-slide-in-top' : 'loader'}>
      {/* <section className="loader loader-slide-in-top"> */}
        <div>
          <h1>{loadingCount}%</h1>
        </div>
        <div className="logo">
          <img src={gobelins1} alt="" />
        </div>
      </section>
      <section id="nextSection">
        <div id="box1" className="box">
        <img className="sticker s-3" src={sticker1} alt="" />
        <img className="sticker s-2" src={sticker2} alt="" />
        <img className="sticker s-1" src={sticker3} alt="" />
        {/* <Comp /> */}
        <div className="home-title">
          <h1 className="mb-10">
            L'année 2022 des
          </h1>
          <h1>
            BDDIs, en musique.
          </h1>
        </div>
        </div>

        <div id="box2" className="box">
          <div className="header">
            <div className="city">
            <svg width="52" height="67" viewBox="0 0 52 67" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M26 67C26 67 52 47.7615 52 25.5955C52 11.4595 40.3594 0 26 0C11.6406 0 0 11.4595 0 25.5955C0 47.7615 26 67 26 67ZM26 34C29.866 34 33 30.866 33 27C33 23.134 29.866 20 26 20C22.134 20 19 23.134 19 27C19 30.866 22.134 34 26 34Z" fill="#1B1B19"/>
            </svg>
            <p className="inter">
              PARIS
            </p>
            </div>
            <div className="bicycle">
            <svg width="91" height="96" viewBox="0 0 112 96" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M72.3333 18.6667C77.4667 18.6667 81.6667 14.4667 81.6667 9.33333C81.6667 4.2 77.4667 0 72.3333 0C67.2 0 63 4.2 63 9.33333C63 14.4667 67.2 18.6667 72.3333 18.6667ZM23.3333 49C10.2667 49 0 59.2667 0 72.3333C0 85.4 10.2667 95.6667 23.3333 95.6667C36.4 95.6667 46.6667 85.4 46.6667 72.3333C46.6667 59.2667 36.4 49 23.3333 49ZM23.3333 88.6667C14.4667 88.6667 7 81.2 7 72.3333C7 63.4667 14.4667 56 23.3333 56C32.2 56 39.6667 63.4667 39.6667 72.3333C39.6667 81.2 32.2 88.6667 23.3333 88.6667ZM50.4 42L61.6 30.8L65.3333 34.5333C71.4 40.6 79.3333 44.3333 89.1333 44.3333V35C82.1333 35 76.5333 32.2 72.3333 28L63.4667 19.1333C61.1333 17.2667 58.8 16.3333 56 16.3333C53.2 16.3333 50.8667 17.2667 49.4667 19.1333L36.4 32.2C34.5333 34.0667 33.6 36.4 33.6 38.7333C33.6 41.5333 34.5333 43.8667 36.4 45.2667L51.3333 58.3333V81.6667H60.6667V52.7333L50.4 42ZM88.6667 49C75.6 49 65.3333 59.2667 65.3333 72.3333C65.3333 85.4 75.6 95.6667 88.6667 95.6667C101.733 95.6667 112 85.4 112 72.3333C112 59.2667 101.733 49 88.6667 49ZM88.6667 88.6667C79.8 88.6667 72.3333 81.2 72.3333 72.3333C72.3333 63.4667 79.8 56 88.6667 56C97.5333 56 105 63.4667 105 72.3333C105 81.2 97.5333 88.6667 88.6667 88.6667Z" fill="#1B1B19"/>
            </svg>
            </div>
            <div className="city">
            <svg width="52" height="67" viewBox="0 0 52 67" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M26 67C26 67 52 47.7615 52 25.5955C52 11.4595 40.3594 0 26 0C11.6406 0 0 11.4595 0 25.5955C0 47.7615 26 67 26 67ZM26 34C29.866 34 33 30.866 33 27C33 23.134 29.866 20 26 20C22.134 20 19 23.134 19 27C19 30.866 22.134 34 26 34Z" fill="#1B1B19"/>
            </svg>
            <p className="inter">
              MOSCOU
            </p>
            </div>
          </div>
          <div className="count">
            <strong>38928</strong>
          </div>
          <div className="footer">
            <h3>MINUTES D'ÉCOUTE EN MOYENNE</h3>
            <h3>SOIT L'ÉQUIVALENT DE PARIS/MOSCOU À VÉLO.</h3>
          </div>
        </div>

        <div id="box3" className="box">
          <h2 className="podiumTransi">Mais certains ont fait bien plus que ça...</h2>
        </div>

        <div id="box4" className="box">
          <div className="podium">
            <div className="faces">
              <div className="face jess">
                <div className="scene-1">
                <p className="inter">JESSY R.</p>
                </div>
                <div className="scene-2">

                </div>
              </div>
              <div className="face hippo">
                <div className="scene-1">
                  <p className="inter">HIPPOLYTE B.</p>
                </div>
                <div className="scene-2">

                </div>
              </div>
              <div className="face thabs">
                <div className="scene-1">
                  <p className="inter">THABIAN B.</p>
                </div>
                <div className="scene-2">

                </div>
              </div>
            </div>
            <img className="podium-img" src={podium} alt="" />
          </div>
        </div>

        <div id="box5" className="box">
          <div className="transition-peoples">
            <h2>Les BDDIs se considèrent-ils</h2>
            <h2>comme des mordus de musique ?</h2>
          </div>
        </div>

        <div id="box6" className="box">
          <div className="peoples">
          <svg className={pplbg1 + ' ppl-bg-1'} width="1081" height="426" viewBox="0 0 1081 426" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M0 10C0 4.47715 4.47716 0 10 0H1071C1076.52 0 1081 4.47715 1081 10V142V274C1081 279.523 1076.52 284 1071 284H442.5C436.977 284 432.5 288.477 432.5 294V416C432.5 421.523 428.023 426 422.5 426H10C4.47717 426 0 421.523 0 416V284V142V10Z" fill="white"/>
          </svg>
          <svg className={pplbg2 + ' ppl-bg-2'} width="1081" height="284" viewBox="0 0 1081 284" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M432 10C432 4.47715 436.477 0 442 0H1071C1076.52 0 1081 4.47715 1081 10V132C1081 137.523 1076.52 142 1071 142H658.5C652.977 142 648.5 146.477 648.5 152V274C648.5 279.523 644.023 284 638.5 284H10C4.47715 284 0 279.523 0 274V152C0 146.477 4.47715 142 10 142H422C427.523 142 432 137.523 432 132V10Z" fill="white"/>
          </svg>
          <svg className={pplbg3 + ' ppl-bg-3'} width="433" height="142" viewBox="0 0 433 142" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="433" height="142" rx="10" transform="matrix(-1 0 0 1 433 0)" fill="white"/>
          </svg>


            {[...Array(peoplesNumber)].map((e, i) => (
              <svg className="people" onMouseEnter={() => i < 24 ? handleHover(1) : i < ([...Array(peoplesNumber)].length - 4) ? handleHover(2) : handleHover(3) } onMouseLeave={() => i < 24 ? handleLeave(1) : i < ([...Array(peoplesNumber)].length - 4) ? handleLeave(2) : handleLeave(3) } key={i} width="74" height="110" viewBox="0 0 74 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0C0 14.1429 8.24571 27.0286 21.1429 33.1048V110H31.7143V73.3333H42.2857V110H52.8571V33.0524C65.7543 27.0286 74 14.1429 74 0H63.4286C63.4286 6.94615 60.6441 13.6078 55.6878 18.5195C53.2337 20.9515 50.3202 22.8806 47.1138 24.1968C43.9073 25.513 40.4706 26.1905 37 26.1905C29.9907 26.1905 23.2685 23.4311 18.3122 18.5195C13.3559 13.6078 10.5714 6.94615 10.5714 0M37 0C31.1329 0 26.4286 4.6619 26.4286 10.4762C26.4286 16.2905 31.1329 20.9524 37 20.9524C42.8671 20.9524 47.5714 16.2905 47.5714 10.4762C47.5714 4.6619 42.8671 0 37 0Z" 
                fill={i < 24 ? '#A1D6D6' : i < ([...Array(peoplesNumber)].length - 4) ? '#CBB0E7' : '#7A7BA7'}/>
              </svg>
            ))}
          </div>
          <div className="legende inter">
            <div onMouseEnter={() => handleHover(1)} onMouseLeave={() => handleLeave(1)} className="legende-item">
              <div className="circle-yes"></div>
                OUI
            </div>
              <div onMouseEnter={() => handleHover(2)} onMouseLeave={() => handleLeave(2)} className="legende-item">
                <div className="circle-bof"></div>
                BOF
            </div>
              <div onMouseEnter={() => handleHover(3)} onMouseLeave={() => handleLeave(3)} className="legende-item">
                <div className="circle-no"></div>
                NON
            </div>
          </div>
        </div>

       

       

        <div id="box9" className="box">
          <div className="title">
            <h2>Artistes et genres les plus écoutés</h2>
          </div>
          <svg className="cloud-1" width="316" height="205" viewBox="0 0 316 205" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle r="80.3955" transform="matrix(-1 0 0 1 235.604 124.12)" fill="#1B1B19"/>
            <circle r="50.7761" transform="matrix(-1 0 0 1 165.082 50.7761)" fill="#1B1B19"/>
            <ellipse rx="67.8462" ry="69.0577" transform="matrix(-1 0 0 1 80.9615 76.3272)" fill="#1B1B19"/>
            <ellipse rx="26.6538" ry="27.8654" transform="matrix(-1 0 0 1 3.4233 66.6349)" fill="#1B1B19"/>
            <circle r="65.4231" transform="matrix(-1 0 0 1 3.42311 138.115)" fill="#1B1B19"/>
            <rect width="232.615" height="116.308" transform="matrix(-1 0 0 1 236.039 87.2305)" fill="#1B1B19"/>
          </svg>
          <svg className="cloud-2" width="156" height="85" viewBox="0 0 156 85" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="33.1791" cy="51.224" r="33.1791" fill="#1B1B19"/>
            <circle cx="62.2836" cy="20.9552" r="20.9552" fill="#1B1B19"/>
            <circle cx="92.5521" cy="25.612" r="20.9552" fill="#1B1B19"/>
            <circle cx="122.821" cy="51.224" r="33.1791" fill="#1B1B19"/>
            <rect x="32.5969" y="35.5073" width="90.806" height="48.8955" fill="#1B1B19"/>
          </svg>

          <div className="balloons">
            <div>
              <img className="balloon balloon-1" src={balloon1} alt="" />
            </div>
            <div>
              <img className="balloon balloon-2" src={balloon2} alt="" />
            </div>
            <div>
              <img className="balloon balloon-3" src={balloon3} alt="" />
            </div>
          </div>
          <div className="cloud">
              <div className="cloud-circle c-1">
                <div class="center">
                  <h3>RAP</h3>
                  <p className="inter">31/40</p>
                </div>
              </div>
              <div className="cloud-circle c-2">
                <div class="center">
                  <h3 className="rock">ROCK</h3>
                  <p className="inter">9/40</p>
                </div>
              </div>
              <div className="cloud-circle c-3">
                <div class="center">
                  <h3>POP</h3>
                  <p className="inter">29/40</p>
                </div>
              </div>
              <div className="cloud-circle c-4">
                <div class="center">
                  <h3>R&B</h3>
                  <p className="inter">12/40</p>
                </div>
              </div>
              <div className="cloud-circle c-5">
                <div class="center">
                  <h3 className="electro">ÉLECTRO</h3>
                  <p className="inter">9/40</p>
                </div>
              </div>
              <div className="cloud-circle c-6">
                <div class="center">
                  <h3>AUTRES</h3>
                  <p className="inter">22/40</p>
                </div>
              </div>
          </div>
        </div>

        <div id="box10" className="box">
          <div className="title">
            <div className="concert-title">
              <h2>3 des BDDIs ont vu</h2>
                  <img class="mx plus" src={plus} alt="" />
              <h2>
            de concerts
            </h2>
            </div>
            <div>
            <h2 className="z-index">que les 37 autres BDDIs réunis.</h2>
            </div>
          </div>
          {isVisible && 
              <div className="concerts">
                <Comp />
              </div>
    }
        </div>

        <div id="box11" className="box">
          <div className="title">
            <h2>Découvrir de nouveaux titres</h2>
          </div>
          <div className="histogramme">
            <div className="item">
              <div className="bar b-1">
                <p className="inter">
                  31/40
                </p>
              </div>
              <div className="legende l-discover">
                <p className="inter">
                  AMIS ET FAMILLE
                </p>
              </div>
            </div>

            <div className="item">
              <div className="bar b-2">
                <p className="inter">
                  29/40
                </p>
              </div>
              <div className="legende l-discover">
                <p className="inter">
                  RECOMMENDATIONS AUTOMATIQUES
                </p>
              </div>
            </div>

            <div className="item">
              <div className="bar b-3">
                <p className="inter">
                  27/40
                </p>
              </div>
              <div className="legende l-discover">
                <p className="inter">
                  CONCERTS & FESTIVALS
                </p>
              </div>
            </div>

            <div className="item">
              <div className="bar b-4">
                <p className="inter">
                  27/40
                </p>
              </div>
              <div className="legende l-discover">
                <p className="inter">
                  RÉSEAUX SOCIAUX & MÉDIAS
                </p>
              </div>
            </div>

            <div className="item">
              <div className="bar b-5">
                <p className="inter">
                  22/40
                </p>
              </div>
              <div className="legende l-discover">
                <p className="inter">
                  PLAYLISTS DES PLATEFORMES
                </p>
              </div>
            </div>

            <div className="item">
              <div className="bar b-6">
                <p className="inter">
                  4/40
                </p>
              </div>
              <div className="legende l-discover">
                <p className="inter">
                  RADIOS & TÉLÉVISIONS
                </p>
              </div>
            </div>
            
          </div>
        </div>

        <div id="box8" className="box">
          <div className="title plateforme-title">
          <h2>Plateformes utilisées</h2>
          </div>

          <div className="spotify">
            <div className="spoItem">
              <p className="inter">SPOTIFY</p>
              <h3 className="inter mt-0">62.5%</h3>
            </div>
              <div className="c-spotify">
                <div className="circle-spo spoItem"></div>
                <img className="resize spotify3D spoItem" src={spotify} alt="" />
              </div>
          </div>

          <div className="apple">
            <div className="appleItem">
              <p className="inter ">APPLE MUSIC</p>
              <h3 className="inter mt-0">22.5%</h3>
            </div>
              <div className="c-spotify">
                <div className="circle-app appleItem"></div>
                <img className="resize apple3D appleItem" src={apple} alt="" />
              </div>
          </div>

          <div className="deezer">
            <div className="deezerItem">
              <p className="inter">DEEZER</p>
              <h3 className="inter mt-0">15%</h3>
            </div>
              <div className="c-spotify">
                <div className="circle-dee deezerItem"></div>
                <img className="resize deezer3D deezerItem" src={deezer} alt="" />
              </div>
          </div>

        </div>

        <div className="box" id="boxPreTransi">
          <div className="pre-transi">
          <h2>
            Personne n'a le même morceau le plus écouté,
          </h2>
          <h2>
            alors on a fait une playlist avec tous
          </h2>
          <h2>
            les top titres de la classe.
          </h2>
          </div>
        </div>

        <div className="box" id="boxTransi">
          <h2>
            <span className="dispo">Disponible </span>
            <span className="almost">(presque) </span>
            <span className="everywhere">partout.</span>
          </h2>
        </div>

        
              
        <div id="box7" className="box">
          <a class="cardLink" href="https://open.spotify.com/playlist/29rNCLXNWlQG0use667vqa?si=b4eb74bd78294ad0" target="_blank">
            <div id="spotify" className="card card1 inter">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M39.75 22.25C31.75 17.5 18.375 17 10.75 19.375C9.5 19.75 8.25 19 7.875 17.875C7.5 16.625 8.25 15.375 9.375 15C18.25 12.375 32.875 12.875 42.125 18.375C43.25 19 43.625 20.5 43 21.625C42.375 22.5 40.875 22.875 39.75 22.25ZM39.5 29.25C38.875 30.125 37.75 30.5 36.875 29.875C30.125 25.75 19.875 24.5 12 27C11 27.25 9.875 26.75 9.625 25.75C9.375 24.75 9.875 23.625 10.875 23.375C20 20.625 31.25 22 39 26.75C39.75 27.125 40.125 28.375 39.5 29.25ZM36.5 36.125C36 36.875 35.125 37.125 34.375 36.625C28.5 33 21.125 32.25 12.375 34.25C11.5 34.5 10.75 33.875 10.5 33.125C10.25 32.25 10.875 31.5 11.625 31.25C21.125 29.125 29.375 30 35.875 34C36.75 34.375 36.875 35.375 36.5 36.125ZM25 0C21.717 0 18.4661 0.646644 15.4329 1.90301C12.3998 3.15938 9.6438 5.00087 7.32233 7.32233C2.63392 12.0107 0 18.3696 0 25C0 31.6304 2.63392 37.9893 7.32233 42.6777C9.6438 44.9991 12.3998 46.8406 15.4329 48.097C18.4661 49.3534 21.717 50 25 50C31.6304 50 37.9893 47.3661 42.6777 42.6777C47.3661 37.9893 50 31.6304 50 25C50 21.717 49.3534 18.4661 48.097 15.4329C46.8406 12.3998 44.9991 9.6438 42.6777 7.32233C40.3562 5.00087 37.6002 3.15938 34.5671 1.90301C31.5339 0.646644 28.283 0 25 0Z" fill="#1B1B19"/>
            </svg>

              Spotify
            </div>
          </a>

          <a class="cardLink" href="https://music.apple.com/fr/playlist/bddi-music-2022/pl.u-b3b8Re4HK5ggLDM" target="_blank">
            <div id="apple" className="card card2 inter">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M49.9931 12.7568L49.9952 12.5547C49.9952 11.0067 49.8119 9.50248 49.4681 8.06284L49.4952 8.19409C48.8739 5.5821 47.257 3.31613 44.9892 1.87924L44.9475 1.85424C43.7796 1.09797 42.4708 0.585607 41.0998 0.347931L41.0373 0.339597C39.9686 0.152483 38.8869 0.0480028 37.8021 0.0270845H37.7792C37.6959 0.0270845 37.6063 0.00625026 37.5209 0H12.4702C12.1535 0.0208342 11.8452 0.0354181 11.5223 0.0541689C9.92849 0.0836449 8.35046 0.37577 6.85171 0.918788L6.95379 0.887537C5.6274 1.39016 4.41679 2.15671 3.3952 3.1408C2.37361 4.12488 1.5623 5.30604 1.01036 6.61278L0.985363 6.68153C0.631216 7.53365 0.366647 8.52535 0.235404 9.55665L0.229154 9.61498C0.12291 10.3296 0.0479141 11.1796 0.0208322 12.0422V12.0755C0.0208322 12.1422 0.00624966 12.2047 0 12.2693V37.737C0.0208322 38.0287 0.0354147 38.3266 0.0562469 38.6204C0.0979113 40.4142 0.477057 42.1059 1.13119 43.6539L1.09786 43.5643C1.71501 44.9628 2.63177 46.2086 3.78332 47.2137C4.93488 48.2189 6.29313 48.9588 7.76208 49.3812L7.83499 49.4C8.62036 49.6312 9.53698 49.8 10.4828 49.8729L10.5286 49.875C11.6848 49.9854 12.841 50 14.0013 50H36.9751C38.1292 50 39.2645 49.9229 40.377 49.7771L40.2457 49.7917C41.9694 49.6062 43.6255 49.019 45.0809 48.077L45.0371 48.1041C46.7421 46.9979 48.0924 45.424 48.9265 43.5706L48.9536 43.5039C49.2994 42.7059 49.5681 41.7767 49.716 40.81L49.7244 40.7454C49.9369 39.3322 50.0268 37.9032 49.9931 36.4744V12.763V12.7568ZM36.6105 21.0696V32.9701L36.6126 33.143C36.6126 33.991 36.4251 34.7973 36.0876 35.5181L36.1022 35.4827C35.8248 36.0608 35.4255 36.5719 34.9318 36.9808C34.438 37.3897 33.8615 37.6868 33.2419 37.8516L33.2107 37.8578C32.4917 38.066 31.7503 38.187 31.0025 38.2183H30.9816C30.9212 38.2224 30.8525 38.2224 30.7817 38.2224C29.8986 38.2232 29.0415 37.9242 28.3507 37.3742C27.6598 36.8242 27.1761 36.0559 26.9789 35.1952C26.7816 34.3344 26.8824 33.4321 27.2648 32.6362C27.6473 31.8402 28.2886 31.1976 29.0838 30.8138L29.1067 30.8034C29.7171 30.5117 30.4296 30.2783 31.1712 30.1367L31.2275 30.1283C32.0149 29.9575 32.8065 29.8096 33.5898 29.6283C33.8564 29.5835 34.1022 29.4563 34.2927 29.2646C34.4833 29.0729 34.609 28.8263 34.6523 28.5595V28.5533C34.6806 28.424 34.6946 28.2919 34.6939 28.1595V16.809C34.6925 16.6752 34.6736 16.5421 34.6377 16.4132L34.6398 16.4236C34.6118 16.2803 34.5329 16.1519 34.4176 16.0623C34.3023 15.9727 34.1585 15.9278 34.0127 15.9361H34.0148C33.644 15.9632 33.3065 16.0111 32.9753 16.0819L33.0253 16.0736C31.442 16.3861 29.8588 16.7028 28.2755 17.0236L20.5676 18.582C20.5343 18.582 20.501 18.6029 20.4676 18.6091C20.2258 18.6414 20.006 18.7663 19.8544 18.9575C19.7029 19.1487 19.6314 19.3913 19.6552 19.6341V19.63V36.1536L19.6573 36.3515C19.6573 37.2015 19.4927 38.012 19.1906 38.7516L19.2052 38.7079C18.9377 39.3377 18.5287 39.8975 18.0099 40.3437C17.4911 40.79 16.8765 41.1106 16.2137 41.2809L16.1824 41.2871C15.4595 41.4995 14.7127 41.6199 13.9597 41.6455H13.943C13.0003 41.699 12.071 41.4027 11.3333 40.8133C10.5956 40.2239 10.1013 39.3829 9.94529 38.4516L9.94321 38.4287C9.78056 37.5456 9.9284 36.6335 10.3617 35.847C10.7949 35.0606 11.4869 34.4482 12.3202 34.1139L12.3472 34.1056C13.069 33.821 13.817 33.6082 14.5805 33.4701L14.6554 33.4597C15.2533 33.3347 15.8533 33.218 16.447 33.091C16.7941 33.0409 17.1116 32.8673 17.3412 32.6021C17.5707 32.3369 17.697 31.9979 17.6969 31.6472V31.6013V31.6034V12.7693C17.6969 12.5005 17.7282 12.2401 17.7886 11.9901L17.7844 12.013C17.8504 11.7445 17.9917 11.5004 18.1918 11.3096C18.3918 11.1187 18.6423 10.9891 18.9136 10.9359L18.9219 10.9338C19.4531 10.7963 19.9947 10.7004 20.5343 10.59C22.0613 10.2775 23.5883 9.965 25.1174 9.66499L29.8463 8.70661C31.242 8.42743 32.6378 8.14409 34.0336 7.87324C34.4106 7.78574 34.8814 7.70865 35.3606 7.65657L35.4168 7.6524C35.5599 7.63454 35.7051 7.647 35.843 7.68898C35.9809 7.73095 36.1085 7.8015 36.2174 7.89603C36.3262 7.99056 36.414 8.10695 36.4749 8.23763C36.5358 8.36832 36.5685 8.51036 36.5709 8.65453C36.5876 8.79412 36.5959 8.95454 36.5959 9.11705V21.0613L36.6105 21.0696Z" fill="#1B1B19"/>
            </svg>
              Apple Music
            </div>
          </a>

          <a class="cardLink" href="https://deezer.page.link/mgsnBfvYzrQauedA8" target="_blank">
            <div id="deezer" className="card card3 inter">
            <svg fill="none" height="33" viewBox="0 0 50 33" width="50" xmlns="http://www.w3.org/2000/svg">
              <path d="m39.1875 0v6.33614h10.8125v-6.33614zm-26.125 8.82458v6.32982h10.8104v-6.32982h-10.8125zm26.125 0v6.32982h10.8125v-6.32982zm-26.125 8.81202v6.3299h10.8104v-6.3299h-10.8125zm13.0646 0v6.3299h10.8125v-6.3299zm13.0625 0v6.3299h10.8104v-6.3299h-10.8125zm-39.1896 8.8162v6.3341h10.8125v-6.3362h-10.8125zm13.0625 0v6.3341h10.8104v-6.3362h-10.8125zm13.0646 0v6.3341h10.8125v-6.3362h-10.8125zm13.0625 0v6.3341h10.8104v-6.3362h-10.8125z" fill="#1b1b19"/>
            </svg>
              Deezer
            </div>
          </a>
        </div>
      </section>
    </div>
  )
}

export default App
