import React from "react";
import { TopicTable } from "./TopicTable";
import { getUserByCookie } from "../../../utils/common";
import { Forbidden, Unauthorized } from "../../../components/error/ErrorComp";
import { getTopics } from "../../../api/topic";
import ActiveLastBreadcrumb from "../../../components/BeadCrumb";

export default async function page() {
  const user = await getUserByCookie();
  if (!user) return <Unauthorized />;
  if (user.Role !== "admin") return <Forbidden />;

  const breadcrumbs = [
    { name: "Admin", href: "/admin" },
    { name: "Topics", href: "/admin/topics" },
  ];

  const topics = await getTopics();

  return (
    <div className="p-4">
      <div className="mb-4">
        <ActiveLastBreadcrumb breadcrumbs={breadcrumbs} />
      </div>
      <TopicTable topics={topics} />
    </div>
  );
}
