import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2025-02-24.acacia" as unknown as Stripe.LatestApiVersion,
  typescript: true,
});

export async function createCheckoutSession({
  userId,
  userEmail,
  returnUrl,
}: {
  userId: string;
  userEmail: string;
  returnUrl: string;
}) {
  const priceId = process.env.STRIPE_PRO_PRICE_ID;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    customer_email: userEmail,
    client_reference_id: userId,
    metadata: { userId },
    line_items: [
      {
        price: priceId || undefined,
        price_data: priceId
          ? undefined
          : {
              currency: "usd",
              product_data: {
                name: "Lily's Yummy English Pro Subscription",
                description: "Unlock AI Storyteller, custom food uploads with Cloudflare R2, and Cambridge Starters practice tracks.",
              },
              unit_amount: 499, // $4.99/mo
              recurring: { interval: "month" },
            },
        quantity: 1,
      },
    ],
    success_url: `${returnUrl}?session_id={CHECKOUT_SESSION_ID}&pro_success=true`,
    cancel_url: `${returnUrl}?pro_cancelled=true`,
  });

  return session;
}

