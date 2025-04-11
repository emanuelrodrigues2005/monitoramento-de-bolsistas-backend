-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "checkinId" TEXT NOT NULL,
    "advisorCpf" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "feedbackDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_id_key" ON "Feedback"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_checkinId_key" ON "Feedback"("checkinId");

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_advisorCpf_key" ON "Feedback"("advisorCpf");

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_checkinId_fkey" FOREIGN KEY ("checkinId") REFERENCES "Checkin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_advisorCpf_fkey" FOREIGN KEY ("advisorCpf") REFERENCES "Advisor"("cpf") ON DELETE RESTRICT ON UPDATE CASCADE;
