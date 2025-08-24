// /api/clerk/webhook
import { db } from "@/server/db";

export const POST = async (req: Request) => {
  try {
    const { data } = await req.json();

    // Safe access: if no email_addresses, fallback to empty string
    const emailAddress = data.email_addresses?.[0]?.email_address || "";

    const firstName = data.first_name || "";
    const lastName = data.last_name || "";
    const imageUrl = data.image_url || "";
    const id = data.id;

    await db.user.upsert({
      where: { id },
      update: { emailAddress: emailAddress || undefined, firstName, lastName, imageUrl },
      create: { id, emailAddress, firstName, lastName, imageUrl },
    });

    console.log("✅ User upserted from Clerk webhook");
    console.log("Clerk Webhook Data:", data);

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("❌ Error handling Clerk webhook:", err);
    return new Response("Error processing webhook", { status: 500 });
  }
};
