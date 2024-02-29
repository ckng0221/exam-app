import { IAttempt, getAttempts } from "@/api/attempt";
import { validateCookieToken } from "@/api/auth";
import { Unauthorized } from "@/components/error/ErrorComp";
import { cookies } from "next/headers";
import Link from "next/link";
import Badge from "../../components/Badge";
import { Chip } from "@mui/material";

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

  // const user = await getUserById(userID);

  return (
    <div className="p-4">
      <Profile Name={user.Name} Email={user.Email} />
      <hr className="my-4" />
      <Attempts user_id={user.ID} />
    </div>
  );
}

interface IProfileProps {
  Name: string;
  Email: string;
}

function Profile(props: IProfileProps) {
  return (
    <>
      <p>Name: {props.Name}</p>
      <p>Email: {props.Email}</p>
    </>
  );
}

async function Attempts({ user_id }: { user_id: string }) {
  const attempts: IAttempt[] = await getAttempts({ user_id });

  return (
    <div>
      <h1 className="font-bold text-lg mb-4">Attempts</h1>
      {attempts.length > 0 ? (
        <ul>
          {attempts.map((attempt) => {
            const path = attempt.IsSubmitted ? "result" : "review";
            const attemptPath = `topics/${attempt.TopicID}/exams/${attempt.ID}/${path}`;
            return (
              <li key={attempt.ID} className="mb-2">
                <Link
                  href={attemptPath}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  ID {attempt.ID} : Topic {attempt.TopicID} : Score:{" "}
                  {attempt.Score}
                </Link>
                &nbsp;
                {attempt.IsSubmitted ? (
                  <Chip label="Completed" color="success" size="small" />
                ) : (
                  <Chip label="In Progress" color="warning" size="small" />
                )}
                &nbsp;
                {attempt.IsSubmitted &&
                  (attempt.IsPass ? (
                    <Chip label="Passed" color="success" size="small" />
                  ) : (
                    <Chip label="Failed" color="error" size="small" />
                  ))}
              </li>
            );
          })}
        </ul>
      ) : (
        <>No attempts</>
      )}
    </div>
  );
}
