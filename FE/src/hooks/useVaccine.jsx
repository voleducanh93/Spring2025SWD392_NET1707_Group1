import { useQuery } from "@tanstack/react-query";
import { getVaccines } from "../api/vaccine.api";


export const useVaccine = () => {
    //const queryClient = useQueryClient();
  
    // ✅ Fetch danh sách vaccine
    const { data: vaccines, isLoading, isError, error } = useQuery({
      queryKey: ["vaccines"],
      queryFn: getVaccines, // Không cần try/catch vì React Query tự xử lý
      refetchOnWindowFocus: false,
    });
    return { vaccines, isLoading, isError, error };
};