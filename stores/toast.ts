import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

type ToastType = 'error' | 'info' | 'success';

type ToastState = {
  title?: string;
  description?: string;
  type: ToastType;
  isRender: boolean;
  delay: number;
};

type ToastAction = {
  renderToast: (
    toastOption: { title?: string; description: string; type?: ToastType; delay?: number }
  ) => void;
  closeToast: () => void;
};

export type ToastStore = ToastState & ToastAction;

const initialToastState: ToastState = {
  delay: 0,
  isRender: false,
  type: 'success',
};

const useToastStore = createWithEqualityFn<ToastStore>((set) => ({
  ...initialToastState,
  renderToast: ({ delay = 3000, type = 'success', ...rest }) => set((state) => ({
    ...state, isRender: true, delay, type, ...rest,
  })),
  closeToast: () => set(() => ({ ...initialToastState })),
}), shallow);

export default useToastStore;
