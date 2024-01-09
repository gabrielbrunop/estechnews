import OrderOptions from "@/utils/consts/OrderOptions";

export default function getQueryOrder(orderBy: string | string[] | undefined) {
  return orderBy && orderBy !== OrderOptions.Newest ? OrderOptions.Hottest : OrderOptions.Newest;
}