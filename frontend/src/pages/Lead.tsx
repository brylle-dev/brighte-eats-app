import ServiceBadge from "@/components/ServiceBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GET_LEAD_BY_ID } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const Lead = () => {
  const params = useParams();
  const { data, error, loading } = useQuery(GET_LEAD_BY_ID, {
    variables: {
      id: Number(params.id),
    },
  });

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center py-10 text-red-500">Error: {error.message}</p>
    );

  return (
    <Card className="max-w-md mx-auto bg-gray-200">
      <CardHeader>
        <CardTitle>Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold">
              {data.getLeadById.user.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2.5">
              {data.getLeadById.user.email}
            </p>
            <p className="text-sm text-gray-600 mb-2.5">
              {data.getLeadById.user.mobile}
            </p>
            <p className="text-sm text-gray-600 mb-2.5">
              {data.getLeadById.user.postcode}
            </p>
            <div className="flex gap-4">
              {data.getLeadById.services.map((service: string) => (
                <ServiceBadge key={service} text={service} />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Lead;
