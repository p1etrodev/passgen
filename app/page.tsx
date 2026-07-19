"use client";

import {
  IconArrowDown,
  IconArrowUp,
  IconCheck,
  IconClipboardCopy,
  IconNumber123,
  IconPlusEqual,
  IconRefresh,
} from "@tabler/icons-react";
import clsx from "clsx";
import { useState, type ReactNode } from "react";
import { securityStyles, type SecurityStyle } from "../lib/security";
import { useCopyPassword } from "../hooks/useCopyPassword";
import { useGeneratePassword, type ComponentType } from "../hooks/useGeneratePassword";

export default function Home() {
  const [useComponents, setUseComponents] = useState<Record<ComponentType, boolean>>({
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
  });
  const [length, setLength] = useState<number>(8);

  const { password, error, regenerate, security } = useGeneratePassword(useComponents, length);

  const { copyPassword, wasCopied } = useCopyPassword(password);

  const style = securityStyles[security ?? "neutral"];

  function toggleComponentUsage(componentKey: ComponentType, value: boolean) {
    setUseComponents((curr) => ({ ...curr, [componentKey]: value }));
  }

  return (
    <div
      className={clsx(
        "flex flex-1 flex-col items-center justify-center transition-colors gap-4",
        style.gradient,
      )}
    >
      <h1 className={clsx("text-3xl font-semibold", style.text)}>P455/G3N</h1>
      <p>Generate secure passwords.</p>
      <div
        className={clsx(
          "w-full max-w-96 p-4 rounded-full px-3 py-2 border text-center items-center flex flex-row justify-center gap-1 transition-colors",
          style.bg,
          style.border,
        )}
      >
        <button onClick={() => regenerate()} className="text-gray-500">
          <IconRefresh size="18" />
        </button>
        <span className="w-full select-all">{password}</span>
        <button onClick={() => copyPassword()} className="text-gray-500">
          {wasCopied ? <IconCheck size="18" /> : <IconClipboardCopy size="18" />}
        </button>
      </div>
      <label className="w-full max-w-96 flex flex-row items-center gap-2 text-sm">
        <input
          type="range"
          min={1}
          max={25}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className={clsx("w-full transition-colors", style.accentColor)}
        />
        {/* <span className="w-10 text-right tabular-nums">{length}</span> */}
      </label>
      <div className="grid grid-cols-4 gap-2">
        <ComponentCheckbox
          componentName="lowercase"
          icon={<IconArrowDown size="18" />}
          checked={useComponents.lowercase}
          setChecked={toggleComponentUsage}
          style={style}
        />
        <ComponentCheckbox
          componentName="uppercase"
          icon={<IconArrowUp size="18" />}
          checked={useComponents.uppercase}
          setChecked={toggleComponentUsage}
          style={style}
        />
        <ComponentCheckbox
          componentName="numbers"
          icon={<IconNumber123 size="18" />}
          checked={useComponents.numbers}
          setChecked={toggleComponentUsage}
          style={style}
        />
        <ComponentCheckbox
          icon={<IconPlusEqual size="18" />}
          componentName="symbols"
          checked={useComponents.symbols}
          setChecked={toggleComponentUsage}
          style={style}
        />
      </div>
      <span className="text-red-400">{error}</span>
      <span className="mt-8">
        Made with ❤️ by{" "}
        <a className={clsx("underline", style.text)} href="https://pietrodev.up.railway.app">
          pietrodev
        </a>
      </span>
    </div>
  );
}

type ComponentCheckboxProps = {
  componentName: ComponentType;
  icon: ReactNode;
  checked: boolean;
  setChecked: (componentName: ComponentType, checked: boolean) => void;
  style: SecurityStyle;
};

function ComponentCheckbox({
  componentName,
  icon,
  checked,
  setChecked,
  style,
}: ComponentCheckboxProps) {
  const id = `${componentName}-checkbox`;

  return (
    <label
      htmlFor={id}
      className={clsx(
        "capitalize flex flex-row items-center gap-1 bg-transparent py-1 px-3 rounded-full select-none border border-border justify-center transition-colors text-sm",
        style.text,
        style.border,
        style.accentChecked,
      )}
    >
      <input
        id={id}
        type="checkbox"
        className="hidden"
        checked={checked}
        onChange={(e) => setChecked(componentName, e.target.checked)}
      />
      {icon}
      {componentName}
    </label>
  );
}
