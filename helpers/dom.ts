export const createElement = (elem: string): HTMLElement => {
  return document.createElement(elem);
};

export const createTextElement = (elem: string, text: string): HTMLElement => {
  const element = document.createElement(elem);
  element.appendChild(document.createTextNode(text));
  return element;
};