import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Notifications = (props) => {
  // destructuring values from props
  const { message, type } = props;

  useEffect(() => {
    const notify = (message, type) => {
      if (type === 'error') {
        return toast.error(message);
      }

      return toast.success(message);
    };

    notify(message, type);
  }, [message, type]);

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#363636',
          color: '#fff',
        },
      }}
    />
  );
};

export default Notifications;
