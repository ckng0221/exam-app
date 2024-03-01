import { validateCookieToken } from "@/api/auth";
import { getBlobUrl } from "@/api/common";
import { IUser } from "@/api/user";
import { Unauthorized } from "@/components/error/ErrorComp";
import { cookies } from "next/headers";
import ProfileForm from "../ProfileForm";

export default async function page() {
  const accessToken = cookies().get("Authorization");

  let isLoggedIn = false;

  let user;
  if (accessToken) {
    user = await validateCookieToken(accessToken.value);
    if (user.ID) {
      isLoggedIn = true;
    }
  }
  if (!user?.ID) return <Unauthorized />;

  return (
    <div className="p-4">
      <Profile user={user} />
      <hr className="my-4" />
    </div>
  );
}

interface IProfileProps {
  user: IUser;
}

function Profile({ user }: IProfileProps) {
  const imagePath = getBlobUrl(user.ProfilePic);

  return (
    <>
      <ProfileForm user={user} imagePath={imagePath} />
    </>
  );
}
