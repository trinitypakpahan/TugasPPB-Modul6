import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  FadeOut,
  ZoomIn,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { tokens } from "../theme/tokens.js";

const { color } = tokens;
const SPLASH_BG = "#0F172A";

export function AnimatedSplash({ onFinish, duration = 2400 }) {
  const pulse = useSharedValue(0);
  const progress = useSharedValue(0);

  useEffect(() => {
    // cincin berdenyut terus-menerus
    pulse.value = withRepeat(
      withTiming(1, { duration: 1100, easing: Easing.out(Easing.quad) }),
      -1,
      false
    );
    // progress bar mengisi sampai splash selesai
    progress.value = withTiming(1, {
      duration: duration - 200,
      easing: Easing.inOut(Easing.cubic),
    });
    // setelah durasi habis, beri tahu App.js untuk menghapus splash
    const timer = setTimeout(onFinish, duration);
    return () => clearTimeout(timer);
  }, [duration, onFinish, pulse, progress]);

  const ringStyle = useAnimatedStyle(() => ({
    opacity: 0.5 * (1 - pulse.value),
    transform: [{ scale: 1 + 0.9 * pulse.value }],
  }));

  const barStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <Animated.View
      style={styles.root}
      exiting={FadeOut.duration(400)}
      accessibilityLabel="LiveTemp is loading"
    >
      <View style={styles.center}>
        <View style={styles.badgeWrap}>
          <Animated.View style={[styles.ring, ringStyle]} />
          <Animated.View
            style={styles.badge}
            entering={ZoomIn.springify().damping(14)}
          >
            <Ionicons name="thermometer" size={56} color={color.onPrimary} />
          </Animated.View>
        </View>

        <Animated.Text
          style={styles.title}
          entering={FadeInDown.delay(350).duration(500)}
        >
          LiveTemp
        </Animated.Text>
        <Animated.Text
          style={styles.subtitle}
          entering={FadeIn.delay(700).duration(500)}
        >
          Real-time Temperature Monitoring
        </Animated.Text>
      </View>

      <View style={styles.barTrack}>
        <Animated.View style={[styles.barFill, barStyle]} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: SPLASH_BG,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    elevation: 100,
  },
  center: { alignItems: "center", gap: 12 },
  badgeWrap: {
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  ring: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: color.primary,
  },
  badge: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: color.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "monospace",
    letterSpacing: -0.5,
  },
  subtitle: { fontSize: 14, color: "#94A3B8", letterSpacing: 0.4 },
  barTrack: {
    position: "absolute",
    bottom: 64,
    width: 160,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#1E293B",
    overflow: "hidden",
  },
  barFill: { height: "100%", backgroundColor: color.primary, borderRadius: 2 },
});