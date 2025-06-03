import {createTicket} from '@/api/ticketBookList.api';
import useLoading from '@/features/core/hooks/useLoading';
import useToast from '@/features/core/hooks/useToast';
import {useMutation} from '@tanstack/react-query';

function useCreateTicket() {
  const {showToast} = useToast();
  const {showLoading, hideLoading} = useLoading();

  const {mutate} = useMutation({
    mutationFn: createTicket,
    onMutate: () => showLoading(),
    onSettled: () => hideLoading(),
    onError: err => {
      console.error(JSON.stringify(err));
      showToast('잠시 후 다시 시도해주세요.');
    },
  });

  return mutate;
}

export default useCreateTicket;
