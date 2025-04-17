/*
  Warnings:

  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentProject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StudentProject" DROP CONSTRAINT "StudentProject_projectId_fkey";

-- DropForeignKey
ALTER TABLE "StudentProject" DROP CONSTRAINT "StudentProject_studentId_fkey";

-- DropTable
DROP TABLE "Project";

-- DropTable
DROP TABLE "StudentProject";

-- CreateTable
CREATE TABLE "Advisor" (
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "advisorRegistration" TEXT NOT NULL,

    CONSTRAINT "Advisor_pkey" PRIMARY KEY ("cpf")
);

-- CreateIndex
CREATE UNIQUE INDEX "Advisor_cpf_key" ON "Advisor"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Advisor_email_key" ON "Advisor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Advisor_phone_key" ON "Advisor"("phone");
