import { SECTION_WAVE_HEIGHT_PX } from "@/config/layout";

/**
 * Smooth top-edge wave from Figma footer (node 1502:4685).
 * Valleys are transparent so the previous section's color shows through.
 */
const WAVE_PATH =
  "M0 0L80 16C132.81 26.5621 187.19 26.5621 240 16C292.81 5.43792 347.19 5.43792 400 16C452.81 26.5621 507.19 26.5621 560 16C612.81 5.43792 667.19 5.43792 720 16C772.81 26.5621 827.19 26.5621 880 16C932.81 5.43792 987.19 5.43792 1040 16C1092.81 26.5621 1147.19 26.5621 1200 16L1280 0V27H0Z";

type SectionWaveProps = {
  /** CSS color that matches this section's background. */
  fill: string;
};

export function SectionWave({ fill }: SectionWaveProps) {
  return (
    <svg
      className="pointer-events-none block w-full"
      style={{
        height: SECTION_WAVE_HEIGHT_PX,
        marginBottom: -1,
      }}
      viewBox="0 0 1280 27"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path d={WAVE_PATH} fill={fill} />
    </svg>
  );
}
