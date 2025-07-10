import { Animated, Easing } from 'react-native';

/**
 * Fade animation (in/out)
 * @param {Animated.Value} opacityValue - The Animated.Value to drive opacity (0 to 1)
 * @param {number} duration - Duration in milliseconds (default: 300)
 * @returns {Animated.CompositeAnimation}
 */
export const fadeIn = (opacityValue, duration = 300) => {
  return Animated.timing(opacityValue, {
    toValue: 1,
    duration,
    easing: Easing.ease,
    useNativeDriver: true,
  });
};

export const fadeOut = (opacityValue, duration = 300) => {
  return Animated.timing(opacityValue, {
    toValue: 0,
    duration,
    easing: Easing.ease,
    useNativeDriver: true,
  });
};

/**
 * Slide animation (up/down/left/right)
 * @param {Animated.Value} translateValue - The Animated.Value to drive translation
 * @param {number} distance - Distance to slide (default: 100)
 * @param {number} duration - Duration in milliseconds (default: 300)
 * @returns {Animated.CompositeAnimation}
 */
export const slideIn = (translateValue, distance = 100, duration = 300) => {
  return Animated.timing(translateValue, {
    toValue: 0,
    duration,
    easing: Easing.out(Easing.quad),
    useNativeDriver: true,
  });
};

export const slideOut = (translateValue, distance = 100, duration = 300) => {
  return Animated.timing(translateValue, {
    toValue: distance,
    duration,
    easing: Easing.in(Easing.quad),
    useNativeDriver: true,
  });
};

// Spring animation example
export const springScale = (scaleValue, toValue = 1.1) => {
  return Animated.spring(scaleValue, {
    toValue,
    friction: 3,
    tension: 40,
    useNativeDriver: true,
  });
};

// Pre-configured animations
export default {
  fadeIn,
  fadeOut,
  slideIn,
  slideOut,
  springScale,
};