import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import ServiceBadge from "./ServiceBadge";
import { GET_LEAD_LIST } from "@/graphql/queries";

type UserType = {
  id: number;
  name: string;
  email: string;
  mobile: string;
  postcode: string;
};

interface LeadList {
  id: number;
  services: [string];
  user: UserType;
}

export default function LeadTable() {
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading, error } = useQuery(GET_LEAD_LIST, {
    variables: {
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    },
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center py-10 text-red-500">Error: {error.message}</p>
    );

  const leads: LeadList[] = data.leadList.leads;
  const totalCount: number = data.leadList.totalCount;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  function goToPage(page: number) {
    setCurrentPage(page);
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Mobile</TableHead>
            <TableHead>Postcode</TableHead>
            <TableHead>Services</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((lead: LeadList) => (
            <TableRow key={lead.id}>
              <TableCell>{lead.id}</TableCell>
              <TableCell>{lead.user.name}</TableCell>
              <TableCell>{lead.user.email}</TableCell>
              <TableCell>{lead.user.mobile}</TableCell>
              <TableCell>{lead.user.postcode}</TableCell>
              <TableCell>
                <div className="gap-2 flex">
                  {lead.services.map((service: string) => (
                    <ServiceBadge key={service} text={service} />
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Separator className="my-6" />

      <div className="flex justify-center space-x-2">
        <Button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        {Array.from({ length: totalPages }).map((_, idx) => (
          <Button
            key={idx + 1}
            variant={currentPage === idx + 1 ? "default" : "outline"}
            onClick={() => goToPage(idx + 1)}
          >
            {idx + 1}
          </Button>
        ))}

        <Button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
