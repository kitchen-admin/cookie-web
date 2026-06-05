"use client";

import { useState, type FormEvent } from "react";

import { Input } from "@/components/ui/input";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { cn } from "@/lib/utils";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function handleJoin(email: string): Promise<void> {
  // TODO: Connect to waitlist API (e.g. Resend, Loops, or your backend).
  await new Promise((resolve) => setTimeout(resolve, 400));
  console.log("[waitlist] joined:", email);
}

type WaitlistFormProps = {
  className?: string;
};

export function WaitlistForm({ className }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const trimmed = email.trim();
    if (!trimmed) {
      setError("Please enter your email address.");
      return;
    }
    if (!EMAIL_PATTERN.test(trimmed)) {
      setError("Please enter a valid email (e.g. name@email.com).");
      return;
    }

    setLoading(true);
    try {
      await handleJoin(trimmed);
      setSuccess(true);
      setEmail("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <p className="type-body-md-medium text-center text-text-brand-primary">
        You&apos;re on the list! We&apos;ll be in touch soon.
      </p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("flex w-full max-w-[320px] flex-col gap-2", className)}
    >
      <div className="flex items-center rounded-[40px] border-2 border-(--primitive-black-8) p-1">
        <Input
          type="email"
          name="email"
          placeholder="name@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          aria-invalid={!!error}
          className={cn(
            "type-body-md-regular h-10 flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0",
            "placeholder:text-(--text-tertiary-black)"
          )}
        />
        <ShimmerButton
          type="submit"
          disabled={loading}
          background="var(--primitive-black-90)"
          shimmerColor="var(--primitive-base-white)"
          borderRadius="40px"
          className="type-button shrink-0 px-4 py-2 text-(--primitive-base-white)"
        >
          {loading ? "Joining…" : "Join Waitlist"}
        </ShimmerButton>
      </div>
      {error ? (
        <p className="type-body-sm-regular text-center text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
