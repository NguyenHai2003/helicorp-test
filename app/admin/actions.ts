"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(formData: FormData) {
  const password = formData.get("password");
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return { error: "ADMIN_PASSWORD chưa được cấu hình trên server" };
  }

  if (password === adminPassword) {
    // Set a simple cookie
    const cookieStore = await cookies();
    cookieStore.set("admin_auth", "authenticated", {
      secure: true,
      httpOnly: true,
    });
    redirect("/admin");
  } else {
    return { error: "Mật khẩu không chính xác" };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_auth");
  redirect("/admin");
}
