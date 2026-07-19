export default function Background() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        backgroundColor: "#f7b39b",
      }}
    >
      {/* Base peach gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, #ffd6c9 0%, #f7b39b 30%, #ee9b83 55%, #e07a63 80%, #c75a48 100%)",
        }}
      />

      {/* Diamond shard lattice */}
      <div
        style={{
          position: "absolute",
          inset: "-20%",
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              rgba(255,255,255,0.18),
              rgba(255,255,255,0.18) 1px,
              transparent 2px,
              transparent 18px
            ),
            repeating-linear-gradient(
              -45deg,
              rgba(255,255,255,0.14),
              rgba(255,255,255,0.14) 1px,
              transparent 2px,
              transparent 22px
            )
          `,
          transform: "rotate(12deg)",
          opacity: 0.9,
        }}
      />

      {/* Hard crystal cuts */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(
              120deg,
              transparent 40%,
              rgba(255,255,255,0.35) 42%,
              transparent 44%
            ),
            linear-gradient(
              300deg,
              transparent 60%,
              rgba(255,255,255,0.25) 62%,
              transparent 64%
            )
          `,
          opacity: 0.7,
        }}
      />

      {/* Scratches / abrasions */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            repeating-linear-gradient(
              88deg,
              rgba(255,255,255,0.12),
              rgba(255,255,255,0.12) 1px,
              transparent 2px,
              transparent 9px
            ),
            repeating-linear-gradient(
              92deg,
              rgba(0,0,0,0.08),
              rgba(0,0,0,0.08) 1px,
              transparent 2px,
              transparent 13px
            )
          `,
          mixBlendMode: "overlay",
          opacity: 0.6,
        }}
      />

      {/* Light refraction bloom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.35), transparent 45%)",
          filter: "blur(25px)",
          opacity: 0.8,
        }}
      />

      {/* Edge vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(140,70,60,0.45) 100%)",
        }}
      />
    </div>
  );
}
