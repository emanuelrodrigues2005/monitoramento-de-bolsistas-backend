/*
  Warnings:

  - A unique constraint covering the columns `[advisorRegistration]` on the table `Advisor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[studentRegistration]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bankAccount]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "scholarshipValue" DOUBLE PRECISION NOT NULL,
    "advisorCpf" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectStudent" (
    "projectId" TEXT NOT NULL,
    "scholarshipStudentCpf" TEXT NOT NULL,

    CONSTRAINT "ProjectStudent_pkey" PRIMARY KEY ("projectId","scholarshipStudentCpf")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_id_key" ON "Project"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Advisor_advisorRegistration_key" ON "Advisor"("advisorRegistration");

-- CreateIndex
CREATE UNIQUE INDEX "Student_studentRegistration_key" ON "Student"("studentRegistration");

-- CreateIndex
CREATE UNIQUE INDEX "Student_bankAccount_key" ON "Student"("bankAccount");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_advisorCpf_fkey" FOREIGN KEY ("advisorCpf") REFERENCES "Advisor"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectStudent" ADD CONSTRAINT "ProjectStudent_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectStudent" ADD CONSTRAINT "ProjectStudent_scholarshipStudentCpf_fkey" FOREIGN KEY ("scholarshipStudentCpf") REFERENCES "Student"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;
