import LeadTable from "@/components/LeadTable";

export default function Leads() {
  return (
    <div className="text-white flex justify-center items-center flex-col  ">
      <h1 className="text-3xl ">Lead List</h1>
      <LeadTable />
    </div>
  );
}
