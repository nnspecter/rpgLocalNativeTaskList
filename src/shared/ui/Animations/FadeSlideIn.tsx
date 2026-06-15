import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

interface FadeSlideInProps {
  children: React.ReactNode;
  visible?: boolean;
  delay?: number;
  duration?: number;
  offsetY?: number;
}

export const FadeSlideIn = ({
  children,
  visible = true,
  delay = 0,
  duration = 300,
  offsetY = 16,
}: FadeSlideInProps) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(offsetY)).current;

  useEffect(() => {
    if (visible) {
      opacity.setValue(0);
      translateY.setValue(offsetY);

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 1,
            duration,
            useNativeDriver: true,
          }),
          Animated.spring(translateY, {
            toValue: 0,
            damping: 18,
            stiffness: 200,
            useNativeDriver: true,
          }),
        ]).start();
      }, delay);

      return () => clearTimeout(timer);
    } else {
      opacity.setValue(0);
      translateY.setValue(offsetY);
    }
  }, [visible]);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
};