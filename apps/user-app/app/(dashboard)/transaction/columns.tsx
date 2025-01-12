"use client"

import { ColumnDef } from "@tanstack/react-table"
import { LuArrowUpDown } from "react-icons/lu";
import {Button} from "@repo/ui/components/ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type Transaction = {
  amount: number,
  timestamp: string,
  phonenumber: number
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "phonenumber",
    header: "Phone Number"
  },
  {
    accessorKey: "timestamp",
    header: "Date",
  },
  {
    accessorKey: "amount",
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
]
