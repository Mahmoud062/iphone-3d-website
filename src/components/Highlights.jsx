import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { rightImg, watchImg } from '../utils';
import LazyVideoCarousel from "./LazyVideoCarousel";

const Highlights = () => {
  useGSAP(() => {
    gsap.to("#title", { opacity: 1, y: 0 });
    gsap.to('.link', { opacity: 1, y: 0, duration: 1, stagger: 0.25 });
  }, []);

  return (
    <section
      id='highlights'
      className="w-screen overflow-hidden h-full common-padding bg-zinc"
      role='region'
      aria-label="Video highlights showcase"
    >
      <div className="screen-max-width">
        <div className="mb-12 w-full md:flex items-end justify-between">
          <h1 id="title" className="section-heading">Get the highlights.</h1>
          <div className="flex flex-wrap items-end gap-5" role="group" aria-label="Watch options">
            <a
              href="#"
              className="link flex items-center"
              aria-label="Watch the iPhone 15 Pro film"
            >
              Watch the film
              <img src={watchImg} alt="" className="ml-2" />
            </a>
            <a
              href="#"
              className="link flex items-center"
              aria-label="Watch the launch event"
            >
              Watch the event
              <img src={rightImg} alt="" className="ml-2" />
            </a>
          </div>
        </div>
        <LazyVideoCarousel />
      </div>
    </section>
  );
};

export default Highlights;
