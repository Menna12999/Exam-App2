import ScrollPagination from "./scroll-pagination";
import getData from "@/lib/services/get-data.service";


export default async function Diplomas() {
  const data = await getData('subjects');

  return <ScrollPagination items={data.subjects} perPage={4} />;
}