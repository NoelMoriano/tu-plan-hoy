import * as React from "react";

const Button = React.forwardRef<HTMLButtonElement>(() => {
  return <button>Enviar</button>;
});

Button.displayName = "Button";

export { Button };
