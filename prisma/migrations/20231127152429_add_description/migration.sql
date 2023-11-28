/*
  Warnings:

  - Added the required column `bestCDescription` to the `Votes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `worstCDescription` to the `Votes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Votes" ADD COLUMN     "bestCDescription" TEXT NOT NULL,
ADD COLUMN     "worstCDescription" TEXT NOT NULL;
