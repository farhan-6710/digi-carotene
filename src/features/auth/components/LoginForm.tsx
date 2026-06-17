import { useState, type FormEvent } from "react";

import {
  AuthEmailField,
  AuthFormAlert,
  AuthPasswordField,
} from "@/features/auth/components/AuthFormFields";
import { AuthGoogleSignIn } from "@/features/auth/components/AuthGoogleSignIn";
import { authFormStyles } from "@/features/auth/components/authFormStyles";
import { useAuth } from "@/features/auth/providers/AuthProvider";
import { LoadingSpinner } from "@/shared/components/LoadingSpinner";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

export function LoginForm() {
  const { signInWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isBusy = isSubmitting;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const authError = await signInWithEmail(email.trim(), password);
    if (authError) {
      setError(authError.message);
    }

    setIsSubmitting(false);
  }

  return (
    <div className="space-y-6">
      <form onSubmit={(event) => void handleSubmit(event)} className="space-y-4">
        <AuthEmailField
          id="login-email"
          value={email}
          onChange={setEmail}
          disabled={isBusy}
        />

        <AuthPasswordField
          id="login-password"
          label="Password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
          placeholder="Enter your password"
          disabled={isBusy}
        />

        {error ? <AuthFormAlert message={error} variant="error" /> : null}

        <Button
          type="submit"
          className={cn(authFormStyles.submitButton, "mt-2")}
          disabled={isBusy}
        >
          {isSubmitting ? (
            <>
              <LoadingSpinner size="sm" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      <AuthGoogleSignIn
        disabled={isBusy}
        onError={setError}
        onBeforeSignIn={() => setError(null)}
      />
    </div>
  );
}
