"use client";
import { useEffect, useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

interface UserData {
  name: string;
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
}

interface CommentData {
  postId: string;
  commentCount: number;
}

const AnalyticsDashboard = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [commentData, setCommentData] = useState<CommentData[]>([]);

  useEffect(() => {
    const mockUserData: UserData[] = [
      { name: "Alice", pageViews: 200, uniqueVisitors: 150, bounceRate: 30 },
      { name: "Bob", pageViews: 300, uniqueVisitors: 200, bounceRate: 40 },
      { name: "Charlie", pageViews: 250, uniqueVisitors: 180, bounceRate: 25 },
      { name: "David", pageViews: 350, uniqueVisitors: 250, bounceRate: 35 },
      { name: "Eve", pageViews: 450, uniqueVisitors: 300, bounceRate: 20 },
      { name: "Frank", pageViews: 500, uniqueVisitors: 350, bounceRate: 10 },
    ];
    setUserData(mockUserData);

    const mockCommentData: CommentData[] = [
      { postId: "Post 1", commentCount: 5 },
      { postId: "Post 2", commentCount: 8 },
      { postId: "Post 3", commentCount: 12 },
      { postId: "Post 4", commentCount: 7 },
      { postId: "Post 5", commentCount: 3 },
      { postId: "Post 6", commentCount: 15 },
    ];
    setCommentData(mockCommentData);
  }, []);

  return (
    <div>
      <h1>Analytics Dashboard</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <div style={{ height: 400, width: "100%" }}>
          <h2>User Analytics</h2>
          <ResponsiveContainer>
            <LineChart data={userData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="pageViews"
                stroke="#8884d8"
                name="Page Views"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="uniqueVisitors"
                stroke="#82ca9d"
                name="Unique Visitors"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="bounceRate"
                stroke="#ffc658"
                name="Bounce Rate (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ height: 400, width: "100%" }}>
          <h2>Comment Analytics</h2>
          <ResponsiveContainer>
            <BarChart data={commentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="postId" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="commentCount" fill="#8884d8" name="Comments" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
