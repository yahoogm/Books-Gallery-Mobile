export type ToastAlertProps = {
  id: string;
  message: string;
  action: 'success' | 'info' | 'error' | 'warning' | 'attention';
};
