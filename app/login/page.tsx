
import { Suspense } from "react";
import LoginShell from "./loginShell";

const LoginPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginShell />
    </Suspense>
  );
}

export default LoginPage;
