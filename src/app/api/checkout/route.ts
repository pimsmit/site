import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-03-25.dahlia",
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      projectId: string;
      amount: number; // in euros
      company: string;
      projectType: string;
      email: string;
    };

    if (!body.projectId || !body.amount || !body.email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const amountCents = Math.round(body.amount * 100);

    if (amountCents < 100) {
      return NextResponse.json(
        { error: "Minimum amount is €1" },
        { status: 400 }
      );
    }

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card", "ideal"],
      mode: "payment",
      customer_email: body.email,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `${body.projectType} - ${body.company}`,
              description: `Project ${body.projectId}`,
            },
            unit_amount: amountCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        projectId: body.projectId,
        company: body.company,
      },
      allow_promotion_codes: true,
      success_url: `${process.env.APP_BASE_URL || "https://ainomiq.com"}/payment/success?session_id={CHECKOUT_SESSION_ID}&project=${body.projectId}`,
      cancel_url: `${process.env.APP_BASE_URL || "https://ainomiq.com"}/custom?cancelled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
