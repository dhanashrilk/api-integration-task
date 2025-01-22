import Image from "next/image";
import React from "react";

export default function Banner() {
  return (
    <div>
      <Image
        src={"/left-side-img.png"}
        alt="Left Banner Image"
        height={750}
        width={550}
        className="w-auto h-auto lg:h-[550px] lg:w-auto p-10 md:p-0"
        placeholder="empty"
      />
    </div>
  );
}
