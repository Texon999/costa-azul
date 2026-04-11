import { useState } from "react";
import AuthLayout from "../components/AuthLayout.jsx";
import Card from "../components/Card.jsx";
import AuthLogin from "../components/AuthLogin.jsx";

export default function LoginPage() {
  const [hasError, setHasError] = useState(false);

  return (
    <AuthLayout>
      <Card hasError={hasError}>
        <AuthLogin mode="login" onError={(error) => setHasError(!!error)} />
      </Card>
    </AuthLayout>
  );
}
