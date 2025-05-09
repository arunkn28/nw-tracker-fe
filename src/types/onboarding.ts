export interface OnboardingData {
  name: string;
  gender: "male" | "female" | "other" | "";
  age: number | null;
  country: string;
  currency: string;
}

export interface UserData extends OnboardingData {
  email: string;
  id: string;
  isOnboarded: boolean;
}
