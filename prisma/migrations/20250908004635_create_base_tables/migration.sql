/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `contact_number` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "additional" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact_number_id" INTEGER NOT NULL,
    "address_id" INTEGER NOT NULL,
    "status_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "user_contact_number_id_fkey" FOREIGN KEY ("contact_number_id") REFERENCES "contact_number" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "establishment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "status_id" INTEGER NOT NULL,
    "isOpen" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "establishment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "establishment_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "item_menu" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "establishment_id" TEXT NOT NULL,
    "status_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "item_menu_establishment_id_fkey" FOREIGN KEY ("establishment_id") REFERENCES "establishment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "item_menu_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "establishment_id" TEXT NOT NULL,
    "payment_method_id" INTEGER NOT NULL,
    "delivery_type_id" INTEGER NOT NULL,
    "status_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sent_date" DATETIME NOT NULL,
    "delivery_date" DATETIME NOT NULL,
    CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "order_establishment_id_fkey" FOREIGN KEY ("establishment_id") REFERENCES "establishment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "order_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "payment_method" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "order_delivery_type_id_fkey" FOREIGN KEY ("delivery_type_id") REFERENCES "delivery_type" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "order_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "establishment_name_key" ON "establishment"("name");

-- CreateIndex
CREATE UNIQUE INDEX "contact_number_number_key" ON "contact_number"("number");
