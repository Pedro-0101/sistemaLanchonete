/*
  Warnings:

  - You are about to alter the column `number` on the `address` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `category_id` to the `item_menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_type` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "item_order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "order_id" TEXT NOT NULL,
    "item_menu_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "obs" TEXT,
    "price" REAL NOT NULL,
    "status_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "item_order_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "item_order_item_menu_id_fkey" FOREIGN KEY ("item_menu_id") REFERENCES "item_menu" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "item_order_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "additional" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_address" ("additional", "cep", "city", "country", "created_at", "id", "neighborhood", "number", "state", "street") SELECT "additional", "cep", "city", "country", "created_at", "id", "neighborhood", "number", "state", "street" FROM "address";
DROP TABLE "address";
ALTER TABLE "new_address" RENAME TO "address";
CREATE TABLE "new_item_menu" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "establishment_id" TEXT NOT NULL,
    "status_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "item_menu_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "item_menu_establishment_id_fkey" FOREIGN KEY ("establishment_id") REFERENCES "establishment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "item_menu_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_item_menu" ("created_at", "description", "establishment_id", "id", "name", "price", "status_id") SELECT "created_at", "description", "establishment_id", "id", "name", "price", "status_id" FROM "item_menu";
DROP TABLE "item_menu";
ALTER TABLE "new_item_menu" RENAME TO "item_menu";
CREATE TABLE "new_order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "establishment_id" TEXT NOT NULL,
    "payment_method_id" INTEGER NOT NULL,
    "delivery_type_id" INTEGER NOT NULL,
    "status_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sent_date" DATETIME,
    "delivery_date" DATETIME,
    CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "order_establishment_id_fkey" FOREIGN KEY ("establishment_id") REFERENCES "establishment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "order_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "payment_method" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "order_delivery_type_id_fkey" FOREIGN KEY ("delivery_type_id") REFERENCES "delivery_type" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "order_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_order" ("created_at", "delivery_date", "delivery_type_id", "establishment_id", "id", "payment_method_id", "sent_date", "status_id", "user_id") SELECT "created_at", "delivery_date", "delivery_type_id", "establishment_id", "id", "payment_method_id", "sent_date", "status_id", "user_id" FROM "order";
DROP TABLE "order";
ALTER TABLE "new_order" RENAME TO "order";
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact_number_id" INTEGER NOT NULL,
    "address_id" INTEGER NOT NULL,
    "user_type" TEXT NOT NULL,
    "status_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "user_contact_number_id_fkey" FOREIGN KEY ("contact_number_id") REFERENCES "contact_number" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "address" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "user_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_user" ("address_id", "contact_number_id", "created_at", "email", "id", "name", "status_id") SELECT "address_id", "contact_number_id", "created_at", "email", "id", "name", "status_id" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
