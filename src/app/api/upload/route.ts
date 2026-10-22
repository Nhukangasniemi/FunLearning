import { NextResponse } from "next/server";
import { getPresignedUploadUrl } from "@/lib/r2";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    // Allow uploads for logged-in or demo users
    const body = await req.json().catch(() => ({}));
    const filename = body.filename || `food-${Date.now()}.png`;
    const contentType = body.contentType || "image/png";

    const presigned = await getPresignedUploadUrl(filename, contentType);

    return NextResponse.json({
      success: true,
      ...presigned,
      user: session?.user?.email || "anonymous",
    });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "Failed to generate upload URL" },
      { status: 500 }
    );
  }
}

