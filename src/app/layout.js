import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "../components/Providers";
import { Navbar } from "../components/layout/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "My Podcast Studio - High-Definition AI Narration Generator",
  description: "Create professional podcast voiceovers and narrations instantly using MiniMax Speech 2.6 HD & Turbo models with smooth adjustments.",
  keywords: ["podcast", "ai narration", "text to speech", "voice generator", "minimax speech"],
  alternates: {
    canonical: "/my-podcast",
  },
  openGraph: {
    title: "My Podcast Studio - High-Definition AI Voiceover Generator",
    description: "Create professional podcast voiceovers and narrations instantly using MiniMax Speech 2.6 HD & Turbo models.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Podcast Studio - AI Voiceover Generator",
    description: "Create professional podcast voiceovers and narrations instantly.",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full w-full dark" style={{ colorScheme: "dark" }}>
      <body className={`${inter.variable} ${outfit.variable} h-full w-full flex flex-col antialiased bg-zinc-950 text-zinc-100 font-sans overflow-hidden`}>
        <Providers>
          <Navbar />
          <div className="flex-1 flex flex-col overflow-hidden min-h-0">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
