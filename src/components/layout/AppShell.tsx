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
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "@mui/material/styles";
import ChulaCareLogo from "@/assets/images/logo.png";
import { navItems } from "@/config/nav";
import { useAuth } from "@/hooks/useAuth";

const NAV = { expanded: 230, collapsed: 64 };

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), { noSsr: true });

  const { canSee } = useAuth();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarWidth = collapsed ? NAV.collapsed : NAV.expanded;

  const DrawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.25,
          py: 2,
          px: collapsed ? 0 : 2,
          justifyContent: collapsed ? "center" : "flex-start",
          color: "var(--text-white)",
        }}
      >
        <Image
          src={ChulaCareLogo}
          alt="Chula Care"
          width={collapsed ? 28 : 32}
          height={collapsed ? 28 : 32}
          priority
          style={{ borderRadius: 6 }}
        />
        {!collapsed && (
          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
            Chula Care
          </Typography>
        )}
      </Box>

      <Divider sx={{ borderColor: "var(--divider)" }} />

      <List sx={{ flex: 1, py: 1 }}>
        {navItems
          .filter((i) => canSee(i.roles))
          .map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const Button = (
              <ListItemButton
                key={item.href}
                component={Link}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                sx={{
                  mx: 1,
                  borderRadius: 1,
                  my: 0.5,
                  color: "var(--text-light)",
                  ...(active && {
                    backgroundColor: "var(--box-color)",
                    color: "var(--text-white)",
                  }),
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.18)" },
                  justifyContent: collapsed ? "center" : "flex-start",
                  minHeight: 44,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: collapsed ? 0 : 1.5,
                    color: "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                {!collapsed && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      noWrap: true,
                      sx: { fontSize: 14, fontWeight: 500 },
                    }}
                  />
                )}
              </ListItemButton>
            );

            return collapsed ? (
              <Tooltip title={item.label} placement="right" key={item.href}>
                {Button}
              </Tooltip>
            ) : (
              Button
            );
          })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        color="inherit"
        elevation={1}
        sx={{
          borderBottom: "1px solid",
          borderColor: "var(--divider)",
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
            background: "var(--sidebar-green-gradient)",
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
            background: "var(--sidebar-green-gradient)",
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
          pt: "56px",
        }}
      >
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}
