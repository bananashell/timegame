"use client";

import { useRef, useEffect, FunctionComponent, PropsWithChildren } from "react";
import ReactDOM from "react-dom";

export const Portal: FunctionComponent<PropsWithChildren<{}>> = ({
  children,
}) => {
  const ref = useRef(document.createElement("div"));

  useEffect(() => {
    document.body.appendChild(ref.current);

    return () => {
      ref.current.remove();
    };
  }, []);

  return ReactDOM.createPortal(<>{children}</>, ref.current);
};
