import type { Metadata } from "next";
import { Space_Grotesk, Sora, Space_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-grotesk",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-sora",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Dream Your Way — A New Way To See",
  description:
    "A field journal from the edge of vision — building eye & pupil tracking, and learning to see the world on my own terms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${grotesk.variable} ${sora.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Nav />
        <main style={{ position: "relative", zIndex: 10, paddingTop: 72, flex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
