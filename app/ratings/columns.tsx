"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Rating = {
  id: string
  title: string
  rating: number
  wokeRating: number
}

export const columns: ColumnDef<Rating>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "wokeRating",
    header: "Woke Rating",
  },
]
