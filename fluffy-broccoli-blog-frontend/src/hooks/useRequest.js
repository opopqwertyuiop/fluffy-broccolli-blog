import { useEffect, useRef, useMemo, useCallback } from 'react';
import { CancelToken } from 'axios';
//n
const useRequest = (cb) => {
  const cancel = useRef();

  useEffect(() => {
    return () => {
      if (cancel.current) {
        cancel.current.cancel();
      }
    };
  }, []);

  const ret = (...args) => {
    if (cancel.current) {
      cancel.current.cancel();
    }
    const cancelTokenSource = CancelToken.source();
    cancel.current = cancelTokenSource;
    return cb(...args, cancelTokenSource.token)
      .then((data) => {
        // cancel.current = undefined;
        return data;
      })
      .catch((error) => {
        // cancel.current = undefined;
        throw error;
      });
  };

  return useCallback(ret, [cb]);
};

export default useRequest;
