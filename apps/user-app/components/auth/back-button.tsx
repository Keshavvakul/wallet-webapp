"use client";

import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  if (!href) return null;

  return (
    <Button variant="link" className="font-medium w-full" size="sm">
      <Link href={href}>{label}</Link>
    </Button>
  );
};
