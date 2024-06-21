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
        "glowcontainer relative before:absolute before:inset-3 before:-z-20 before:rounded-full before:bg-purple-500/50 before:blur-2xl lg:before:inset-4 lg:before:blur-3xl"
      )}
    >
      <div
        ref={ref}
        className={clsx(
          className,
          "group relative z-0 overflow-hidden rounded-xl p-[1px] ring-1 ring-purple-300/15"
        )}
      >
        <div
          className={clsx(
            "absolute left-1/2 top-1/2 -z-10 aspect-square w-[200%] origin-top-left animate-[rotateFade_3500ms_cubic-bezier(1,0,0,1)_infinite] bg-[conic-gradient(var(--tw-gradient-stops))] from-transparent via-transparent to-purple-500 opacity-100 ease-linear "
          )}
        />
        <div className={clsx("rounded-xl bg-neutral-900 p-2 sm:p-3 h-full")}>
          <div className="overflow-hidden rounded-xl h-full">{children}</div>
        </div>
      </div>
    </div>
  );
});
export default GlowContainer;
