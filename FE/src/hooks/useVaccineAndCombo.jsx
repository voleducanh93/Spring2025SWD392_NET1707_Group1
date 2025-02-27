import { useQuery } from "@tanstack/react-query";
import { getVaccinesAndCombo } from "../api/vaccineSchedule.api";

export const useVaccineAndCombo = (childId) => {
  return useQuery({
    queryKey: ["vaccineAndCombo", childId], // Query Key chứa childId để re-fetch khi thay đổi
    queryFn: () => getVaccinesAndCombo(childId),
    enabled: !!childId, // Chỉ fetch khi childId có giá trị
    refetchOnWindowFocus: false,
  });
};
