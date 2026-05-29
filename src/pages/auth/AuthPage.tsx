import { Link, Navigate, useLocation } from "react-router";

import { authFormStyles } from "@/components/auth/authFormStyles";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { agencyMeta } from "@/constants/public";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";

export function AuthPage() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const redirectPath =
    (location.state as { from?: { pathname?: string } } | null)?.from
      ?.pathname ?? "/admin/dashboard";

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background text-foreground">
        <div className="size-6 animate-spin rounded-full border-2 border-muted border-t-primary" />
      </div>
    );
  }

  if (user) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-12">
        <div className="mb-8 space-y-2 text-center">
          <Link
            to="/"
            className="text-xs font-semibold tracking-wider text-muted-foreground uppercase transition hover:text-foreground"
          >
            {agencyMeta.name}
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">
            Team portal access
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in or create an account to manage clients and posts.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <Tabs defaultValue="login" className="gap-0">
            <TabsList className={authFormStyles.tabsList}>
              <TabsTrigger
                value="login"
                className={cn(authFormStyles.tabsTrigger)}
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className={cn(authFormStyles.tabsTrigger)}
              >
                Sign up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-0">
              <LoginForm />
            </TabsContent>

            <TabsContent value="signup" className="mt-0">
              <SignupForm />
            </TabsContent>
          </Tabs>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing, you agree to our team portal terms of use.
        </p>
      </div>
    </div>
  );
}
