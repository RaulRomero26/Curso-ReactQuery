import { githubApi } from '../../api/githubApi';
import { Label } from '../interfaces/label';

import { useQuery } from '@tanstack/react-query';



const getLabels = async():Promise<Label[]> => {

    const { data } = await githubApi.get<Label[]>('/labels');
    console.log(data);
    return data;
  }

export const useLabels = () => {

    const labelsQuery = useQuery({
        queryKey: ['labels'],
        queryFn: getLabels,
    });

    return labelsQuery;

}