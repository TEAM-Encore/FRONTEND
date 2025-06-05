import {removeTicket} from '@/api/ticketBookList.api';
import useLoading from '@/features/core/hooks/useLoading';
import useToast from '@/features/core/hooks/useToast';
import {useMutation, useQueryClient} from '@tanstack/react-query';

function useRemoveTicket() {
  const {showToast} = useToast();
  const {showLoading, hideLoading} = useLoading();
  const queryClient = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: removeTicket,
    onMutate: () => showLoading(),
    onSettled: () => hideLoading(),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['ticketBookList']});
    },
    onError: err => {
      console.error(JSON.stringify(err));
      showToast('잠시 후 다시 시도해주세요.');
    },
  });

  return mutate;
}

export default useRemoveTicket;
