"use client";
import React from "react";
import clsx from "clsx";

type Props = {
  iconClass?: string; // เช่น "user" => จะอ้าง "#icon-user"
  className?: string;
  src?: string; // ถ้าเป็นไฟล์ SVG เดี่ยว ส่ง path มาแทน
  size?: number | string; // px หรือ em
  onClick?: React.MouseEventHandler<SVGSVGElement>;
};

export default function SvgIcon({
  iconClass,
  className,
  src,
  size = "1em",
  onClick,
}: Props) {
  const svgClass = clsx("svg-icon", className);
  const href = iconClass ? `#icon-${iconClass}` : undefined;

  if (src) {
    // กรณีใช้ไฟล์ SVG เดี่ยว
    return (
      <svg className={svgClass} width={size} height={size} onClick={onClick}>
        <image href={src} width="100%" height="100%" />
      </svg>
    );
  }

  // กรณีใช้ sprite (#icon-*)
  return (
    <svg
      className={svgClass}
      width={size}
      height={size}
      onClick={onClick}
      aria-hidden="true"
    >
      {href && <use xlinkHref={href} />}
      <style jsx>{`
        .svg-icon {
          vertical-align: -0.15em;
          fill: currentColor;
          overflow: hidden;
        }
      `}</style>
    </svg>
  );
}
