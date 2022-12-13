-- CreateTable
CREATE TABLE "passengers" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fist_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "passengers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "airlines" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "airlines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" SERIAL NOT NULL,
    "flight_id" TEXT NOT NULL,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flights" (
    "flight_no" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "origin_gate" TEXT,
    "destination" TEXT NOT NULL,
    "destination_gate" TEXT,
    "departure" TIMESTAMP(3) NOT NULL,
    "delayed_departure" TIMESTAMP(3),
    "arrival" TIMESTAMP(3) NOT NULL,
    "delayed_arrival" TIMESTAMP(3),
    "available_seats" INTEGER NOT NULL,
    "airline_id" INTEGER NOT NULL,

    CONSTRAINT "flights_pkey" PRIMARY KEY ("flight_no")
);

-- CreateIndex
CREATE UNIQUE INDEX "passengers_email_key" ON "passengers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "airlines_name_key" ON "airlines"("name");

-- CreateIndex
CREATE UNIQUE INDEX "flights_flight_no_key" ON "flights"("flight_no");

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_flight_id_fkey" FOREIGN KEY ("flight_id") REFERENCES "flights"("flight_no") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flights" ADD CONSTRAINT "flights_airline_id_fkey" FOREIGN KEY ("airline_id") REFERENCES "airlines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
