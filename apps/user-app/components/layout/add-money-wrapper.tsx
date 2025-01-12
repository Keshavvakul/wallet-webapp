import * as React from "react";
import { AmountTransferForm } from "@components/layout/amount-transfer-form";
import { P2PTransferForm } from "@components/layout/p2p-transfer-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";

interface AddMoneyWrapperProps {
  title: string;
  firstInputLabel: string;
  firstInputPlaceholder: string;
  secondInputLabel: string;
  isTransfer: boolean;
}

export const AddMoneyWrapper = ({
  title,
  firstInputLabel,
  firstInputPlaceholder,
  secondInputLabel,
  isTransfer,
}: AddMoneyWrapperProps) => {
  return (
    <Card className="w-[600px] bg-white">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {isTransfer ? (
          <AmountTransferForm
            firstInputLabel={firstInputLabel}
            secondInputLabel={secondInputLabel}
            firstInputPlaceholder={firstInputPlaceholder}
          />
        ) : (
          <P2PTransferForm
            firstInputLabel={firstInputLabel}
            secondInputLabel={secondInputLabel}
            firstInputPlaceholder={firstInputPlaceholder}
          />
        )}
      </CardContent>
    </Card>
  );
};
