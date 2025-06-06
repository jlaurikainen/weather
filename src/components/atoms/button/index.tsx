import { ComponentType, JSX, SVGProps } from "react";

type Props = JSX.IntrinsicElements["button"] & {
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
};

export function Button(props: Props) {
  const { icon: Icon, ...rest } = props;

  return (
    <button
      type="button"
      {...rest}
      className={`border-outer-space flex cursor-pointer items-center justify-center gap-2 rounded-lg border-1 ${props.children == null ? "px-2" : "px-4"} py-2 outline-0 hover:border-slate-400 focus-visible:border-slate-400 active:border-slate-500`}
    >
      {Icon ? <Icon height={24} width={24} className="fill-current" /> : null}
      {rest.children}
    </button>
  );
}
