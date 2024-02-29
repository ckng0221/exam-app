import { Forbidden, Unauthorized } from "@/components/error/ErrorComp";
import { Link } from "@mui/material";
import { getUserByCookie } from "../../utils/common";
import NextLink from "next/link";

export default async function Admin() {
  const user = await getUserByCookie();
  if (!user) return <Unauthorized />;
  if (user.Role !== "admin") return <Forbidden />;

  const pageList = [
    {
      title: "Topics",
      href: "/admin/topics",
    },
    {
      title: "Users",
      href: "/admin/users",
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-4 font-bold">Admin Page</div>
      <ul>
        {pageList.map((page, idx) => {
          return (
            <li key={idx} className="mb-2">
              <Link href={page.href} component={NextLink}>
                {page.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
