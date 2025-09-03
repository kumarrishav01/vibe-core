import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "'Rish's Portfolio — Creative Developer & 3D Experiments",
  description: "Explore Rish's cutting-edge portfolio — blending creative coding, 3D experiences, and interactive design. Let's build something amazing together.",
  generator: "Next.js, Rish custom",
  keywords: ["Rish", "Creative Developer", "3D Portfolio", "WebGL", "React Three Fiber", "Interactive Design"],
  authors: [{ name: "Rish", url: "https://vibecore.in" }],
  creator: "Rish",
  publisher: "Rish",
  metadataBase: new URL("https://vibecore.in"),
  openGraph: {
    title: "Rish's Portfolio — Creative Developer & 3D Experiments",
    description: "Dive into Rish's portfolio showcasing 3D experiments, creative coding, and cutting-edge interactive web design.",
    url: "https://vibecore.in",
    siteName: "Rish Portfolio",
    images: [
      {
        url: "https://www.vibecore.in/images/13305567674191053.png", // Change to your actual OG image URL
        width: 1200,
        height: 630,
        alt: "Rish's 3D Creative Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rish's Portfolio — Creative Developer & 3D Experiments",
    description: "Explore Rish's portfolio blending 3D, creative coding, and immersive interactive design.",
    images: ["https://www.vibecore.in/images/13305567674191053.png"], // Update to your image
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
