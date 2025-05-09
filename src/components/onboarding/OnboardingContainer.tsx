import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import AuthButtons from "./AuthButtons";
import OnboardingForm from "./OnboardingForm";
import { OnboardingData, UserData } from "../../types/onboarding";

interface OnboardingContainerProps {
  onComplete: (userData: UserData) => void;
}

export default function OnboardingContainer({
  onComplete,
}: OnboardingContainerProps) {
  const [activeTab, setActiveTab] = useState<"signup" | "signin">("signup");
  const [currentStep, setCurrentStep] = useState<"auth" | "onboarding">("auth");
  const [tempUserData, setTempUserData] = useState<Partial<UserData>>({
    id: "",
    email: "",
    isOnboarded: false,
  });

  const handleEmailAuth = (email: string, password: string) => {
    // In a real app, you would call an API to authenticate/register the user
    // For now, we'll simulate a successful authentication
    console.log("Email auth with:", email, password);

    setTempUserData((prev) => ({
      ...prev,
      id: `user_${Date.now()}`,
      email,
    }));

    setCurrentStep("onboarding");
  };

  const handleGoogleAuth = () => {
    // In a real app, you would integrate with Google OAuth
    // For now, we'll simulate a successful authentication
    console.log("Google auth clicked");

    setTempUserData((prev) => ({
      ...prev,
      id: `google_user_${Date.now()}`,
      email: "google.user@example.com",
    }));

    setCurrentStep("onboarding");
  };

  const handleOnboardingComplete = (onboardingData: OnboardingData) => {
    const completeUserData: UserData = {
      ...onboardingData,
      id: tempUserData.id || `user_${Date.now()}`,
      email: tempUserData.email || "",
      isOnboarded: true,
    };

    // In a real app, you would save this data to your backend
    console.log("Onboarding complete with data:", completeUserData);

    // Pass the complete user data to the parent component
    onComplete(completeUserData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        {currentStep === "auth" ? (
          <>
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Net Worth Tracker
              </CardTitle>
              <CardDescription className="text-center">
                Track and visualize your financial journey
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs
                defaultValue={activeTab}
                onValueChange={(v) => setActiveTab(v as "signup" | "signin")}
              >
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                </TabsList>

                <TabsContent value="signup">
                  <AuthButtons
                    onEmailAuth={handleEmailAuth}
                    onGoogleAuth={handleGoogleAuth}
                    isSignUp={true}
                  />
                </TabsContent>

                <TabsContent value="signin">
                  <AuthButtons
                    onEmailAuth={handleEmailAuth}
                    onGoogleAuth={handleGoogleAuth}
                    isSignUp={false}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>

            <CardFooter className="flex justify-center text-sm text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Complete Your Profile
              </CardTitle>
              <CardDescription className="text-center">
                Tell us a bit about yourself to personalize your experience
              </CardDescription>
            </CardHeader>

            <CardContent>
              <OnboardingForm onComplete={handleOnboardingComplete} />
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
