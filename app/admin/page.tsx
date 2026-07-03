import { cookies } from "next/headers";
import { supabaseServer } from "@/lib/supabase";
import { loginAction, logoutAction } from "./actions";
import { Button } from "@/components/ui/button";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("admin_auth");
  const isAuthenticated = authCookie?.value === "authenticated";

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <form
          action={loginAction}
          className="bg-card p-8 rounded-xl border border-border shadow-lg max-w-sm w-full space-y-4"
        >
          <h1 className="text-2xl font-bold text-center mb-6">
            Đăng Nhập Admin
          </h1>
          <div>
            <label className="block text-sm mb-2">Mật khẩu</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 rounded-md bg-background border border-border focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            Đăng Nhập
          </Button>
        </form>
      </div>
    );
  }

  // Fetch data if authenticated
  let registrations: any[] = [];
  let errorMsg = "";

  if (supabaseServer) {
    const { data, error } = await supabaseServer
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      errorMsg = "Lỗi khi tải dữ liệu từ Supabase";
      console.error(error);
    } else {
      registrations = data || [];
    }
  } else {
    errorMsg = "Chưa cấu hình SUPABASE_SERVICE_ROLE_KEY hoặc URL";
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Danh Sách Đăng Ký</h1>
          <form action={logoutAction}>
            <Button variant="outline" type="submit">
              Đăng Xuất
            </Button>
          </form>
        </div>

        {errorMsg ? (
          <div className="bg-red-500/10 text-red-500 p-4 rounded-lg border border-red-500/20">
            {errorMsg}
          </div>
        ) : (
          <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-secondary text-secondary-foreground text-xs uppercase">
                  <tr>
                    <th className="px-6 py-4 font-medium">Họ và Tên</th>
                    <th className="px-6 py-4 font-medium">Số Điện Thoại</th>
                    <th className="px-6 py-4 font-medium">Email</th>
                    <th className="px-6 py-4 font-medium">Ngày Đăng Ký</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {registrations.length > 0 ? (
                    registrations.map((reg) => (
                      <tr
                        key={reg.id}
                        className="hover:bg-secondary/50 transition-colors"
                      >
                        <td className="px-6 py-4">{reg.full_name}</td>
                        <td className="px-6 py-4">{reg.phone}</td>
                        <td className="px-6 py-4">{reg.email}</td>
                        <td className="px-6 py-4">
                          {new Date(reg.created_at).toLocaleString("vi-VN")}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-8 text-center text-foreground/50"
                      >
                        Chưa có lượt đăng ký nào.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
