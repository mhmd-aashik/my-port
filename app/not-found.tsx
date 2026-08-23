import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-32 text-center sm:px-6">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        This route doesn&apos;t resolve.
      </h1>
      <p className="mt-4 max-w-md leading-relaxed text-muted">
        The page you&apos;re looking for was moved, deleted, or never deployed.
        Let&apos;s get you back to something that returns 200.
      </p>
      <div className="mt-8">
        <ButtonLink href="/">
          <ArrowLeft className="size-4" aria-hidden /> Back to home
        </ButtonLink>
      </div>
    </div>
  );
}
