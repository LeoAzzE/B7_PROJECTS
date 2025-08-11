/*
  Warnings:

  - The primary key for the `ProductImage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Id` on the `ProductImage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."ProductImage" DROP CONSTRAINT "ProductImage_pkey",
DROP COLUMN "Id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("id");
