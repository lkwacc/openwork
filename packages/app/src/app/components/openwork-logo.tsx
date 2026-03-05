import type { JSX } from "solid-js";

type Props = {
  size?: number;
  class?: string;
};

export default function OpenWorkLogo(props: Props): JSX.Element {
  const size = props.size ?? 24;
  return (
    <img
      src="/openwork-logo-square.png"
      alt="Crow5"
      width={size}
      height={size}
      class={`inline-block ${props.class ?? ""}`}
    />
  );
}
