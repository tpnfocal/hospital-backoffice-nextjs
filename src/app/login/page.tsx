"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Link as MuiLink,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ChulaCareLogo from "@/assets/images/logo.png";

type Form = { username: string; password: string };

export default function LoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const redirect = useMemo(() => search.get("redirect") || "/", [search]);

  const [form, setForm] = useState<Form>({ username: "", password: "" });
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const validate = () => {
    const e: typeof errors = {};
    if (!form.username) e.username = "Invalid Username !!!";
    if (!form.password || form.password.length < 3)
      e.password = "Invalid Password !!!";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async () => {
    setApiError(null);
    if (!validate()) return;

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL ?? ""}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // รับคุกกี้เซสชันจากแบ็กเอนด์ (เช่น connect.sid)
          body: JSON.stringify(form),
        }
      );
      if (!res.ok) {
        const msg =
          (await res.json().catch(() => ({})))?.message ??
          "เข้าสู่ระบบไม่สำเร็จ";
        throw new Error(Array.isArray(msg) ? msg.join(", ") : msg);
      }
      router.replace(redirect || "/");
    } catch (err: any) {
      setApiError(err.message || "เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        bgcolor: "white",
        display: "grid",
        placeItems: "center",
        p: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          position: "relative",
          width: 350,
          maxWidth: "100%",
          p: 4.5,
          borderRadius: 1,
          boxShadow: "0px 2px 5px 2px rgba(0, 68, 130, 0.2)",
          "&:before": {
            content: '""',
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 10,
            bgcolor: "rgb(0, 194, 86)",
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
          },
        }}
      >
        {/* โลโก้ */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: -7,
            mb: 2,
          }}
        >
          <Image
            src={ChulaCareLogo}
            alt="Chula Care Logo"
            style={{ width: 120, height: "auto" }}
            priority
          />
        </Box>

        <Typography
          variant="h5"
          align="center"
          sx={{ fontWeight: 700, color: "rgb(74,74,74)", mb: 4 }}
        >
          Chula Care
        </Typography>

        <Box
          sx={{
            display: "grid",
            gap: 2.5,
          }}
        >
          {/* Username */}
          <TextField
            placeholder="username"
            autoComplete="username"
            value={form.username}
            onChange={(e) =>
              setForm((s) => ({ ...s, username: e.target.value }))
            }
            error={!!errors.username}
            helperText={errors.username}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon sx={{ color: "#889aa4" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: 47,
                borderRadius: "35px",
                bgcolor: "white",
              },
              input: {
                color: "rgb(151,151,151)",
                p: "12px 15px",
              },
            }}
          />

          {/* Password */}
          <TextField
            type={showPwd ? "text" : "password"}
            placeholder="password"
            autoComplete="current-password"
            value={form.password}
            onChange={(e) =>
              setForm((s) => ({ ...s, password: e.target.value }))
            }
            onKeyUp={(e) => e.key === "Enter" && handleLogin()}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon sx={{ color: "#889aa4" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPwd((v) => !v)}>
                    {showPwd ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: 47,
                borderRadius: "35px",
                bgcolor: "white",
              },
              input: {
                color: "rgb(151,151,151)",
                p: "12px 15px",
              },
            }}
          />

          {/* Error จาก API */}
          {apiError && (
            <Typography variant="body2" color="error">
              {apiError}
            </Typography>
          )}

          {/* ปุ่ม Sign in */}
          <Button
            onClick={handleLogin}
            disabled={loading}
            fullWidth
            sx={{
              height: 47,
              borderRadius: "35px",
              fontSize: 20,
              fontWeight: 600,
              bgcolor: "rgb(0, 194, 86)",
              color: "#fff",
              "&:hover": { bgcolor: "rgba(0,194,86,0.9)" },
            }}
          >
            {loading ? "กำลังเข้าสู่ระบบ..." : "Sign in"}
          </Button>

          {/* Forgot password */}
          <Box sx={{ textAlign: "right" }}>
            <MuiLink
              component="button"
              type="button"
              onClick={() => setForgotOpen(true)}
              sx={{ color: "rgb(0, 194, 86)" }}
            >
              forgot password ?
            </MuiLink>
          </Box>
        </Box>
      </Paper>

      {/* Dialog: Forgot password */}
      <Dialog open={forgotOpen} onClose={() => setForgotOpen(false)}>
        <DialogTitle>Forgot password</DialogTitle>
        <DialogContent>กรุณาติดต่อเจ้าหน้าที่ Admin</DialogContent>
        <DialogActions>
          <Button onClick={() => setForgotOpen(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
