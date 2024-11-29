import { instance } from "@/app/actions/axios";
import { useQuery } from "@tanstack/react-query";

interface Iprops {
  queryKey: string[];
  url: string;
}
const token = localStorage.getItem("token");

const useQueryData = ({ queryKey, url }: Iprops) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const { data } = await instance.get(url);
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
    enabled: !!token,
  });
};

export default useQueryData;
