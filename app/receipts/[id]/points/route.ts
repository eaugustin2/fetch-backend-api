import { NextRequest, NextResponse } from "next/server";
//import { getReceipet } from "@/lib/store";
import { Receipet } from "@/types/recipet";
import { calculatePoints } from "@/lib/points";
import { receiptStore } from "@/lib/store";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = await params;
  console.log(id);
  //   const receipet: Receipet | null = getReceipet(id);
  const receipet: Receipet | null | undefined = receiptStore.get(id);

  if (!receipet) {
    return NextResponse.json(
      { error: "Id is invalid or Map is Empty" },
      { status: 500 }
    );
  }
  console.log("recipet gotten: ", receipet);
  const result = calculatePoints(receipet);
  return NextResponse.json({ points: result });
};
