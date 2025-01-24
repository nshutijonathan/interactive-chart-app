"use client";
import { ChartArea, MessageCircle, Newspaper, User } from "lucide-react";
import { useState } from "react";
import CommentsTable from "../components/comments/CommentsTable";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";
import DashboardCard from "../components/dashboard/DashboardCard";
import PostsTable from "../components/posts/PostsTable";

import UsersTable from "../components/users/UsersTable";
export default function Home() {
  const [activeComponent, setActiveComponent] = useState("Posts");

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "Posts":
        return <PostsTable />;
      case "Users":
        return <UsersTable />;
      case "Comments":
        return <CommentsTable />;
      case "Analytics":
        return <AnalyticsChart />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-5 mb-5">
        <DashboardCard
          count={100}
          title="Posts"
          icon={<Newspaper className="text-slate-500" size={72} />}
          onClick={() => setActiveComponent("Posts")}
        />
        <DashboardCard
          title="Users"
          count={10}
          icon={<User className="text-slate-500" size={72} />}
          onClick={() => setActiveComponent("Users")}
        />
        <DashboardCard
          title="Comments"
          count={500}
          icon={<MessageCircle className="text-slate-500" size={72} />}
          onClick={() => setActiveComponent("Comments")}
        />
        <DashboardCard
          title="Analytics"
          count={2}
          icon={<ChartArea className="text-slate-500" size={72} />}
          onClick={() => setActiveComponent("Analytics")}
        />
      </div>

      {renderActiveComponent()}
      
    </>
  );
}
