/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Votes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Votes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `media` to the `Votes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Votes" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "media" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Votes_email_key" ON "Votes"("email");
