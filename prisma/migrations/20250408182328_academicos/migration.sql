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

-- CreateTable
CREATE TABLE "Student" (
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "studentRegistration" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "bankAccount" TEXT NOT NULL,
    "bankAgency" TEXT NOT NULL,
    "researchGrant" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("cpf")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "scholarshipValue" DOUBLE PRECISION NOT NULL,
    "advisorId" TEXT NOT NULL,
    "scholarshipStudent" TEXT[],

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Advisor_cpf_key" ON "Advisor"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Advisor_email_key" ON "Advisor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Advisor_phone_key" ON "Advisor"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Student_cpf_key" ON "Student"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_phone_key" ON "Student"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Project_id_key" ON "Project"("id");
