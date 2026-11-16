import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { tokens } from "../theme/tokens.js";

const { color, space, radius } = tokens;

function NavButton({ label, icon, iconFirst, disabled, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.buttonDisabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      {iconFirst ? <Ionicons name={icon} size={16} color={color.onPrimary} /> : null}
      <Text style={styles.buttonText}>{label}</Text>
      {!iconFirst ? <Ionicons name={icon} size={16} color={color.onPrimary} /> : null}
    </Pressable>
  );
}

export function Pagination({ page, pageSize, totalItems, onPrev, onNext }) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const from = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);

  return (
    <View style={styles.wrap}>
      <View style={styles.info}>
        <Text style={styles.pageText}>Halaman {page} dari {totalPages}</Text>
        <Text style={styles.rangeText}>
          Menampilkan {from}–{to} dari {totalItems} data
        </Text>
      </View>

      <View style={styles.row}>
        <NavButton label="Sebelumnya" icon="chevron-back" iconFirst
          disabled={page <= 1} onPress={onPrev} />
        <NavButton label="Berikutnya" icon="chevron-forward"
          disabled={page >= totalPages} onPress={onNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: space.md },
  info: { alignItems: "center", gap: 2 },
  pageText: { fontSize: 14, fontWeight: "700", color: color.text, fontVariant: ["tabular-nums"] },
  rangeText: { fontSize: 12, color: color.text3, fontVariant: ["tabular-nums"] },
  row: { flexDirection: "row", justifyContent: "space-between", gap: space.md },
  button: {
    flex: 1,
    minHeight: tokens.hit,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: color.primary,
    borderRadius: radius.cta,
    borderCurve: "continuous",
    paddingHorizontal: space.lg,
  },
  buttonDisabled: { opacity: 0.35 },
  pressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
  buttonText: { color: color.onPrimary, fontWeight: "600", fontSize: 14 },
});