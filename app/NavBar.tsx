"use client";

import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { Skeleton } from "@/app/components";

const NavBar = () => (
  <nav className="px-5 h-14 border-b mb-5 py-2">
    <Container>
      <Flex justify="between" align="center">
        <Flex align="center" gap="3">
          <Link href="/">
            <AiFillBug />
          </Link>
          <NavLinks />
        </Flex>
        <AuthStatus />
      </Flex>
    </Container>
  </nav>
);

const getFirstName = (name: string): string => {
  return name.split(" ")[0];
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="4rem" height="36px" />;

  if (status === "unauthenticated")
    return <Link href="/api/auth/signin">Login</Link>;

  if (status === "authenticated")
    return (
      <Box>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Flex
              gap="2"
              className="p-2 rounded-md transition-all cursor-pointer hover:bg-slate-100"
            >
              <Text size="3" className="font-medium text-slate-500">
                {getFirstName(session!.user!.name!)}
              </Text>
              <Avatar
                src={session!.user!.image!}
                fallback="?"
                size="1"
                radius="full"
                className="cursor-pointer"
                referrerPolicy="no-referrer"
              />
            </Flex>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="2">{session!.user!.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href="/api/auth/signout" className="w-full h-full py-[6px]">
                Log Out
              </Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Box>
    );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <Flex gap="5" height="100%">
      {links.map(({ href, label }) => (
        <Link key={href} href={href}>
          <Text
            className={classNames({
              "text-zinc-900": href === currentPath,
              "text-zinc-500": href !== currentPath,
              "hover:text-zinc-800 transition-colors": true,
            })}
          >
            {label}
          </Text>
        </Link>
      ))}
    </Flex>
  );
};

export default NavBar;
