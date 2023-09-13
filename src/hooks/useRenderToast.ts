import { useMemo } from 'react';

import useToastStore from '@/stores/toast';

function useRenderToast() {
  const { renderToast } = useToastStore((state) => ({
    renderToast: state.renderToast,
  }));

  return useMemo(() => renderToast, []);
}

export default useRenderToast;
