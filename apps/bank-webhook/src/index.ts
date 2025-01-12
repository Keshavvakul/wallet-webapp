import express from "express";
import { PaymentInformationSchema } from "@repo/common/zodValidation";
import db from "@repo/db/client";

const app = express();

app.use(express.json());

app.post("/bankwebhook", async (req, res) => {
    // Check is onRampTransaction is processing or not 
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.userId,
        amount: req.body.amount * 100
    }

    const validatedPaymentInformation = PaymentInformationSchema.safeParse(paymentInformation);
    if (validatedPaymentInformation.success) {
        try {
            await db.$transaction(
                [
                    db.balance.update({
                        where: {
                            userId: validatedPaymentInformation.data.userId,
                        },
                        data: {
                            amount: {
                                increment: validatedPaymentInformation.data.amount
                            }
                        }
                    }),
                    db.onRampTransaction.update({
                        where: {
                            token: validatedPaymentInformation.data.token
                        },
                        data:{
                            status: "Success"
                        }
                    })
                ]
            )
            res.json({
                message: "Captured"
            })
        } catch (e) {
            console.error(e);
            res.status(411).json({message: "Error while processing webhook"})
        }
    } else {
        res.status(400).json({
            message: "Invalid payment information",
            errors: validatedPaymentInformation.error.format()
        })
    }
})

app.listen("8080", () => {
    console.log("listening on port 8080");
})