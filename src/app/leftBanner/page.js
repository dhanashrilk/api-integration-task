import Image from "next/image";
import React from "react";

export default function Banner() {
  return (
    <>
      <Image
        src={"/left-side-img.png"}
        alt="Left Banner Image"
        height={750}
        width={551}
        className="w-[75%] mx-auto"
        placeholder="empty"
      />
    </>
  );
}
