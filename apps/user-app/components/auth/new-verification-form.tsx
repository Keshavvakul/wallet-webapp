"use client"

import { CardWrapper } from "@components/auth/card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@actions/new-verification";
import {FormError} from "@repo/ui/components/form-error";
import {FormSuccess} from "@repo/ui/components/form-success";

export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (success || error) return;

        if (!token) {
            setError("Missing Token!");
            return;
        };

        newVerification(token)
            .then((data) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch(() => {
                setError("Something went wrong in verification");
            })
    }, [token, success, error])

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <CardWrapper 
        headerLabel="Confirming your verification" 
        backButtonHrf="/auth/signin"  
        backButtonLabel="back to login">
            <div className="flex item-center w-full justify-center pt-7">
                {!success && !error &&(
                    <BeatLoader /> 
                )} 
                <FormSuccess message={success} />  
                {!success && (
                    <FormError message={error}/>
                )}             
            </div>           
        </CardWrapper>
    )
}