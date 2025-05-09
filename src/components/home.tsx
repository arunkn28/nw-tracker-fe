import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import OnboardingContainer from "./onboarding/OnboardingContainer";
import { useUser } from "../context/UserContext";
import { UserData } from "../types/onboarding";

function Home() {
  const { user, isAuthenticated, isOnboarded, setUser } = useUser();

  // For demo purposes, we'll use localStorage to persist the user session
  useEffect(() => {
    const savedUser = localStorage.getItem("networth_user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse saved user data", error);
        localStorage.removeItem("networth_user");
      }
    }
  }, [setUser]);

  const handleOnboardingComplete = (userData: UserData) => {
    setUser(userData);
    // Save to localStorage for persistence
    localStorage.setItem("networth_user", JSON.stringify(userData));
  };

  return (
    <div className="w-screen min-h-screen bg-background">
      {isAuthenticated && isOnboarded ? (
        <Dashboard />
      ) : (
        <OnboardingContainer onComplete={handleOnboardingComplete} />
      )}
    </div>
  );
}

export default Home;
