-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(150) NOT NULL,
    `createdBy` VARCHAR(100) NOT NULL,
    `updatedBy` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `roleId` INTEGER NOT NULL,
    `fullName` VARCHAR(150) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `mobilePhone` VARCHAR(20) NULL,
    `password` VARCHAR(150) NOT NULL,
    `salt` VARCHAR(150) NOT NULL,
    `verificationCode` VARCHAR(350) NULL,
    `provider` VARCHAR(350) NULL,
    `passwordResetToken` VARCHAR(100) NULL,
    `passwordResetAt` DATETIME(3) NULL,

    UNIQUE INDEX `users_uuid_key`(`uuid`),
    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_verificationCode_key`(`verificationCode`),
    INDEX `users_roleId_fkey`(`roleId`),
    UNIQUE INDEX `users_email_verificationCode_passwordResetToken_key`(`email`, `verificationCode`, `passwordResetToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `module` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(60) NOT NULL,
    `createdBy` VARCHAR(100) NOT NULL,
    `updatedBy` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `feature` VARCHAR(150) NOT NULL,
    `description` VARCHAR(300) NULL,
    `uri` VARCHAR(300) NOT NULL,
    `parentId` INTEGER NOT NULL DEFAULT 0,
    `treeStatus` VARCHAR(1) NOT NULL DEFAULT 'H',
    `icon` VARCHAR(100) NULL,
    `isVisible` TINYINT NOT NULL DEFAULT 1,
    `sequence` INTEGER NULL,

    UNIQUE INDEX `module_uuid_key`(`uuid`),
    UNIQUE INDEX `module_feature_key`(`feature`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `modulePermission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(60) NOT NULL,
    `createdBy` VARCHAR(100) NOT NULL,
    `updatedBy` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modulId` INTEGER NOT NULL,
    `roleId` INTEGER NOT NULL,
    `createRight` TINYINT NOT NULL DEFAULT 0,
    `readRight` TINYINT NOT NULL DEFAULT 1,
    `updateRight` TINYINT NOT NULL DEFAULT 0,
    `deleteRight` TINYINT NOT NULL DEFAULT 0,
    `inactiveRight` TINYINT NOT NULL DEFAULT 0,

    UNIQUE INDEX `modulePermission_uuid_key`(`uuid`),
    INDEX `modulePermission_modulId_fkey`(`modulId`),
    INDEX `modulePermission_roleId_fkey`(`roleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(60) NOT NULL,
    `createdBy` VARCHAR(100) NOT NULL,
    `updatedBy` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `roleName` VARCHAR(150) NOT NULL,

    UNIQUE INDEX `roles_uuid_key`(`uuid`),
    UNIQUE INDEX `roles_roleName_key`(`roleName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `modulePermission` ADD CONSTRAINT `modulePermission_modulId_fkey` FOREIGN KEY (`modulId`) REFERENCES `module`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `modulePermission` ADD CONSTRAINT `modulePermission_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
