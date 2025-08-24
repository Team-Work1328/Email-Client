// src/playground.ts
import { db } from "./server/db"; // adjust path if your db.ts is in another folder

async function main() {
  try {
    const user = await db.user.create({
      data: {
        emailAddress: "test@1.com",
        firstName: "Test",
        lastName: "User",
      },
    });

    console.log("User created:", user);
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    await db.$disconnect();
  }
}

main();
