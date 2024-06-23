import {VStack, Toast, ToastTitle} from '@gluestack-ui/themed';
import {ToastAlertProps} from './types';

const ToastAlert: React.FC<ToastAlertProps> = ({id, message, action}) => {
  return (
    <Toast nativeID={id} action={action} variant="solid">
      <VStack space="xs">
        <ToastTitle>{message}</ToastTitle>
      </VStack>
    </Toast>
  );
};

export default ToastAlert;
