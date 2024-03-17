/*
  Warnings:

  - You are about to drop the column `amount_baht` on the `wallets` table. All the data in the column will be lost.
  - Added the required column `icon_image` to the `coins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount_usd` to the `wallets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `coins` ADD COLUMN `icon_image` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `wallets` DROP COLUMN `amount_baht`,
    ADD COLUMN `amount_usd` DECIMAL(12, 2) NOT NULL;
