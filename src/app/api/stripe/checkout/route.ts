import { NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    const userId = session?.user?.id || "guest-user";
    const userEmail = session?.user?.email || "parent@example.com";

    const host = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const checkoutSession = await createCheckoutSession({
      userId,
      userEmail,
      returnUrl: host,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}

