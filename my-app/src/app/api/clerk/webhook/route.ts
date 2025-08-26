// /api/clerk/webhook/route.ts
import { db } from "@/server/db";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();

    console.log("📩 Full webhook body:", body);

    const eventType = body.type;
    const userData = body.data;

    if (eventType === "user.created" || eventType === "user.updated") {
      const emailAddress = userData.email_addresses?.[0]?.email_address || "";
      const firstName = userData.first_name || "";
      const lastName = userData.last_name || "";
      const imageUrl = userData.image_url || "";
      const id = userData.id;

      await db.user.upsert({
        where: { id },
        update: { emailAddress, firstName, lastName, imageUrl },
        create: { id, emailAddress, firstName, lastName, imageUrl },
      });

      console.log("✅ User upserted from Clerk webhook:", id);
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("❌ Error handling Clerk webhook:", err);
    return new Response("Error processing webhook", { status: 500 });
  }
};
