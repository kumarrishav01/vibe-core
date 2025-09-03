import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Aryanil's Portfolio — Creative Developer & 3D Experiments",
  description: "Explore Aryanil's cutting-edge portfolio — blending creative coding, 3D experiences, and interactive design. Let's build something amazing together.",
  generator: "Next.js, Aryanil custom",
  keywords: ["Aryanil", "Creative Developer", "3D Portfolio", "WebGL", "React Three Fiber", "Interactive Design"],
  authors: [{ name: "Aryanil", url: "https://aryanil.web.app" }],
  creator: "Aryanil",
  publisher: "Aryanil",
  metadataBase: new URL("https://aryanil.web.app"),
  openGraph: {
    title: "Aryanil's Portfolio — Creative Developer & 3D Experiments",
    description: "Dive into Aryanil's portfolio showcasing 3D experiments, creative coding, and cutting-edge interactive web design.",
    url: "https://aryanil.web.app",
    siteName: "Aryanil Portfolio",
    images: [
      {
        url: "https://aryanil.web.app/og-cover.png", // Change to your actual OG image URL
        width: 1200,
        height: 630,
        alt: "Aryanil's 3D Creative Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aryanil's Portfolio — Creative Developer & 3D Experiments",
    description: "Explore Aryanil's portfolio blending 3D, creative coding, and immersive interactive design.",
    images: ["https://aryanil.web.app/og-cover.png"], // Update to your image
    creator: "@riiissssshhhhh", // Put your real Twitter handle if you have one
  },
  icons: {
    icon: "/images/favicon.ico", // ✅ Use your icon from public/images
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Extra icons or meta tags if needed */}
        <link rel="icon" href="/images/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  )
}
