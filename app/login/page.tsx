
import { Suspense } from "react";
import LoginShell from "./loginShell";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading login...</div>}>
      <LoginShell />
    </Suspense>
  );
}
