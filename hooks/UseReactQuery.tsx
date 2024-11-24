import { instance } from "@/app/actions/axios";
import { useQuery } from "@tanstack/react-query";

interface Iprops {
  queryKey: string[];
  url: string;
}

const useQueryData = ({ queryKey, url }: Iprops) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const { data } = await instance.get(url);
        console.log({ data });

        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
    initialData: [],
    retry: 1,
    refetchOnWindowFocus: false,
  });
};

export default useQueryData;
