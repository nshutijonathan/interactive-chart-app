import { InputGroup } from "@/components/ui/input-group";
import {
    MenuContent,
    MenuItem,
    MenuRoot,
    MenuTrigger,
} from "@/components/ui/menu";
import { Button, HStack, Input } from "@chakra-ui/react";
import {
    CreditCard,
    Folders,
    LayoutDashboard,
    Newspaper,
    Settings,
    User,
} from "lucide-react";
import Link from "next/link";
import { HiCog } from "react-icons/hi";
import { LuUser } from "react-icons/lu";
const Sidebar = () => {
  return (
    <>
      <HStack
        gap="10"
        width="full"
        className="bg-secondary dark:bg-slate-800 rounded-none"
      >
        <InputGroup flex="1" startElement={<LuUser />}>
          <Input placeholder="Type a command or search " />
        </InputGroup>
      </HStack>
      <MenuRoot>
        <MenuTrigger asChild>
          <Button variant="outline" size="sm">
            <HiCog /> Features
          </Button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem value="new-txt">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <Link href="/">Dashboard</Link>
          </MenuItem>
          <MenuItem value="new-file">
            <Newspaper className="mr-2 h-4 w-4" />
            <Link href="/posts">Posts</Link>
          </MenuItem>
          <MenuItem value="new-win">
            <Folders className="mr-2 h-4 w-4" />
            <Link href="#">Categories</Link>
          </MenuItem>
          <MenuItem value="new-prf">
            <User className="mr-2 h-4 w-4" />

            <Link href="#">Profile</Link>
          </MenuItem>
          <MenuItem value="new-cred">
            <CreditCard className="mr-2 h-4 w-4" />

            <Link href="#">Billing</Link>
          </MenuItem>
          <MenuItem value="new-sett">
            <Settings className="mr-2 h-4 w-4" />

            <Link href="#">Settings/Analytics</Link>
          </MenuItem>
        </MenuContent>
      </MenuRoot>
    </>
  );
};

export default Sidebar;
