import type { Metadata } from "next";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import "./globals.css";


export const metadata: Metadata = {
  title: "Fitlog",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
    >
      <body className="mx-auto flex min-h-screen max-w-[96%] flex-col bg-[#0a0b0d]">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
