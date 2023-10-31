-- CreateTable
CREATE TABLE "obu_invoice" (
    "obu_id" TEXT NOT NULL,
    "start_lat" DOUBLE PRECISION NOT NULL,
    "start_long" DOUBLE PRECISION NOT NULL,
    "dest_lat" DOUBLE PRECISION NOT NULL,
    "dest_long" DOUBLE PRECISION NOT NULL,
    "total_distance" DOUBLE PRECISION NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,

    CONSTRAINT "obu_invoice_pkey" PRIMARY KEY ("obu_id")
);
