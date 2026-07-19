import { useCallback, useState } from "react";

export function useCopyPassword(password: string) {
  const [wasCopied, setWasCopied] = useState(false);

  const copyPassword = useCallback(() => {
    navigator.clipboard.writeText(password);
    setWasCopied(true);
    return setTimeout(() => setWasCopied(false), 2000);
  }, [password]);

  return { copyPassword, wasCopied };
}
