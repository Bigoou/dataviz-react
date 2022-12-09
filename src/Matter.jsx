import { useEffect, useRef } from 'react'
import Matter, { Engine, Render, Bodies, World } from 'matter-js'
import fifty from './assets/img/50.png'
import zero from './assets/img/0.png'
import one from './assets/img/1.png'
import two from './assets/img/2.png'
import three from './assets/img/3.png'
import four from './assets/img/4.png'
import five from './assets/img/5.png'
import six from './assets/img/6.png'
import height from './assets/img/8.png'
import ten from './assets/img/10.png'
import twentyNine from './assets/img/29.png'

function Comp (props) {
    const boxRef = useRef(null);
    const canvasRef = useRef(null);
    useEffect(() => {
      let Engine = Matter.Engine;
      let Render = Matter.Render;
      let World = Matter.World;
      let Bodies = Matter.Bodies;
  
      let engine = Engine.create({});
  
      let render = Render.create({
        element: boxRef.current,
        engine: engine,
        canvas: canvasRef.current,
        options: {
          width: window.innerWidth,
          height: window.innerHeight,
          background: "transparent",
          wireframes: false
        }
      });
  
      const floor = Bodies.rectangle(150, window.innerHeight, window.innerWidth * 2, 10, {
        isStatic: true,
        render: {
          fillStyle: "black",
        }
      });

      // Add walls;
        const wallLeft = Bodies.rectangle(0, window.innerHeight / 2, 20, window.innerHeight, {
            isStatic: true,
            render: {
                fillStyle: "transparent"
            }
        });

        const wallRight = Bodies.rectangle(window.innerWidth, window.innerHeight / 2, 20, window.innerHeight, {
            isStatic: true,
            render: {
                fillStyle: "transparent"
            }
        });

        // Add ceilling

        const ceilling = Bodies.rectangle(150, 0, window.innerWidth * 2, 20, {
            isStatic: true,
            render: {
                fillStyle: "transparent"
            }
        });
  
      const ball = Bodies.circle(150, 0, 10, {
        restitution: 0.9,
        render: {
          fillStyle: "yellow"
        }
      });
  
      World.add(engine.world, [floor, wallLeft, wallRight]);

      // Add walls
        // World.add(engine.world, [
        //     Bodies.rectangle(150, 0, window.innerWidth, 20, { isStatic: true, render: { fillStyle: "transparent" }}),
        //     Bodies.rectangle(150, 300, 300, 20, { isStatic: true, render: { fillStyle: "transparent" } }),
        //     Bodies.rectangle(0, 150, 20, 300, { isStatic: true, render: { fillStyle: "transparent" } }),
        //     Bodies.rectangle(300, 150, 20, 300, { isStatic: true, render: { fillStyle: "transparent" } })
        // ]);

      // Add multiple balls react
      setTimeout(() => {
          for (let i = 0; i < 9; i++) {
              World.add(engine.world, Bodies.circle(300, -10, 9, {
                  restitution: 0.9,
                  render: {
                      sprite : {
                          texture: zero,
                          xScale: 0.33,
                          yScale: 0.33
                      }
                  }
              }));
          }
      }, 3000);

        for (let i = 0; i < 6; i++) {
            World.add(engine.world, Bodies.circle(150, -80, 28, {
                restitution: 0.9,
                render: {
                    sprite : {
                        texture: one,
                        xScale: 0.33,
                        yScale: 0.33
                    }
                }
            }));
        }

        for (let i = 0; i < 4; i++) {
            World.add(engine.world, Bodies.circle(150, -20, 40, {
                restitution: 0.9,
                render: {
                    sprite : {
                        texture: two,
                        xScale: 0.33,
                        yScale: 0.33
                    }
                }
            }));
        }

        for (let i = 0; i < 11; i++) {
            World.add(engine.world, Bodies.circle(150, -50, 50, {
                restitution: 0.9,
                render: {
                    sprite : {
                        texture: three,
                        xScale: 0.33,
                        yScale: 0.33
                    }
                }
            }));
        }

        World.add(engine.world, Bodies.circle(150, -30, 58, {
            restitution: 0.9,
            render: {
                sprite : {
                    texture: four,
                    xScale: 0.33,
                    yScale: 0.33
                }
                }
            }));

        for (let i = 0; i < 3; i++) {
            World.add(engine.world, Bodies.circle(100, -50, 65, {
                restitution: 0.9,
                render: {
                    sprite : {
                        texture: five,
                        xScale: 0.33,
                        yScale: 0.33
                    }
                }
            }));
        }

        for (let i = 0; i < 2; i++) {
            World.add(engine.world, Bodies.circle(100, -50, 70, {
                restitution: 0.9,
                render: {
                    sprite : {
                        texture: six,
                        xScale: 0.33,
                        yScale: 0.33
                    }
                }
            }));
        }

        World.add(engine.world, Bodies.circle(150, -10, 80, {
            restitution: 0.9,
            render: {
                sprite : {
                    texture: height,
                    xScale: 0.33,
                    yScale: 0.33
                }
                }
            }));

        World.add(engine.world, Bodies.circle(800, -150, 90, {
            restitution: 0.9,
            render: {
                sprite : {
                    texture: ten,
                    xScale: 0.33,
                    yScale: 0.33
                   
                }
                }
            }));

        World.add(engine.world, Bodies.circle(700, 0, 150, {
            restitution: 0.9,
            render: {
                sprite : {
                    texture: twentyNine,
                    xScale: 0.33,
                    yScale: 0.33
                }
                }
            }));

        World.add(engine.world, Bodies.circle(1200, 0, 200, {
            restitution: 0.9,
            render: {
                // fillStyle: "black"
                    sprite : {
                        texture: fifty,
                        xScale: 0.33,
                        yScale: 0.33
                    }
                }
            }));

        // Drag the ball

        let mouse = Matter.Mouse.create(render.canvas),
            mouseConstraint = Matter.MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    render: {
                        visible: false
                    }
                }
            });

        mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
        mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

        World.add(engine.world, mouseConstraint);

        render.mouse = mouse;





  
      Engine.run(engine);
      Render.run(render);
    }, []);
  
    return (
      <div>
        <canvas ref={canvasRef} />
      </div>
    );
    }

export default Comp