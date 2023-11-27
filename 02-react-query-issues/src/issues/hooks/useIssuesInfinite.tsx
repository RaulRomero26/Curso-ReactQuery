import { useInfiniteQuery } from "@tanstack/react-query"
import { Issue, State } from "../interfaces";
import { githubApi } from "../../api/githubApi";
import { sleep } from "../../helpers";


interface Props {
    state?: State;
    labels: string[];
    page?: number
}

interface QueryProps{
    pageParam?: number;
    queryKey: (string | Props) []
}

const getIssues =async({pageParam = 1,queryKey}:QueryProps):Promise<Issue[]> => {

    const [,,args] = queryKey;
    const { state, labels } = args as Props;
    
    await sleep(2);

    const params = new URLSearchParams();
    if(state) params.append('state',state);
    if(labels.length>0){
        const labelString = labels.join(',')
        params.append('labels',labelString)
    }
    
    params.append('page',pageParam.toString())
    params.append('per_page','5')
    const { data } = await githubApi.get<Issue[]>('/issues',{params})
    console.log(data);
    return data;
}

export const useIssuesInfinite = ({ state, labels }: Props) => {
    const issuesQuery = useInfiniteQuery<Issue[], Error>({
      queryKey: ['issues', 'infinite', { state, labels }],
      queryFn: (data) => getIssues(data),
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < 5) return;
  
        return pages.length + 1;
      },
    });
  
    return {
      issuesQuery,
    };
  };