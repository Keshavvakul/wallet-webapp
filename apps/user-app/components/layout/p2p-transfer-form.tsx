"use client";

import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import { CardFooter } from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import React, { useState } from "react";
import { p2pTransfer } from "@actions/p2pTransfer";

interface P2PTransferFormProps {
  firstInputLabel: string;
  firstInputPlaceholder: string;
  secondInputLabel: string;
}

interface p2pTransferResults {
  success: boolean;
  message: string;
}

export const P2PTransferForm = ({
  firstInputLabel,
  secondInputLabel,
  firstInputPlaceholder,
}: P2PTransferFormProps) => {
  const [amount, setAmount] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handelFormSubmit = async (value: React.FormEvent<HTMLFormElement>) => {
    value.preventDefault();
    // Form submit logic
    const {success, message}: p2pTransferResults = await p2pTransfer(phoneNumber, amount * 100);
    alert(message);
    console.log(success);
  };

  const handelPhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("amount: ", e.target.value);
    setPhoneNumber(e.target.value);
  };

  const handelp2pAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
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
              onChange={handelPhoneNumberChange}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label className="font-semibold text-base" htmlFor="bank">
              {secondInputLabel}
            </Label>
            <Input
              id="amount"
              placeholder="Enter amount"
              onChange={handelp2pAmountChange}
            />
          </div>
        </div>
        <CardFooter className="flex justify-center pt-10">
          <Button
            className="bg-[#00baf2] w-40 h-11 text-white font-semibold"
            size={"lg"}
            variant="outline"
          >
            Send Money
          </Button>
        </CardFooter>
      </form>
    </>
  );
};

