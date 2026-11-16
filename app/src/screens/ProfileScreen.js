import { ScrollView, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, { FadeInDown } from "react-native-reanimated";
import Constants from "expo-constants";
import { GROUP } from "../data/groupInfo.js";
import { MQTT_TOPIC } from "../services/config.js";
import { tokens } from "../theme/tokens.js";

const { color, space, radius, shadow } = tokens;

function InfoRow({ icon, label, value }) {
  return (
    <View style={styles.infoRow}>
      <Ionicons name={icon} size={18} color={color.text3} />
      <View style={styles.infoText}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

export function ProfileScreen() {
  const version = Constants.expoConfig?.version ?? "1.0.0";

  return (
    <View style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        contentInsetAdjustmentBehavior="automatic"
      >
        {/* Kartu utama kelompok */}
        <Animated.View
          style={[styles.card, styles.hero]}
          entering={FadeInDown.duration(tokens.motion.entering)}
        >
          <View style={styles.avatarLarge}>
            <Ionicons name="people" size={40} color={color.onPrimary} />
          </View>
          <Text style={styles.groupName}>Kelompok {GROUP.number}</Text>
          <Text style={styles.course}>{GROUP.course}</Text>
          <View style={styles.modulePill}>
            <Text style={styles.moduleText}>{GROUP.module}</Text>
          </View>
        </Animated.View>

        {/* Daftar anggota */}
        <Animated.View
          style={styles.card}
          entering={FadeInDown.delay(80).duration(tokens.motion.entering)}
        >
          <Text style={styles.sectionTitle}>Anggota Kelompok</Text>
          {GROUP.members.map((m, i) => (
            <View
              key={m.nim + i}
              style={[styles.memberRow, i > 0 && styles.memberDivider]}
              accessible
              accessibilityLabel={`${m.name}, NIM ${m.nim}, ${m.role}`}
            >
              <View style={styles.avatarSmall}>
                <Text style={styles.avatarInitial}>
                  {m.name.trim().charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.memberText}>
                <Text style={styles.memberName}>{m.name}</Text>
                <Text style={styles.memberNim}>{m.nim}</Text>
              </View>
              {m.role ? (
                <View style={styles.rolePill}>
                  <Text style={styles.roleText}>{m.role}</Text>
                </View>
              ) : null}
            </View>
          ))}
        </Animated.View>

        {/* Info aplikasi */}
        <Animated.View
          style={styles.card}
          entering={FadeInDown.delay(160).duration(tokens.motion.entering)}
        >
          <Text style={styles.sectionTitle}>Tentang Aplikasi</Text>
          <InfoRow icon="thermometer-outline" label="Aplikasi" value={`LiveTemp v${version}`} />
          <InfoRow icon="radio-outline" label="MQTT Topic" value={MQTT_TOPIC ?? "--"} />
          <InfoRow
            icon="construct-outline"
            label="Teknologi"
            value="React Native · Expo · MQTT · Node.js · Neon PostgreSQL"
          />
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: color.bg },
  container: { padding: space.lg, paddingBottom: space.xxl, gap: space.lg, backgroundColor: color.bg },
  card: {
    backgroundColor: color.surface,
    padding: space.xl,
    borderRadius: radius.card,
    borderCurve: "continuous",
    gap: space.md,
    borderWidth: 1,
    borderColor: color.border,
    boxShadow: shadow.card,
  },
  hero: { alignItems: "center", gap: space.sm },
  avatarLarge: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: color.primary,
    alignItems: "center", justifyContent: "center",
    marginBottom: space.sm,
  },
  groupName: { fontSize: 22, fontWeight: "700", color: color.text, letterSpacing: -0.5 },
  course: { fontSize: 14, color: color.text2, textAlign: "center" },
  modulePill: {
    backgroundColor: color.surface2,
    borderRadius: radius.pill,
    paddingVertical: 6,
    paddingHorizontal: space.md,
    marginTop: 4,
  },
  moduleText: { fontSize: 12, fontWeight: "600", color: color.text2 },
  sectionTitle: { fontSize: tokens.type.section, fontWeight: "700", color: color.text },
  memberRow: { flexDirection: "row", alignItems: "center", gap: space.md, paddingVertical: space.sm },
  memberDivider: { borderTopWidth: 1, borderTopColor: color.border },
  avatarSmall: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: color.surface2,
    alignItems: "center", justifyContent: "center",
  },
  avatarInitial: { fontSize: 16, fontWeight: "700", color: color.primary },
  memberText: { flex: 1, gap: 2 },
  memberName: { fontSize: 15, fontWeight: "600", color: color.text },
  memberNim: { fontSize: 13, color: color.text3, fontVariant: ["tabular-nums"] },
  rolePill: {
    backgroundColor: color.surface2,
    borderRadius: radius.pill,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  roleText: { fontSize: 12, fontWeight: "600", color: color.text2 },
  infoRow: { flexDirection: "row", gap: space.md, alignItems: "flex-start" },
  infoText: { flex: 1, gap: 2 },
  infoLabel: {
    fontSize: 12, fontWeight: "600", textTransform: "uppercase",
    letterSpacing: 0.6, color: color.text3,
  },
  infoValue: { fontSize: 14, color: color.text },
});