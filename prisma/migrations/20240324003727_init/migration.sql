/*
  Warnings:

  - You are about to drop the `_ArticleToCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `articles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ArticleToCategory" DROP CONSTRAINT "_ArticleToCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArticleToCategory" DROP CONSTRAINT "_ArticleToCategory_B_fkey";

-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "categoryId" INTEGER NOT NULL,
ALTER COLUMN "published" SET DEFAULT true;

-- DropTable
DROP TABLE "_ArticleToCategory";

-- DropTable
DROP TABLE "categories";

-- CreateTable
CREATE TABLE "categorys" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categorys_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categorys_name_key" ON "categorys"("name");

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categorys"("id") ON DELETE CASCADE ON UPDATE CASCADE;
