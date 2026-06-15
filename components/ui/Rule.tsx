import { Diamond } from "./Diamond";

export function Rule({ wide = false }: { wide?: boolean }) {
  return (
    <div className={"djv-rule" + (wide ? " is-wide" : "")} aria-hidden="true">
      <i />
      <Diamond />
      <i />
    </div>
  );
}
