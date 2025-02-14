"use client";

import { signOut, useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession({
    required: true,
  });

  return (
    <div className="w-screen h-screen text-wrap flex flex-col justify-center items-center">
      <h1>Id: {session?.user?.id}</h1>
      <h1>Email: {session?.user?.email}</h1>
      <div>
        Token: <input type="text" value={session?.user?.token} />
      </div>

      <button
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
}
