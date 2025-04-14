import { Receipet } from "@/types/recipet";

type ReceiptStore = Map<string, Receipet>;

// @ts-ignore
const globalForReceipts = globalThis as unknown as {
  receiptStore?: ReceiptStore;
};

export const receiptStore =
  globalForReceipts.receiptStore ?? new Map<string, Receipet>();

if (process.env.NODE_ENV === "development") {
  globalForReceipts.receiptStore = receiptStore;
}
