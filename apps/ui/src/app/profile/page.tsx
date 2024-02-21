import React from "react";
import { getUserById } from "@/api/user";
import { IAttempt, getAttempts } from "@/api/attempt";
import Link from "next/link";
import { cookies } from "next/headers";
import { validateCookieToken } from "@/api/auth";
import { Unauthorized } from "@/components/error/ErrorComp";

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
          {attempts.map((attempt) => (
            <li key={attempt.ID}>
              <Link
                href={`topics/${attempt.TopicID}/exams/${attempt.ID}/result`}
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                ID {attempt.ID} : Topic {attempt.TopicID} : Score:{" "}
                {attempt.Score}
              </Link>
              &nbsp;
              {attempt.IsSubmitted ? (
                <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                  Completed
                </span>
              ) : (
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                  In progress
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <>No attempts</>
      )}
    </div>
  );
}
