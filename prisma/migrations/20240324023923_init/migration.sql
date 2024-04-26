/*
  Warnings:

  - Changed the type of `viewers` on the `articles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "articles" DROP COLUMN "viewers",
ADD COLUMN     "viewers" INTEGER NOT NULL;
