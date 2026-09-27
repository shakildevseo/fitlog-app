import type { Metadata } from "next";
import Navbar from "./components/navbar";
import "./globals.css";
import Footer from "./components/footer";


export const metadata: Metadata = {
  title: "Fitlog",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
    >
      <body className="max-w-[96%] mx-auto  bg-[#0a0b0d]">
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
