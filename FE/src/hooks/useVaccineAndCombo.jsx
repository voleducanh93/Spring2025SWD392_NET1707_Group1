import { useQuery } from "@tanstack/react-query";
import { getVaccinesAndCombo } from "../api/vaccineSchedule.api";

export const useVaccineAndCombo = (childId) => {
  return useQuery({
    queryKey: ["vaccineAndCombo", childId],
    queryFn: () => getVaccinesAndCombo(childId),
    enabled: !!childId,
    refetchOnWindowFocus: false,
  });
};
