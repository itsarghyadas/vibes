import { ReactNode, Ref, forwardRef } from "react";
import clsx from "clsx";

type Props = {
  className?: string;
  children?: ReactNode;
};

const GlowContainer = forwardRef(function GlowContainer(
  { className, children }: Props,
  ref: Ref<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={clsx(
        className,
        "glowcontainer relative before:absolute before:inset-3 before:-z-20 before:rounded-full before:bg-[#04e7d880]/50 before:blur-3xl before:opacity-0 lg:before:inset-4 lg:before:blur-xl"
      )}
    >
      <div
        ref={ref}
        className={clsx(
          className,
          "group relative z-0 overflow-hidden rounded-xl p-[1px] ring-1 ring-[#ffffff26]/15"
        )}
      >
        {/*  <div
          className={clsx(
            "absolute left-1/2 top-1/2 -z-10 aspect-square w-[200%] origin-top-left animate-[rotateFade_3500ms_linear_infinite] bg-[conic-gradient(var(--tw-gradient-stops))] from-transparent via-transparent to-[#04e7d8] opacity-100 ease-linear",
            "animation-fill-mode: both; animation-timing-function: linear; animation-timeline: view(inline); animation: glowHighlight;"
          )}
        /> */}
        <div className={clsx("rounded-xl bg-neutral-900  p-2")}>
          <div className="overflow-hidden">{children}</div>
        </div>
      </div>
    </div>
  );
});

export default GlowContainer;
