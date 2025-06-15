function revealToSpan() {
    document.querySelectorAll(".reveal").forEach(function (elem) {
      let parent = document.createElement("span");
      let child = document.createElement("span");
  
      parent.classList.add("parent");
      child.classList.add("child");
  
      child.innerHTML = elem.innerHTML;
      parent.appendChild(child);
      elem.innerHTML = "";
      elem.appendChild(parent);
    });
  }
  
  function valueSetters() {
    gsap.set("#nav a", { y: "-100%", opacity: 0 });
    gsap.set("#home .parent .child", { y: "100%" });
    gsap.set("#home .row img", { opacity: 0 });
  
    document
      .querySelectorAll(
        "#Visual path, #Visual polyline, #Visual line, #Visual rect"
      )
      .forEach(function (el) {
        const length = el.getTotalLength();
        el.style.strokeDasharray = length + "px";
        el.style.strokeDashoffset = length + "px";
        el.style.fill = "transparent";
      });
  }
  
  function loaderAnimation() {
    var t1 = gsap.timeline();
  
    t1.from("#loader .child span", {
      x: 100,
      stagger: 0.2,
      duration: 1.4,
      ease: Power3.easeInOut,
    })
      .to("#loader .parent .child", {
        y: "-100%",
        duration: 1,
        ease: Circ.easeInOut,
      })
      .to("#loader", {
        height: 0,
        duration: 1,
        ease: Circ.easeInOut,
      })
      .to("#green", {
        height: "100%",
        top: 0,
        duration: 1,
        delay: -0.5,
        ease: Circ.easeInOut,
      })
      .to("#green", {
        height: 0,
        duration: 1,
        delay: -0.5,
        ease: Circ.easeInOut,
        onComplete: function () {
          animationHomepage();
          animateSvg();
        },
      });
  }
  
  function animationHomepage() {
    var tl = gsap.timeline();
  
    tl.to("#nav a", {
      y: 0,
      opacity: 1,
      stagger: 0.05,
      ease: Expo.easeInOut,
    })
      .to(
        "#home .parent .child",
        {
          y: 0,
          stagger: 0.1,
          duration: 1,
          ease: Expo.easeInOut,
        },
        "-=1"
      ) // overlap with nav animation
      .to(
        "#home .row img",
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      );
  }
  function animateSvg() {
    gsap.to("#Visual path, #Visual polyline, #Visual line, #Visual rect", {
      strokeDashoffset: 0,
      duration: 2,
      ease: Expo.easeInOut,
    });
  }
  
  function locoInitialize() {
    const scroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true,
    });
  }
  function cardShow() {
    document.querySelectorAll(".cnt").forEach(function (cnt) {
      cnt.addEventListener("mousemove", function (dets) {
        document.querySelector("#cursor").children[
          dets.target.dataset.index
        ].style.opacity = 1;
        document.querySelector("#cursor").children[
          dets.target.dataset.index
        ].style.transform = `translate(${dets.clientX}px , ${dets.clientY}px)`;
      });
      cnt.addEventListener("mouseleave", function (dets) {
        document.querySelectorAll("#cursor > div").forEach((e) => {
          e.style.opacity = 0;
        });
      });
    });
  }
  
  revealToSpan(); // Wrap text in .reveal
  valueSetters(); // Set initial values (GSAP + SVG)
  loaderAnimation(); // Start animation timeline
  locoInitialize();
  cardShow();
  