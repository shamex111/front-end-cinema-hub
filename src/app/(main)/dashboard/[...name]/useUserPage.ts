import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { userService } from '@/services/user.service';

export const useUserPage = (name: string) => {
  const {
    data:  user, isLoading
  } = useQuery({
    queryKey: ['get user profile with the name'],
    queryFn: () => userService.getByName(name),
    select: data => data
  });
  return {user,isLoading}
};
