import { toast } from 'react-toastify';
  
  
  
  // create a toast 
export const createToast = (msg) => {
    return toast.error(msg);
  }
  