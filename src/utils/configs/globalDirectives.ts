import { App } from "vue";
import vTooltip from "../../directives/vTooltip";
import vMask from "../../directives/vMask";
import vShortcut from "../../directives/vShortcut";

export default {
  install(app: App) {
    app.directive('shortcut', vShortcut);
    app.directive('mask', vMask);
    app.directive('tooltip', vTooltip);
  },
};