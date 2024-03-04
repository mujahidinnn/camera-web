import { useState } from "react";

export const useStateOps = () => {
  const [state, setState] = useState({
    data: null,
    loading: false,
    show: false,
  });

  function setLoading(loading) {
    setState((prev) => ({ ...prev, loading }));
  }

  function handleShow(data) {
    setState((prev) => ({ ...prev, data, show: true }));
  }

  function handleClose() {
    setState((prev) => ({ ...prev, show: false }));
  }

  return {
    state,
    setState,
    setLoading,
    handleShow,
    handleClose,
  };
};
