import Image from "next/image";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-full min-h-[100vh]">
        <div className=" ">
          <Image
            src={"/lab-logo.svg"}
            width={250}
            height={90}
            alt="Logo"
            className="py-[25px] px-8 h-full"
          />
          {children}
        </div>
      </body>
    </html>
  );
}
