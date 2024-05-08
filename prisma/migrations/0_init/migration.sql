-- CreateTable
CREATE TABLE `comments` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `idUser` BIGINT NOT NULL,
    `idPost` BIGINT NOT NULL,
    `comment` VARCHAR(200) NOT NULL,
    `datePosted` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `dateDeleted` DATETIME(0) NULL,

    INDEX `idPost`(`idPost`),
    INDEX `idUser`(`idUser`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `followers` (
    `userFrom` BIGINT NOT NULL,
    `userTo` BIGINT NOT NULL,

    INDEX `userTo`(`userTo`),
    PRIMARY KEY (`userFrom`, `userTo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grows` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `idUser` BIGINT NOT NULL,
    `idStrain` BIGINT NOT NULL,
    `idVegLight` BIGINT NOT NULL,
    `idFloLight` BIGINT NOT NULL,
    `idEnviroment` BIGINT NOT NULL,
    `idMedium` BIGINT NOT NULL,
    `idTypeGrow` BIGINT NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `datePosted` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `dateModified` DATETIME(0) NULL,
    `dateDeleted` DATETIME(0) NULL,

    INDEX `idUser`(`idUser`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `likes` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `idUser` BIGINT NOT NULL,
    `idPost` BIGINT NOT NULL,
    `datePosted` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idPost`(`idPost`),
    INDEX `idUser`(`idUser`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nutrients` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `saves` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `idUser` BIGINT NOT NULL,
    `idPost` BIGINT NOT NULL,
    `datePosted` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idPost`(`idPost`),
    INDEX `idUser`(`idUser`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `strains` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `idRol` BIGINT NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `birthday` DATE NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `profilePic` VARCHAR(255) NULL,

    UNIQUE INDEX `username`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `weekcategories` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `idWeek` BIGINT NOT NULL,
    `category` VARCHAR(50) NOT NULL,

    INDEX `idWeek`(`idWeek`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `weeknutrients` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `idNutrient` BIGINT NOT NULL,
    `idWeek` BIGINT NOT NULL,
    `cuantity` FLOAT NOT NULL,

    INDEX `idNutrient`(`idNutrient`),
    INDEX `idWeek`(`idWeek`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `weeks` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `idPost` BIGINT NOT NULL,
    `idState` BIGINT NOT NULL,
    `number` BIGINT NOT NULL,
    `description` VARCHAR(255) NOT NULL,

    INDEX `idPost`(`idPost`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`idPost`) REFERENCES `grows`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `followers` ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userFrom`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `followers` ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userTo`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `grows` ADD CONSTRAINT `grows_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`idPost`) REFERENCES `grows`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `likes` ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`idUser`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `saves` ADD CONSTRAINT `saves_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `saves` ADD CONSTRAINT `saves_ibfk_2` FOREIGN KEY (`idPost`) REFERENCES `grows`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `strains` ADD CONSTRAINT `strains_ibfk_1` FOREIGN KEY (`id`) REFERENCES `grows`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `weekcategories` ADD CONSTRAINT `weekcategories_ibfk_1` FOREIGN KEY (`idWeek`) REFERENCES `weeks`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `weeknutrients` ADD CONSTRAINT `weeknutrients_ibfk_1` FOREIGN KEY (`idWeek`) REFERENCES `weeks`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `weeknutrients` ADD CONSTRAINT `weeknutrients_ibfk_2` FOREIGN KEY (`idNutrient`) REFERENCES `nutrients`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `weeks` ADD CONSTRAINT `weeks_ibfk_1` FOREIGN KEY (`idPost`) REFERENCES `grows`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

