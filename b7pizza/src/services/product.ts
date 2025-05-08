export const getAllProducts = async () => {
    return await prisma.product.findMany();
}