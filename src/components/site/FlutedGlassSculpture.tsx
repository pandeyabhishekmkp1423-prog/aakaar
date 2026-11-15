export function FlutedGlassSculpture() {
  // 10 vertical fluted ribs for optical refraction
  const flutes = [
    { index: 0, x: 65, width: 15, sphereShift: 0 },
    { index: 1, x: 80, width: 15, sphereShift: -4 },
    { index: 2, x: 95, width: 15, sphereShift: -3 },
    { index: 3, x: 110, width: 15, sphereShift: -2 },
    { index: 4, x: 125, width: 15, sphereShift: 0 },
    { index: 5, x: 140, width: 15, sphereShift: 3 },
    { index: 6, x: 155, width: 15, sphereShift: 5 },
    { index: 7, x: 170, width: 15, sphereShift: 7 },
    { index: 8, x: 185, width: 15, sphereShift: 8 },
    { index: 9, x: 200, width: 15, sphereShift: 6 },
  ];

  return (
    <div className="relative w-full max-w-[440px] lg:max-w-[490px] mx-auto flex items-center justify-center select-none py-2">
      <svg
        viewBox="0 0 520 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-md transition-transform duration-500 hover:scale-[1.01]"
        aria-label="Architectural fluted glass and sculptural sphere"
        role="img"
      >
        <defs>
          {/* Sphere Radial Illumination (Warm Terracotta / Teak Wood) */}
          <radialGradient
            id="sphereGradient"
            cx="245"
            cy="240"
            r="105"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#DF9C7A" />
            <stop offset="25%" stopColor="#C87A53" />
            <stop offset="55%" stopColor="#A35634" />
            <stop offset="85%" stopColor="#67311B" />
            <stop offset="100%" stopColor="#3C1A0E" />
          </radialGradient>

          {/* Ambient bounce highlight on sphere bottom rim */}
          <radialGradient
            id="sphereBounceLight"
            cx="275"
            cy="365"
            r="90"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#F5CAB2" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#C87A53" stopOpacity="0" />
          </radialGradient>

          {/* Soft Ground Contact Shadow under Sphere */}
          <radialGradient
            id="sphereFloorShadow"
            cx="275"
            cy="392"
            rx="110"
            ry="24"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#1E1612" stopOpacity="0.4" />
            <stop offset="45%" stopColor="#3A2920" stopOpacity="0.18" />
            <stop offset="80%" stopColor="#7D6559" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Contact Shadow under Glass Pane */}
          <linearGradient id="glassFloorShadow" x1="60" y1="392" x2="220" y2="392" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <stop offset="15%" stopColor="#1A2421" stopOpacity="0.32" />
            <stop offset="85%" stopColor="#1A2421" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>

          {/* Polished Glass Outer Bevel Highlights */}
          <linearGradient id="glassTopEdge" x1="65" y1="58" x2="215" y2="58" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#E2ECE8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="glassLeftEdge" x1="64" y1="60" x2="64" y2="392" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#E5EFEA" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#9FB7AE" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="glassRightEdge" x1="216" y1="60" x2="216" y2="392" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#E5EFEA" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#B3C5BF" stopOpacity="0.3" />
          </linearGradient>

          {/* Flute Cylindrical Lens Profile (Rib Lighting) */}
          <linearGradient id="fluteHighlight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="28%" stopColor="#FFFFFF" stopOpacity="0.3" />
            <stop offset="65%" stopColor="#E3EFEA" stopOpacity="0.05" />
            <stop offset="92%" stopColor="#3F554E" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#1A2924" stopOpacity="0.32" />
          </linearGradient>

          {/* Clip path for Glass Pane */}
          <clipPath id="glassPaneClip">
            <rect x="65" y="60" width="150" height="332" rx="4" />
          </clipPath>

          {/* Floor Reflection Fader */}
          <linearGradient id="floorReflectionMask" x1="0" y1="392" x2="0" y2="470" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.22" />
            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          <mask id="reflectionMask">
            <rect x="0" y="392" width="520" height="88" fill="url(#floorReflectionMask)" />
          </mask>
        </defs>

        {/* 1. FLOOR AMBIENT CONTACT SHADOWS */}
        <ellipse cx="270" cy="392" rx="105" ry="18" fill="url(#sphereFloorShadow)" />
        <rect x="62" y="389" width="156" height="8" rx="4" fill="url(#glassFloorShadow)" />

        {/* 2. DIRECT SPHERE (The part not covered by glass, plus base layer) */}
        <g id="mainSphere">
          {/* Full circle */}
          <circle cx="265" cy="285" r="95" fill="url(#sphereGradient)" />
          {/* Bottom bounce light */}
          <circle cx="265" cy="285" r="95" fill="url(#sphereBounceLight)" />
          {/* Subtle woodgrain/surface texture aura */}
          <circle
            cx="265"
            cy="285"
            r="94"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1.5"
          />
        </g>

        {/* 3. FLUTED GLASS PANE OVERLAY (Optical Refraction System) */}
        {/* Soft glass ambient tint */}
        <rect
          x="65"
          y="60"
          width="150"
          height="332"
          rx="4"
          fill="rgba(255, 255, 255, 0.35)"
          style={{ backdropFilter: "blur(2px)" }}
        />

        {/* Optical Stepped Slices of the Sphere inside the Fluted Glass */}
        <g clipPath="url(#glassPaneClip)">
          {flutes.map((f) => (
            <g key={f.index}>
              {/* Refracted Sphere Slice for this Flute Rib */}
              <g clipPath={`url(#fluteClip-${f.index})`}>
                <circle
                  cx={265 + f.sphereShift}
                  cy={285}
                  r={95 + (f.index % 2 === 0 ? 1 : -1)}
                  fill="url(#sphereGradient)"
                  opacity="0.94"
                />
                <circle
                  cx={265 + f.sphereShift}
                  cy={285}
                  r={95}
                  fill="url(#sphereBounceLight)"
                  opacity="0.9"
                />
              </g>

              {/* Define clip for each flute column */}
              <clipPath id={`fluteClip-${f.index}`}>
                <rect x={f.x} y="60" width={f.width} height="332" />
              </clipPath>

              {/* Cylindrical Rib Specular Lighting */}
              <rect
                x={f.x}
                y="60"
                width={f.width}
                height="332"
                fill="url(#fluteHighlight)"
              />
            </g>
          ))}

          {/* Polished Diagonal Glass Sheet Sheen */}
          <path
            d="M 65 60 L 140 60 L 70 392 L 65 392 Z"
            fill="rgba(255, 255, 255, 0.18)"
          />
          <path
            d="M 160 60 L 195 60 L 115 392 L 80 392 Z"
            fill="rgba(255, 255, 255, 0.12)"
          />
        </g>

        {/* 4. GLASS SLAB POLISHED BEVELED EDGES */}
        {/* Top edge bevel */}
        <rect x="64.5" y="58.5" width="151" height="3" rx="1.5" fill="url(#glassTopEdge)" />
        {/* Left vertical edge bevel */}
        <rect x="64" y="59" width="2" height="333" fill="url(#glassLeftEdge)" />
        {/* Right vertical edge bevel */}
        <rect x="214" y="59" width="2" height="333" fill="url(#glassRightEdge)" />
        {/* Bottom edge contact line */}
        <rect x="64.5" y="391" width="151" height="1.5" fill="rgba(255, 255, 255, 0.85)" />

        {/* 5. GLOSSY GROUND FLOOR REFLECTION (Masked with fading gradient) */}
        <g mask="url(#reflectionMask)" opacity="0.65">
          {/* Inverted Sphere Reflection */}
          <circle cx="265" cy="495" r="95" fill="url(#sphereGradient)" />
          {/* Inverted Glass Pane Reflection */}
          <rect
            x="65"
            y="394"
            width="150"
            height="80"
            fill="rgba(255, 255, 255, 0.3)"
          />
          {flutes.map((f) => (
            <rect
              key={`refl-${f.index}`}
              x={f.x}
              y="394"
              width={f.width}
              height="80"
              fill="url(#fluteHighlight)"
              opacity="0.4"
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
