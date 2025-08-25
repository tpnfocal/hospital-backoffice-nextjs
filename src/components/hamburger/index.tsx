"use client";
import React from "react";
import clsx from "clsx";

type Props = {
  isActive?: boolean;
  onToggle?: () => void;
  size?: number; // px
};

export default function Hamburger({ isActive, onToggle, size = 20 }: Props) {
  return (
    <>
      <svg
        className={clsx("hamburger", { "is-active": isActive })}
        viewBox="0 0 1024 1024"
        width={size}
        height={size}
        onClick={onToggle}
        style={{ cursor: "pointer", display: "inline-block" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* path ยาวในไฟล์เดิม truncated—ใช้ path มาตรฐานแทน */}
        <path
          d="M128 256h768v64H128zM128 480h768v64H128zM128 704h768v64H128z"
          fill="currentColor"
        />
      </svg>

      <style jsx>{`
        .hamburger.is-active {
          transform: rotate(180deg);
          transition: transform 0.2s ease;
        }
      `}</style>
    </>
  );
}
