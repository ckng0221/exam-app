import { Breadcrumbs, Link } from "@mui/material";
import NextLink from "next/link";

interface IBreadcrumb {
  name: string;
  href: string;
}

export default function ActiveLastBreadcrumb({
  breadcrumbs,
}: {
  breadcrumbs: IBreadcrumb[];
}) {
  const breadcrumbsLength = breadcrumbs.length;
  return (
    <Breadcrumbs aria-label="breadcrumb">
      {breadcrumbs.map((breadcrumb, i) => {
        let color = "inherit";
        if (i == breadcrumbsLength - 1) {
          color = "text.primary";
        }
        return (
          <Link
            key={i}
            underline="hover"
            color={color}
            href={breadcrumb.href}
            component={NextLink}
          >
            {breadcrumb.name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
