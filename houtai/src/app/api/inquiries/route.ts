import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, company, email, phone, country, product, quantity, timeline, message } = body;

  if (!name || !company || !email || !country || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const inquiry = await prisma.inquiry.create({
    data: {
      name: String(name),
      company: String(company),
      email: String(email),
      phone: phone ? String(phone) : "",
      country: String(country),
      product: product ? String(product) : "",
      quantity: quantity ? String(quantity) : "",
      timeline: timeline ? String(timeline) : "",
      message: String(message),
    },
  });

  return NextResponse.json({ ok: true, id: inquiry.id });
}
