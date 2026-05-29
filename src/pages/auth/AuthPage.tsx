import { useEffect } from "react";
import { Link, Navigate, useLocation, useSearchParams } from "react-router";

import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import {
  AUTH_FORM_TYPE_PARAM,
  AUTH_SIGNUP_CODE_PARAM,
  AUTH_FORM_TYPES,
  isValidSignupInviteCode,
  resolveAuthFormType,
} from "@/constants/auth/auth";
import { agencyMeta } from "@/constants/public";
import { useAuth } from "@/providers/AuthProvider";

export function AuthPage() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const formTypeParam = searchParams.get(AUTH_FORM_TYPE_PARAM);
  const signupCode = searchParams.get(AUTH_SIGNUP_CODE_PARAM);
  const activeForm = resolveAuthFormType(formTypeParam, signupCode);
  const isSignup = activeForm === AUTH_FORM_TYPES.signup;

  const redirectPath =
    (location.state as { from?: { pathname?: string } } | null)?.from
      ?.pathname ?? "/admin/dashboard";

  useEffect(() => {
    if (
      formTypeParam === AUTH_FORM_TYPES.signup &&
      !isValidSignupInviteCode(signupCode)
    ) {
      setSearchParams(
        (currentParams) => {
          const nextParams = new URLSearchParams(currentParams);
          nextParams.set(AUTH_FORM_TYPE_PARAM, AUTH_FORM_TYPES.login);
          return nextParams;
        },
        { replace: true },
      );
    }
  }, [formTypeParam, signupCode, setSearchParams]);

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
            className="text-3xl font-semibold tracking-wider text-muted-foreground uppercase transition hover:text-foreground"
          >
            {agencyMeta.name}
          </Link>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-6 flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold tracking-tight">
              {isSignup ? "Create account" : "Log in"}
            </h2>
            <p className="text-sm text-muted-foreground text-center">
              {isSignup
                ? "Set up your team portal access to manage clients and posts."
                : "Log in to manage clients and posts."}
            </p>
          </div>

          {isSignup ? <SignupForm /> : <LoginForm />}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing, you agree to our team portal terms of use.
        </p>
      </div>
    </div>
  );
}
