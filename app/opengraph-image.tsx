import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "UIComponentHub — Beautiful React Components"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to bottom right, #09090b, #18181b)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.1,
            backgroundImage: "radial-gradient(circle at 2px 2px, #3f3f46 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              padding: "10px 20px",
              background: "rgba(255, 255, 255, 0.05)",
              borderRadius: "50px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#a1a1aa",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Built for Developers
          </div>
          
          <h1
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "white",
              margin: 0,
              letterSpacing: "-0.05em",
            }}
          >
            UIComponentHub
          </h1>
          
          <p
            style={{
              fontSize: "24px",
              color: "#a1a1aa",
              maxWidth: "600px",
              textAlign: "center",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            A curated collection of production-ready React components built with Tailwind CSS and Framer Motion.
          </p>
        </div>

        {/* Footer info */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            color: "rgba(255, 255, 255, 0.3)",
            fontSize: "18px",
          }}
        >
          <div>10+ Components</div>
          <div style={{ width: "4px", height: "4px", borderRadius: "2px", background: "currentColor" }} />
          <div>Open Source</div>
          <div style={{ width: "4px", height: "4px", borderRadius: "2px", background: "currentColor" }} />
          <div>Modern Design</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
