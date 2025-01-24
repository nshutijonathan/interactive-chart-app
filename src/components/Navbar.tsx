"use strict";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { HStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import logo from "../img/logo.png";
const Navbar = () => {
  return (
    <div className="bg-primary dark:bg-slate-700 text-white py-2 px-5 flex justify-between">
      <Link href="/">
        <Image src={logo} alt="mylogo" width={40} height={40} />
      </Link>

      <MenuRoot>
        <MenuTrigger asChild>
          <Button variant="outline" size="sm" className="focus:outline-none">
            <HStack gap="3">
              <Avatar size="sm" name="Jon" src="https://bit.ly/sage-adebayo" />
            </HStack>
          </Button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem value="new-txt">My Account</MenuItem>
          <MenuItem value="new-file">
            <Link href="/profile">Profile</Link>
          </MenuItem>
          <MenuItem value="new-win">
            <Link href="/auth">Logout</Link>
          </MenuItem>
        </MenuContent>
      </MenuRoot>
    </div>
  );
};

export default Navbar;
