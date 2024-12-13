import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { DirectiveBinding } from "vue";
import MaskDirective from "../vMask"; 

interface TestElement extends HTMLInputElement {
  _formatInput?: (event: Event) => void;
}

describe("MaskDirective", () => {
  it("aplica a máscara no evento 'input'", () => {
    const el = document.createElement("input") as TestElement;
    const binding = { value: "###-###" } as DirectiveBinding<string>;

    MaskDirective.beforeMount(el, binding);

    el.value = "123456";
    el.dispatchEvent(new Event("input"));

    expect(el.value).toBe("123-456");
  });

  it("atualiza a máscara no hook 'updated'", () => {
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

  it("remove o listener no hook 'beforeUnmount'", () => {
    const el = document.createElement("input") as TestElement;
    const binding = { value: "###-###" } as DirectiveBinding<string>;

    MaskDirective.beforeMount(el, binding);

    const removeEventListenerSpy = vi.spyOn(el, "removeEventListener");

    MaskDirective.beforeUnmount(el);
    expect(removeEventListenerSpy).toHaveBeenCalledWith("input", el._formatInput);
  });

  it("dispara o evento 'input' após aplicar a máscara", () => {
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
