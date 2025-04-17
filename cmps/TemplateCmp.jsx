import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For routing/navigation
import { Button } from "@/components/ui/button"; // Example: UI components (like ShadCN)
import { HomeIcon } from "lucide-react"; // Icon library (Lucide, Heroicons, etc.)

export function Home() {
  const [message, setMessage] = useState("Welcome to the home page!");
  const navigate = useNavigate();

  useEffect(() => {
    // Example side-effect
    console.log("Home component mounted");
  }, []);

  const handleClick = () => {
    // Navigate somewhere on button click
    navigate("/about");
  };

  return (
    <section className="home p-6">
      <div className="flex items-center gap-2">
        <HomeIcon className="w-6 h-6 text-blue-500" />
        <h1 className="text-2xl font-bold">{message}</h1>
      </div>
      <p className="mt-2 text-gray-600">This is a reusable component with common utilities.</p>
      <Button className="mt-4" onClick={handleClick}>
        Go to About
      </Button>
    </section>
  );
}