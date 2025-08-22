"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// const schema = z.object({
//   username: z.string().min(1, "กรอกชื่อผู้ใช้"),
//   password: z.string().min(1, "กรอกรหัสผ่าน"),
// });

// type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isSubmitting },
  // } = useForm<FormData>({ resolver: zodResolver(schema) });

  // const onSubmit = async (data: FormData) => {
  //   setApiError(null);
  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_BASE_URL ?? ""}/auth/login`,
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         credentials: "include", // รับคุกกี้เซสชัน (connect.sid) จากแบ็กเอนด์
  //         body: JSON.stringify(data),
  //       }
  //     );

  //     if (!res.ok) {
  //       const msg = (await res.json().catch(() => ({})))?.message ?? "เข้าสู่ระบบไม่สำเร็จ";
  //       throw new Error(Array.isArray(msg) ? msg.join(", ") : msg);
  //     }

  //     // สำเร็จ → ไปหน้า dashboard
  //     router.replace("/dashboard");
  //   } catch (err: any) {
  //     setApiError(err.message || "เกิดข้อผิดพลาด");
  //   }
  // };

  return (
    <main className="min-h-dvh bg-white flex items-center justify-center p-6">
      <h1>testqqq</h1>
      {/* <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow"
        // ใช้ฟอนต์หลักจากโปรเจคเดิม (กำหนดไว้ใน layout เป็น CSS variables)
        style={{ fontFamily: "var(--font-kanit-regular), Helvetica Neue, Helvetica, Arial, sans-serif" }}
      >
        <div className="text-center">
          <img src="/logo.png" alt="logo" className="mx-auto h-12" />
          <h1
            className="mt-3 text-xl"
            style={{ fontFamily: "var(--font-sukhumvit-text), var(--font-kanit-medium), sans-serif" }}
          >
            เข้าสู่ระบบ
          </h1>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm text-gray-700">ชื่อผู้ใช้</label>
            <input
              {...register("username")}
              placeholder="username"
              className="w-full rounded-lg border p-2 outline-none focus:border-black"
              autoComplete="username"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-700">รหัสผ่าน</label>
            <input
              type="password"
              {...register("password")}
              placeholder="password"
              className="w-full rounded-lg border p-2 outline-none focus:border-black"
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {apiError && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-2 text-sm text-red-700">
              {apiError}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-black p-2 text-white disabled:opacity-50"
            style={{ fontFamily: "var(--font-true-bold), var(--font-kanit-medium), sans-serif" }}
          >
            {isSubmitting ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </div>
      </form> */}
    </main>
  );
}