"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { purchaseCourse } from "@/lib/actions";

interface PurchaseButtonProps {
  courseId: string;
  price: number;
  courseSlug: string;
}

export function PurchaseButton({ courseId, price, courseSlug }: PurchaseButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handlePurchase() {
    setLoading(true);
    await purchaseCourse(courseId);
    router.refresh();
    setLoading(false);
  }

  return (
    <button
      onClick={handlePurchase}
      disabled={loading}
      className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
    >
      {loading
        ? "Processing…"
        : price === 0
        ? "Enroll for Free"
        : `Purchase for $${price}`}
    </button>
  );
}
