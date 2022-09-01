export interface InsertNewElementConfig {
  parentElement: HTMLElement | Element;
  tag?: string;
  id?: string;
  class?: string;
  prepend?: boolean;
  style?: React.CSSProperties;
}

export default function insertNewElement<T>(config: InsertNewElementConfig) {
  const element = document.createElement(config.tag || "div");
  if (config.id) {
    element.id = config.id;
  }

  if (config.class) {
    element.className = config.class;
  }

  if (config.style) {
    for (const [key, value] of Object.entries(config.style)) {
      element.style[key as any] = value;
    }
  }

  if (config.prepend) {
    config.parentElement.prepend(element);

    return element;
  } else {
    config.parentElement.appendChild(element);

    return element;
  }
}
