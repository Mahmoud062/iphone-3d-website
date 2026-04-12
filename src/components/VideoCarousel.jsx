import { useEffect, useRef } from 'react';
import { hightlightsSlides } from '../constants';
import gsap from 'gsap';
import { pauseImg, playImg, replayImg } from '../utils';
import { useGSAP } from '@gsap/react';
import { useVideoCarouselState } from '../hooks/useVideoCarouselState';

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  // Use custom hook to manage video carousel state
  // Replaces 6 separate useState pieces with single useReducer
  // Automatically batches state updates for better performance
  const {
    state,
    play,
    pause,
    nextVideo,
    videoEnd,
    videoLast,
    reset,
    setLoadedData,
  } = useVideoCarouselState(hightlightsSlides.length);

  const { videoId, isPlaying, startPlay, isEnd, isLastVideo, loadedData } = state;

  // Animate slider position when video ID changes
  useGSAP(() => {
    gsap.to('#slider', {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: 'power2.inOut',
    });

    gsap.to('#video', {
      scrollTrigger: {
        trigger: '#video',
        toggleActions: 'restart none none none',
      },
      onComplete: () => {
        play();
      },
    });
  }, [isEnd, videoId, play]);

  // Handle progress bar animation and video progress tracking
  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);

          if (progress != currentProgress) {
            currentProgress = progress;
            gsap.to(videoDivRef.current[videoId], {
              width: window.innerWidth < 760 ? '10vw' : window.innerWidth < 1200 ? '10vw' : '4vw',
            });
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: 'white',
            });
          }
        },

        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: '12px',
            });
            gsap.to(span[videoId], {
              backgroundColor: '#afafaf',
            });
          }
        },
      });

      if (videoId === 0) {
        anim.restart();
      }

      const animUpdate = () => {
        anim.progress(videoRef.current[videoId].currentTime / hightlightsSlides[videoId].videoDuration);
      };

      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay, isPlaying]);

  // Control actual video playback based on state
  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  // Unified handler for different video events
  // Dispatches to appropriate reducer actions
  const handleProcessEvent = (type, index) => {
    switch (type) {
      case 'video-end':
        index !== hightlightsSlides.length - 1 ? nextVideo() : videoLast();
        break;
      case 'play':
        play();
        break;
      case 'pause':
        pause();
        break;
      case 'reset':
        reset();
        break;
      default:
        break;
    }
  };

  return (
    <>
      {/* VIDEO CAROUSEL SLIDER */}
      <div className="flex items-center" role="region" aria-label="Video highlights carousel">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div className="w-full h-full flex-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  playsInline={true}
                  preload="auto"
                  muted
                  className={`${list.id === 2 && 'translate-x-44'} pointer-events-none`}
                  ref={(el) => (videoRef.current[i] = el)}
                  onEnded={() => handleProcessEvent('video-end', i)}
                  onPlay={() => play()}
                  onLoadedMetadata={(e) => setLoadedData([...loadedData, e])}
                  aria-label={`Video highlight ${i + 1} of ${hightlightsSlides.length}`}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>

              {/* TEXT OVERLAY - appears on top of video */}
              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text, i) => (
                  <p key={i} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PROGRESS INDICATORS AND CONTROLS */}
      <div className="relative flex-center mt-10">
        {/* Progress bar controller */}
        <div
          className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full"
          role="group"
          aria-label="Video progress indicators"
        >
          {hightlightsSlides.map((_, i) => (
            <button
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
              className="mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer transition-all"
              onClick={() => {
                videoRef.current[i]?.play();
              }}
              aria-label={`Go to video ${i + 1} of ${hightlightsSlides.length}`}
              aria-current={videoId === i ? 'true' : 'false'}
              role="tab"
            >
              {/* Progress fill span - grows as video plays */}
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
                aria-hidden="true"
              />
            </button>
          ))}
        </div>

        {/* Play/Pause/Replay Button */}
        <button
          onClick={() =>
            isLastVideo
              ? handleProcessEvent('reset', 0)
              : handleProcessEvent(isPlaying ? 'pause' : 'play', 0)
          }
          className="control-btn"
          aria-label={isLastVideo ? 'Replay video highlights' : isPlaying ? 'Pause video' : 'Play video'}
          aria-pressed={isPlaying}
        >
          <img
            src={isLastVideo ? replayImg : isPlaying ? pauseImg : playImg}
            alt=""
            width={23}
            height={23}
            aria-hidden="true"
          />
        </button>
      </div>
    </>
  );;
};

export default VideoCarousel;
