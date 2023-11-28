/*
  Warnings:

  - You are about to alter the column `bestCDescription` on the `Votes` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(300)`.
  - You are about to alter the column `worstCDescription` on the `Votes` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(300)`.

*/
-- AlterTable
ALTER TABLE "Votes" ALTER COLUMN "bestCDescription" SET DATA TYPE VARCHAR(300),
ALTER COLUMN "worstCDescription" SET DATA TYPE VARCHAR(300);
