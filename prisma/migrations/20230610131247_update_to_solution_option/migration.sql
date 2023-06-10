-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Activity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "asset_number" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "solution" TEXT,
    "is_finished" BOOLEAN NOT NULL DEFAULT false,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Activity" ("asset_number", "create_at", "description", "id", "is_finished", "solution", "update_at", "userId") SELECT "asset_number", "create_at", "description", "id", "is_finished", "solution", "update_at", "userId" FROM "Activity";
DROP TABLE "Activity";
ALTER TABLE "new_Activity" RENAME TO "Activity";
CREATE UNIQUE INDEX "Activity_asset_number_key" ON "Activity"("asset_number");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
