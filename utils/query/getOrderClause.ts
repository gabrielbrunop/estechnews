import OrderOptions from "@/utils/consts/OrderOptions";
import ValueOf from "@/utils/types/valueOf";

export default function getOrderClause(orderBy: ValueOf<typeof OrderOptions>): [string, { ascending: boolean }] {
  if (orderBy === OrderOptions.Hottest) return ['likes_count', { ascending: false }];
  return ['created_at', { ascending: false }];
}