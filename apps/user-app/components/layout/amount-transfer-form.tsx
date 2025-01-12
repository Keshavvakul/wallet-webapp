"use client";

import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { CardFooter } from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { useState } from "react";
import { createOnRampTransaction } from "@actions/createOnRampTransactions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select";

interface AmountTransferFormProps {
  firstInputLabel: string;
  firstInputPlaceholder: string;
  secondInputLabel: string;
}

const SUPPORTED_BANKS = [
  {
    name: "hdfc",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "pnb",
    redirectUrl: "https://netbanking.pnbbank.com",
  },
];

export const AmountTransferForm = ({
  firstInputLabel,
  secondInputLabel,
  firstInputPlaceholder,
}: AmountTransferFormProps) => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl,
  );
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [addAmount, setAddAmount] = useState(0);

  const handelFormSubmit = async (value: React.FormEvent<HTMLFormElement>) => {
    value.preventDefault();
    window.location.href = redirectUrl || "";
    await createOnRampTransaction(provider, addAmount);
  };

  const handelRedirectUrl = (value: string) => {
    setRedirectUrl(SUPPORTED_BANKS.find((e) => e.name === value)?.redirectUrl);
    setProvider(SUPPORTED_BANKS.find((e) => e.name === value)?.name || "");
  };

  const handelAddAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("amount: ", e.target.value);
    setAddAmount(Number(e.target.value));
  };

  return (
    <>
      <form onSubmit={handelFormSubmit}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label className="font-semibold text-base" htmlFor="name">
              {firstInputLabel}
            </Label>
            <Input
              id="name"
              placeholder={firstInputPlaceholder}
              onChange={handelAddAmountChange}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label className="font-semibold text-base" htmlFor="bank">
              {secondInputLabel}
            </Label>
            <Select onValueChange={handelRedirectUrl}>
              <SelectTrigger id="framework">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent
                className="bg-[#0f4a8a] text-white font-semibold"
                position="popper"
              >
                <SelectItem value="hdfc">HDFC</SelectItem>
                <SelectItem value="pnb">PNB</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <CardFooter className="flex justify-center pt-10">
          <Button
            className="bg-[#00baf2] w-40 h-11 text-white font-semibold"
            size={"lg"}
            variant="outline"
          >
            Add Money
          </Button>
        </CardFooter>
      </form>
    </>
  );
};

