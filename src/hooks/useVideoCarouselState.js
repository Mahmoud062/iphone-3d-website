import { useReducer, useCallback } from "react";

/**
 * Initial state for video carousel
 */
const INITIAL_STATE = {
  videoId: 0,
  isPlaying: false,
  startPlay: false,
  isEnd: false,
  isLastVideo: false,
  loadedData: [],
};

/**
 * Reducer function for video carousel state management
 * Consolidates 6 separate state pieces into single state machine
 */
const videoReducer = (state, action) => {
  switch (action.type) {
    case "PLAY":
      return { ...state, isPlaying: true, startPlay: true };

    case "PAUSE":
      return { ...state, isPlaying: false };

    case "NEXT_VIDEO":
      const nextId = state.videoId + 1;
      return {
        ...state,
        videoId: nextId,
        isEnd: nextId >= action.payload, // Mark end if last video
        isLastVideo: nextId === action.payload,
      };

    case "VIDEO_END":
      return { ...state, isEnd: true, videoId: action.payload };

    case "VIDEO_LAST":
      return { ...state, isLastVideo: true };

    case "RESET":
      return { ...state, isLastVideo: false, videoId: 0 };

    case "SET_LOADED_DATA":
      return { ...state, loadedData: action.payload };

    default:
      return state;
  }
};

/**
 * Custom hook for managing video carousel state with useReducer
 * Benefits: Single re-render per action, easier state transitions, automatic batching
 *
 * @param {number} videoCount - Total number of videos in carousel
 * @returns {Object} { state, play, pause, nextVideo, videoEnd, videoLast, reset, setLoadedData }
 */
export const useVideoCarouselState = (videoCount) => {
  const [state, dispatch] = useReducer(videoReducer, INITIAL_STATE);

  // Callback to play video
  const play = useCallback(() => {
    dispatch({ type: "PLAY" });
  }, []);

  // Callback to pause video
  const pause = useCallback(() => {
    dispatch({ type: "PAUSE" });
  }, []);

  // Callback to go to next video (handles last video detection)
  const nextVideo = useCallback(() => {
    dispatch({ type: "NEXT_VIDEO", payload: videoCount });
  }, [videoCount]);

  // Callback when current video ends
  const videoEnd = useCallback((index) => {
    dispatch({ type: "VIDEO_END", payload: index + 1 });
  }, []);

  // Callback when reaching last video
  const videoLast = useCallback(() => {
    dispatch({ type: "VIDEO_LAST" });
  }, []);

  // Callback to reset carousel to first video
  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  // Callback to update loaded metadata
  const setLoadedData = useCallback((data) => {
    dispatch({ type: "SET_LOADED_DATA", payload: data });
  }, []);

  return {
    state,
    play,
    pause,
    nextVideo,
    videoEnd,
    videoLast,
    reset,
    setLoadedData,
  };
};
