"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const HomeView = () => {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    return (
    <div className="p-4 flex flex-col gap-y-4">
        {session && (
        <>
            <p>Logged in as {session.user.name}</p>
            <Button onClick={() => authClient.signOut({
                fetchOptions: { onSuccess : () => router.push("/sign-in") }}
            )}>Sign Out</Button>
        </>
        )}
    </div>
    )
}

export default HomeView;