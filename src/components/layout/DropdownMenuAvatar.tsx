"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BadgeCheckIcon,
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User } from "@/types";




export function DropdownMenuAvatar({ user }:  { user: User }) {
  const router = useRouter();
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };
  // console.log(user);
  const dashboardLink =
    user.role === "ADMIN"
      ? "/dashboard/admin-dashboard"
      : user.role === "TUTOR"
        ? "/dashboard/tutor-dashboard"
        : "/dashboard/user-dashboard";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage
              src={`${user.image || "https://github.com/shadcn.png"} `}
              alt={user.name}
            />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              href={"/account"}
              className="flex gap-2 items-center justify-center"
            >
              <BadgeCheckIcon />
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={dashboardLink}
              className="flex gap-2 items-center justify-center"
            >
              <CreditCardIcon />
              Dashboard
            </Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            <BellIcon />
            Notifications
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
          <LogOutIcon />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
