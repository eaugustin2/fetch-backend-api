import { Receipet } from "@/types/recipet";
import { NextRequest, NextResponse } from "next/server";
//import { saveReceipet } from "@/lib/store";
import { randomUUID } from "crypto";
import { receiptStore } from "@/lib/store";

export const POST = async (req: NextRequest) => {
  const recipet: Receipet = await req.json();

  const id = randomUUID();

  //saveReceipet(id, recipet);
  receiptStore.set(id, recipet);

  return NextResponse.json({ id: id });
};
