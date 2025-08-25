"use client";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export type CrumbItem = {
  title: string;
  href?: string; // 'noredirect' = แสดงเป็นตัวหนังสือ
};

export default function AppBreadcrumb({ items }: { items?: CrumbItem[] }) {
  const pathname = usePathname();

  const autoItems: CrumbItem[] = (
    items ??
    pathname
      .split("?")[0]
      .split("#")[0]
      .split("/")
      .filter(Boolean)
      .reduce<CrumbItem[]>((acc, seg, idx, arr) => {
        const href = "/" + arr.slice(0, idx + 1).join("/");
        const title = decodeURIComponent(seg)
          .replace(/-/g, " ")
          .replace(/\b\w/g, (s) => s.toUpperCase());
        acc.push({ title, href });
        return acc;
      }, [])
  ).map((it, idx, arr) =>
    idx === arr.length - 1 ? { ...it, href: "noredirect" } : it
  );

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      className="app-breadcrumb"
      separator="/"
      sx={{
        display: "inline-block",
        fontSize: 14,
        lineHeight: "50px",
        ml: 1.25,
      }}
    >
      {autoItems.map((item, i) =>
        item.href === "noredirect" ? (
          <Typography key={i} color="#97a8be" sx={{ cursor: "text" }}>
            {item.title}
          </Typography>
        ) : (
          <Link
            key={i}
            component={NextLink}
            href={item.href!}
            underline="hover"
          >
            {item.title}
          </Link>
        )
      )}
    </Breadcrumbs>
  );
}
