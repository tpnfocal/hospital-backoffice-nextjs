"use client";

import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@mui/material/styles";

const NAV = { expanded: 220, collapsed: 64 };

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Users", href: "/users" },
  { label: "Contents", href: "/contents" },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const theme = useTheme();
  // อย่าให้ SSR ประเมิน media-query (กัน hydration flip)
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), { noSsr: true });

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [year, setYear] = useState<string>("");

  // ปีใช้หลัง mount กัน hydration mismatch
  useEffect(() => setYear(String(new Date().getFullYear())), []);

  const sidebarWidth = collapsed ? NAV.collapsed : NAV.expanded;

  const DrawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          p: 2,
          color: "#fff",
          fontWeight: 700,
          textAlign: collapsed ? "center" : "left",
        }}
      >
        {collapsed ? "CC" : "Chula Care"}
      </Box>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />
      <List sx={{ flex: 1, p: 1 }}>
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <ListItemButton
              key={item.href}
              component={Link}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              sx={{
                borderRadius: 1,
                my: 0.5,
                color: "#eaf7ef",
                ...(active && {
                  bgcolor: "rgba(255,255,255,0.25)",
                  color: "#fff",
                }),
                "&:hover": { bgcolor: "rgba(255,255,255,0.18)" },
                justifyContent: collapsed ? "center" : "flex-start",
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  noWrap: true,
                  sx: { textAlign: collapsed ? "center" : "left" },
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />
      <Box
        sx={{
          p: 2,
          fontSize: 12,
          color: "#eaf7ef",
          textAlign: collapsed ? "center" : "left",
        }}
      >
        © {year}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar ไม่ทับ Sidebar */}
      <AppBar
        position="fixed"
        color="inherit"
        elevation={1}
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          left: { xs: 0, sm: `${sidebarWidth}px` },
          width: { xs: "100%", sm: `calc(100% - ${sidebarWidth}px)` },
          transition: (t) =>
            t.transitions.create(["left", "width"], {
              duration: t.transitions.duration.standard,
            }),
          zIndex: (t) => t.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ gap: 1, minHeight: 56 }}>
          <IconButton
            edge="start"
            aria-label="toggle sidebar"
            onClick={() =>
              isMobile ? setMobileOpen((v) => !v) : setCollapsed((v) => !v)
            }
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{ fontWeight: 700 }}
            suppressHydrationWarning
          >
            Backoffice
          </Typography>

          <Box sx={{ flex: 1 }} />
        </Toolbar>
      </AppBar>

      {/* Sidebar Desktop: fixed 100vh */}
      <Box
        sx={{
          display: { xs: "none", sm: "block" },
          width: sidebarWidth,
          flex: "0 0 auto",
        }}
      >
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: sidebarWidth,
            height: "100vh",
            transition: (t) =>
              t.transitions.create("width", {
                duration: t.transitions.duration.standard,
              }),
            boxSizing: "border-box",
            background:
              "linear-gradient(180deg, #34d399 0%, #10b981 50%, #059669 100%)",
            color: "#fff",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {DrawerContent}
        </Box>
      </Box>

      {/* Sidebar Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: NAV.expanded,
            background:
              "linear-gradient(180deg, #34d399 0%, #10b981 50%, #059669 100%)",
            color: "#fff",
          },
        }}
      >
        {DrawerContent}
      </Drawer>

      {/* Main */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { xs: 0, sm: `${sidebarWidth}px` },
          transition: (t) =>
            t.transitions.create("margin-left", {
              duration: t.transitions.duration.standard,
            }),
          minHeight: "100dvh",
          bgcolor: "background.default",
          pt: `56px`, // ให้ตรงกับ Toolbar สูง 56
        }}
      >
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}
