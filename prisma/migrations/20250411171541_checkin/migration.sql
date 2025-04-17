-- CreateTable
CREATE TABLE "Checkin" (
    "id" TEXT NOT NULL,
    "dateCheckin" TIMESTAMP(3) NOT NULL,
    "studentCpf" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "howLong" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Checkin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Checkin_id_key" ON "Checkin"("id");

-- AddForeignKey
ALTER TABLE "Checkin" ADD CONSTRAINT "Checkin_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Checkin" ADD CONSTRAINT "Checkin_studentCpf_fkey" FOREIGN KEY ("studentCpf") REFERENCES "Student"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;
