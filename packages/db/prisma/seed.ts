import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main () {
    const id1 = "cm2meetn3000068surpfa6fbw";
    const id2 = "cm2i5pmf50000102x4bc0i5lj";
    
    const transaction1 = await prisma.onRampTransaction.create({
        data: {
            userId: id1, // Linking this transaction to the existing user with id1
            startTime: new Date(),
            status: "Success",
            amount: 20000,
            token: "122",
            provider: "HDFC Bank",
        }
    });

    const transaction2 = await prisma.onRampTransaction.create({
        data: {
            userId: id2, // Linking this transaction to the existing user with id1
            startTime: new Date(),
            status: "Success",
            amount: 2000,
            token: "123",
            provider: "HDFC Bank",
        },
    });

    console.log("user1 and user2 are: ", transaction1, transaction2);
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e);
        console.log("error while seeding");
        await prisma.$disconnect();
        process.exit(1);
    })