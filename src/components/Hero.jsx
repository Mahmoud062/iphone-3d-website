import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { heroVideo, smallHeroVideo } from '../utils';
import { useCallback, useEffect, useRef, useState } from 'react';

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo);
  const debounceRef = useRef(null);

  const handleVideoSrcSet = useCallback(() => {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
  }, []);

  // Debounce resize handler - only update after 300ms of no resize events
  const debouncedResize = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      handleVideoSrcSet();
    }, 300);
  }, [handleVideoSrcSet]);

  useEffect(() => {
    handleVideoSrcSet(); // Initial call
    window.addEventListener('resize', debouncedResize);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [debouncedResize, handleVideoSrcSet]);

  useGSAP(() => {
    gsap.to('#hero', { opacity: 1, delay: 2 });
    gsap.to('#cta', { opacity: 1, y: -50, delay: 2 });
  }, []);

  return (
    <section
      className='w-full nav-height relative bg-black'
      role='region'
      aria-label='Hero section with iPhone 15 Pro introduction'
    >
      <div className='h-5/6 w-full flex-center flex-col'>
        <h1 id="hero" className='hero-title'>iPhone 15 Pro</h1>
        <div className='md:w-10/12 w-9/12'>
          <video
            className='pointer-events-none'
            autoPlay
            muted
            playsInline={true}
            key={videoSrc}
            aria-label='iPhone 15 Pro introduction video - automatically plays on page load'
            title='Product introduction - automatically plays on page load'
          >
            <source src={videoSrc} type='video/mp4' />
          </video>
        </div>
      </div>
      <div id='cta' className='flex flex-col items-center opacity-0 translate-y-20'>
        <a
          href='#highlights'
          className='btn'
          aria-label='Explore iPhone 15 Pro features and buy options'
        >
          Buy
        </a>
        <p className='font-normal text-xl'>From $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
