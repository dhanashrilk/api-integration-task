import Image from "next/image";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <div className="w-full min-h-[100vh]">{children}</div>
      </body>
    </html>
  );
}
