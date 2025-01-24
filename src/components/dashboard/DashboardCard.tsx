import { Avatar } from "@/components/ui/avatar";
import { Card } from "@chakra-ui/react";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  count: number;
  title: string;
  icon: React.ReactElement<LucideIcon>;
  onClick?: () => void; 
}

const DashboardCard = ({ count, title, icon, onClick }: DashboardCardProps) => {
  return (
    <Card.Root
      width="320px"
      className="bg-slate-100 dark:bg-slate-800 p-4 pb-0 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick} 
    >
      <Avatar name="Nue Camp" size="lg" shape="rounded" >
        {icon}
      </Avatar>
      <Card.Title mt="2" className='text-3xl text-center mb-4 font-bold text-slate-500 dark:text-slate-200'>{title}</Card.Title>
      <Card.Body gap="2">
        <Card.Title
          mt="2"
          className="text-3xl text-center mb-4 font-bold text-slate-500 dark:text-slate-200"
        >
          {count}
        </Card.Title>
      </Card.Body>
    </Card.Root>
  );
};

export default DashboardCard;
