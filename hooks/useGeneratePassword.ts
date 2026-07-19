import { useCallback, useEffect, useMemo, useState } from "react";

const components = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "._$%&/",
};

export type ComponentType = keyof typeof components;

export type SecurityLevel = "weak" | "average" | "strong" | "very-strong";

export function useGeneratePassword(
  useCharactersMap: Record<ComponentType, boolean>,
  length: number,
) {
  const [seed, setSeed] = useState(0);

  const [history, setHistory] = useState<string[]>([]);

  const error = useMemo(() => {
    if (Object.values(useCharactersMap).every((v) => !v)) {
      return "You have to pick at least one.";
    }
  }, [useCharactersMap]);

  const characters = useMemo(() => {
    return Object.entries(useCharactersMap)
      .map(([componentsKey, active]) => (active ? components[componentsKey as ComponentType] : ""))
      .join("");
  }, [useCharactersMap]);

  const password = useMemo(
    () => {
      const charactersArray = [...Array(length).keys()].map(() => {
        const i = Math.floor(Math.random() * characters.length);

        const char = characters.charAt(i);

        return char.replace(" ", "");
      });

      return charactersArray.join("");
    }, // oxlint-disable-next-line react-hooks/exhaustive-deps
    [useCharactersMap, length, seed],
  );

  const security = useMemo<SecurityLevel | undefined>(() => {
    const typeCount = Object.values(useCharactersMap).filter(Boolean).length;

    if (typeCount === 0 || length < 5) {
      return undefined;
    }

    const lengthScore = length < 9 ? 0 : length < 15 ? 1 : length < 21 ? 2 : 3;
    const score = lengthScore + typeCount;

    if (score <= 2) {
      return "weak";
    } else if (score <= 4) {
      return "average";
    } else if (score <= 6) {
      return "strong";
    } else {
      return "very-strong";
    }
  }, [useCharactersMap, length]);

  const regenerate = useCallback(() => {
    setHistory((v) => [...v, password]);
    setSeed((v) => v + 1);
  }, [password]);

  const maxCombinations = useMemo(() => Math.pow(characters.length, length), [characters, length]);

  useEffect(() => {
    if (history.includes(password) && history.length < maxCombinations) {
      regenerate();
    }
  }, [regenerate, history, password, maxCombinations]);

  return { password, error, security, regenerate };
}
