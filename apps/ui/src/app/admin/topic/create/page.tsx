import React from "react";
import TopicForm from "../[topicId]/TopicForm";
import ActiveLastBreadcrumb from "../../../../components/BeadCrumb";

export default function page() {
  const topic = {
    ID: "",
    Name: "",
    Description: "",
    PassPercentage: 70,
    IsPublished: false,
  };
  const breadcrumbs = [
    { name: "Admin", href: "/admin" },
    { name: "Topic", href: "/admin" },
    { name: "Create", href: "/admin/topic/create" },
  ];

  return (
    <div className="p-4">
      <ActiveLastBreadcrumb breadcrumbs={breadcrumbs} />
      <TopicForm topic={topic} isNew={true} />
    </div>
  );
}
