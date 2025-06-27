import { describe, it, expect, vi } from "vitest";
import { DirectiveBinding } from "vue";
import MaskDirective from "../vMask"; 

interface TestElement extends HTMLInputElement {
  _formatInput?: (event: Event) => void;
}

describe("MaskDirective", () => {
  it("should applies the mask to the 'input' event", () => {
    const el = document.createElement("input") as TestElement;
    const binding = { value: "###-###" } as DirectiveBinding<string>;

    MaskDirective.beforeMount(el, binding);

    el.value = "123456";
    el.dispatchEvent(new Event("input"));

    expect(el.value).toBe("123-456");
  });

  it("should update the mask in the 'updated' hook", () => {
    const el = document.createElement("input") as TestElement;
    const initialBinding = { value: "###-###" } as DirectiveBinding<string>;
    const updatedBinding = { value: "##-##-##" } as DirectiveBinding<string>;

    MaskDirective.beforeMount(el, initialBinding);

    el.value = "123456";
    el.dispatchEvent(new Event("input"));

    expect(el.value).toBe("123-456");

    MaskDirective.updated(el, updatedBinding);

    el.value = "123456";
    el.dispatchEvent(new Event("input"));

    expect(el.value).toBe("12-34-56");
  });

  it("should remove the listener in the 'beforeUnmount' hook", () => {
    const el = document.createElement("input") as TestElement;
    const binding = { value: "###-###" } as DirectiveBinding<string>;

    MaskDirective.beforeMount(el, binding);

    const removeEventListenerSpy = vi.spyOn(el, "removeEventListener");

    MaskDirective.beforeUnmount(el);
    expect(removeEventListenerSpy).toHaveBeenCalledWith("input", el._formatInput);
  });

  it("should fires the 'input' event after applying the mask", () => {
    const el = document.createElement("input") as TestElement;
    const binding = { value: "###-###" } as DirectiveBinding<string>;

    const inputEventSpy = vi.fn();
    el.addEventListener("input", inputEventSpy);
    MaskDirective.beforeMount(el, binding);

    el.value = "123456";
    el.dispatchEvent(new Event("input"));
    expect(inputEventSpy).toHaveBeenCalled();
  });
});