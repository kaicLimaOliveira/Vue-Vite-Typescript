// src/global-directives.d.ts
import { Directive } from 'vue'

type TooltipModifiers = {
  right?: boolean
  left?: boolean
  top?: boolean
  bottom?: boolean
}

declare module 'vue' {
  interface DirectiveBindings {
    /**
     * A diretiva `v-mask` aplica uma máscara ao elemento.
     * Use para limitar a entrada do usuário em formatos específicos.
     *
     * @example
     * ```vue
     * <input v-mask="'###.###.###-##'" />
     * ```
     */
    mask: Directive

    /**
     * A diretiva `v-tooltip` exibe um tooltip (dica de ferramenta) ao passar o mouse sobre o elemento.
     * Modificadores opcionais:
     * - `right`: Exibe o tooltip à direita do elemento.
     * - `left`: Exibe o tooltip à esquerda do elemento.
     * - `top`: Exibe o tooltip acima do elemento.
     * - `bottom`: Exibe o tooltip abaixo do elemento.
     *
     * @example
     * ```vue
     * <button v-tooltip.right="'Clique para enviar'">Enviar</button>
     * ```
     */
    tooltip: Directive & { modifiers: TooltipModifiers }
  }
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    /**
     * Diretiva para aplicar máscara a um campo de entrada.
     */
    vMask: Directive

    /**
     * Diretiva para exibir tooltip com informações adicionais.
     * Modificadores opcionais:
     * - `right`: Exibe o tooltip à direita.
     * - `left`: Exibe o tooltip à esquerda.
     * - `top`: Exibe o tooltip acima.
     * - `bottom`: Exibe o tooltip abaixo.
     */
    vTooltip: Directive
  }
}
