import { cn } from "@/lib/utils";
import React, {
  ChangeEvent,
  ClipboardEvent,
  forwardRef,
  KeyboardEvent,
  useRef,
} from "react";

interface PinCodeProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "type" | "value"
  > {
  setValue: React.Dispatch<React.SetStateAction<string | number | undefined>>;
  type?: "text" | "number";
  length?: number;
  center?: boolean;
  inputClassName?: string;
}

const containClassNames = {
  base: "flex flex-row",
  center: "justify-center align-center",
};

const inputClassNames = {
  base: "block peer text-center texct-slate-950 bg-transparent mr-2 focus:placeholder:opacity-0 focus:outline-hidden transition duration-200 disabled:bg-zinc-50 disabled:placeholder:text-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed disabled:border-gray-200 rounded focus:outline-hidden focus:border-primary",
  size: "p-2 text-2xl font-medium w-12 h-12 sm:h-[70px] sm: w-[70px]",
  color: {
    base: "bg-transparent focus:ring-[0.6px] border border-gray-300 focus-visible:border-secondary focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-secondary placeholder:text-slate-950",
    active: "not-read-only:hover:enabled:border-secondary focus:ring-secondary",
  },
};

export const OneTimePasswordInput = forwardRef<HTMLInputElement, PinCodeProps>(
  (props, ref) => {
    const {
      type = "text",
      defaultValue,
      length = 6,
      setValue,
      center = true,
      className,
      inputClassName,
      ...restprops
    } = props;

    const inputRefs = useRef<HTMLInputElement[]>([]);

    function addInputRefs(index: number) {
      return (refs: HTMLInputElement) => {
        if (refs) {
          inputRefs.current[index] = refs;
        }
      };
    }

    function setPinValue() {
      setValue(inputRefs.current.map((node) => node.value).join(""));
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>, index: number) {
      const inputValue = e.target.value.split("");
      inputRefs.current[index].value = inputValue[inputValue.length - 1];
      if (index < length - 1) {
        inputRefs.current[index + 1].focus();
      }
      setPinValue();
    }

    function handlePaste(e: ClipboardEvent<HTMLInputElement>, index: number) {
      const copiedValue = e.clipboardData.getData("text").trim().split("");
      console.log(copiedValue);
      const isComplete = copiedValue.length >= length;
      for (let i = 0; i < length - index; i += 1) {
        inputRefs.current[index + i].value = copiedValue[i] ?? "";
        if (index + i === length - 1) {
          inputRefs.current[index + i].focus();
        } else {
          inputRefs.current[index + i + 1].focus();
        }
      }
      e.preventDefault();
      setPinValue();
      if (!isComplete) {
        const form = e.currentTarget.closest("form");
        form?.requestSubmit();
      }
    }

    function handleKeyDown(e: KeyboardEvent, i: number) {
      const currentValue = inputRefs.current[i].value;
      // console.log(e.key);
      if (e.key === "ArrowRight" && i < length - 1) {
        inputRefs.current[i + 1].focus();
      }
      if (e.key === "ArrowLeft" && i > 0) {
        inputRefs.current[i - 1].focus();
      }
      if (e.key === "Backspace") {
        if (currentValue !== "") {
          inputRefs.current[i].value = "";
        } else {
          if (i === 0) {
            return;
          }
          inputRefs.current[i - 1].value = "";
          inputRefs.current[i - 1].focus();
        }
      }
    }
    return (
      <div className=" flex flex-col" ref={ref}>
        <div
          className={cn(
            className,
            center && containClassNames.center,
            containClassNames.base
          )}
        >
          {Array.from({ length }, (_, i) => i).map((i) => {
            return (
              <input
                key={`otp-input-${i}`}
                ref={addInputRefs(i)}
                type={type}
                inputMode={type === "text" ? type : "numeric"}
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="off"
                onChange={(e) => handleChange(e, i)}
                onPaste={(e) => handlePaste(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className={cn(
                  inputClassNames.base,
                  inputClassNames.size,
                  inputClassNames.color.active,
                  inputClassNames.color.base,
                  inputClassName,
                  "[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                )}
              />
            );
          })}
        </div>
      </div>
    );
  }
);

OneTimePasswordInput.displayName = "OneTimePasswordInput";
