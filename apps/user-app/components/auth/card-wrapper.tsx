"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@repo/ui/components/ui/card";
import { Header } from "@components/auth/header";
import { Social } from "@components/auth/social";
import { BackButton } from "@components/auth/back-button";

interface CardWrapperProps {
  children?: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHrf: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHrf,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel}></Header>
        <CardContent> {children}</CardContent>
        {showSocial && (
          <CardFooter>
            <Social />
          </CardFooter>
        )}
        <CardFooter>
          <BackButton href={backButtonHrf} label={backButtonLabel} />
        </CardFooter>
      </CardHeader>
    </Card>
  );
};
