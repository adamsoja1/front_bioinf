import React from "react"
import Particles from 'react-tsparticles'
import { loadFull } from "tsparticles";



const ParticlesConfig = {
    backgroundMode: {
        enable: true,
        zIndex: -2
      },
    background: {
      color: "#181A18"
    },
    fpsLimit: 60,
    interactivity: {
      detectsOn: "canvas",
      events: {
        resize: true
      }
    },
    particles: {
      color: {
        value: "#ffffff"
      },
      number: {
        density: {
          enable: true,
          area: 1000
        },
        limit: 0,
        value: 300
      },
      opacity: {
        animation: {
          enable: true,
          minimumValue: 0.05,
          speed: 1,
          sync: false
        },
        random: {
          enable: true,
          minimumValue: 0.05
        },
        value: 1
      },
      shape: {
        type: "star"
      },
      size: {
        randmon: {
          enable: true,
          minimumValue: 0.5,
          value: 1
        }
      }
    }
  }




function ParticlesBackgroundAbout() {
  const particlesInit = async (main) => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    console.log(container);
  };
  return (
    <div className="App">
   
     <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
	    	  options={ParticlesConfig}
	  />  
  </div>
  );
}

export default ParticlesBackgroundAbout;