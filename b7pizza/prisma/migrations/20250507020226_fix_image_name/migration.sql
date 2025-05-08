/*
  Warnings:

  - You are about to drop the column `imagem` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "imagem",
ADD COLUMN     "image" TEXT NOT NULL DEFAULT 'default.jpg';
