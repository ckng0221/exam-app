import { getUsers } from "@/api/user";
import ActiveLastBreadcrumb from "@/components/BeadCrumb";
import { Forbidden, Unauthorized } from "@/components/error/ErrorComp";
import { getUserByCookie } from "@/utils/common";
import { UserTable } from "./UserTable";

export default async function page() {
  const user = await getUserByCookie();
  if (!user) return <Unauthorized />;
  if (user.Role !== "admin") return <Forbidden />;

  const breadcrumbs = [
    { name: "Admin", href: "/admin" },
    { name: "Users", href: "/admin/users" },
  ];

  const users = await getUsers();

  return (
    <div className="p-4">
      <div className="mb-4">
        <ActiveLastBreadcrumb breadcrumbs={breadcrumbs} />
      </div>
      <UserTable users={users} />
    </div>
  );
}
