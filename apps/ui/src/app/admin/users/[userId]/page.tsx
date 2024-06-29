import ActiveLastBreadcrumb from "@/components/BeadCrumb";
import { Forbidden, Unauthorized } from "@/components/error/ErrorComp";
import { getUserByCookie } from "@/utils/common";
import UserForm from "../UserForm";
import { getUserById, getUserRoles } from "../../../../api/user";

export default async function page({ params }: { params: { userId: string } }) {
  const accessUser = await getUserByCookie();
  if (!accessUser) return <Unauthorized />;
  if (accessUser.Role !== "admin") return <Forbidden />;

  const breadcrumbs = [
    { name: "Admin", href: "/admin" },
    { name: "Users", href: "/admin/users" },
    { name: params.userId, href: `/admin/users/${params.userId}` },
  ];

  const user = await getUserById(params.userId);
  if (!user) throw "Failed to fetch user";
  const roles = await getUserRoles();
  if (!roles) throw "Failed to fetch roles";

  return (
    <div className="p-4">
      <div className="mb-4">
        <ActiveLastBreadcrumb breadcrumbs={breadcrumbs} />
      </div>
      <UserForm user={user} roles={roles} />
    </div>
  );
}
