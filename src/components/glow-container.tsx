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
        "relative before:absolute before:inset-3 before:-z-20 before:rounded-full before:bg-[#04e7d880]/50 before:blur-5xl lg:before:inset-4 lg:before:blur-xl"
      )}
    >
      <div
        ref={ref}
        className={clsx(
          className,
          "group relative z-0 overflow-hidden rounded-xl p-[1px] ring-1 ring-[#ffffff26]/15"
        )}
      >
        <div
          className={clsx(
            "absolute left-1/2 top-1/2 -z-10 aspect-square w-[200%] origin-top-left animate-[rotateFade_3500ms_linear_infinite] bg-[conic-gradient(var(--tw-gradient-stops))] from-transparent via-transparent to-[#04e7d8] opacity-100 ease-linear"
          )}
        />
        <div className={clsx("rounded-xl bg-neutral-900  p-2")}>
          <div className="overflow-hidden rounded-xl">{children}</div>
        </div>
      </div>
    </div>
  );
});
export default GlowContainer;
