
  export const particlesConfig = {
    backgroundMode: {
      enable: true,
      zIndex: -2
    },
    background: {
      color: "#ffffff "
    },
    fpsLimit: 60,
    interactivity: {
      detectsOn: "canvas",
      events: {
        onClick: { enable: true, mode: "repulse" },
        // onHover: {
        //   enable: true,
        //   mode: "bubble",
        //   parallax: { enable: false, force: 2, smooth: 10 }
        // },
        onHover: { enable: true, mode: "repulse" },
        resize: true
      }
    },
    particles: {
      number: {
        value: 66,
        color:'#f0000',
        density: {
          enable: true,
          value_area: 1200
        }
        
      },
      shape: {
        type: "circle",
        
        stroke: {
          width: 0,
          color:'#f0000',
        },
        polygon: {
          nb_sides: 5
        }
      },
      line_linked: {
        enable: true,
        distance: 100,
        color: "#000000",
        opacity: 0.4,
        width: 1,
        shadow: {
          enable: true,
          color: "#000000",
          blur: 6
        }
      },
      move: {
        enable: true,
        random: true,
        speed: 0.6,
        attract: {
          rotateX: 600,
          rotateY: 1200
        }
      },
      size: {
        value: 4,
        random: true,
        anim: {
          speed: 40,
          size_min: 0.1
        }
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.5,
          sync: false
        }
      }
    }
  }
  
  
  
  
  
  
  
  export default particlesConfig;