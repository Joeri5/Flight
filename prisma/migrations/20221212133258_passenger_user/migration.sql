/*
  Warnings:

  - You are about to drop the column `email` on the `passengers` table. All the data in the column will be lost.
  - You are about to drop the column `fist_name` on the `passengers` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `passengers` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `passengers` table. All the data in the column will be lost.
  - Added the required column `flight_id` to the `passengers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seat_no` to the `passengers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `passengers` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "passengers_email_key";

-- AlterTable
ALTER TABLE "passengers" DROP COLUMN "email",
DROP COLUMN "fist_name",
DROP COLUMN "last_name",
DROP COLUMN "password",
ADD COLUMN     "flight_id" TEXT NOT NULL,
ADD COLUMN     "seat_no" TEXT NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "passengers" ADD CONSTRAINT "passengers_flight_id_fkey" FOREIGN KEY ("flight_id") REFERENCES "flights"("flight_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "passengers" ADD CONSTRAINT "passengers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
