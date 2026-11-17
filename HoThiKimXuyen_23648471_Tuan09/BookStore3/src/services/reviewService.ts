import { api } from "../api/client";
import type { Review } from "../types";

export async function getReviewsByBook(bookId: number): Promise<Review[]> {
  const res = await api.get<Review[]>("/reviews", {
    params: { bookId, _sort: "createdAt", _order: "desc" },
  });
  return res.data;
}

export interface NewReview {
  bookId: number;
  userId: number;
  userName: string;
  rating: number;
  comment: string;
}

export async function addReview(payload: NewReview): Promise<Review> {
  const res = await api.post<Review>("/reviews", {
    ...payload,
    createdAt: new Date().toISOString(),
  });
  return res.data;
}
