import React, { ReactNode } from "react";
import { createRoot } from "react-dom/client";

export default function renderComponent(
  component: ReactNode,
  root: HTMLElement,
) {
  const rootElement = createRoot(root);

  rootElement.render(component);

  return rootElement;
}
