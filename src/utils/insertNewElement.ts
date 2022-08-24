import { HTMLAttributes, HTMLProps } from "react";

export interface InsertNewElementConfig<T = "div"> extends HTMLAttributes<T> {
  parentElement: HTMLElement | Element;
  tag?: string;
  id?: string;
  class?: string;
  prepend?: boolean;
}

export default function insertNewElement<T>(config: InsertNewElementConfig<T>) {
  const element = document.createElement(config.tag || "div");
  element.id = config.id || "";
  element.className = config.class || "";

  if (config.prepend) {
    config.parentElement.prepend(element);

    return element;
  } else {
    config.parentElement.appendChild(element);

    return element
  }
}
