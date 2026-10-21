
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    const products = await prisma.product.count();
    const categories = await prisma.category.count();
    const orders = await prisma.order.count();

    console.log("Supabase connection successful!");
    console.log("Products:", products);
    console.log("Categories:", categories);
    console.log("Orders:", orders);
}

main()
    .catch((error) => {
        console.error("Database test failed:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
