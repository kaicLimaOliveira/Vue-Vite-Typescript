import { App } from 'vue';

import Button from '../../components/Button.vue';
import Datepicker from '../../components/Datepicker.vue';
import FormControl from '../../components/form/FormControl.vue';
import Input from '../../components/form/Input.vue';
import Label from '../../components/form/Label.vue';
import Modal from '../../components/modals/Modal.vue';
import Select from '../../components/form/Select.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  install(app: App) {
    app.component('Button', Button);
    app.component('Datepicker', Datepicker);
    app.component('FormControl', FormControl);
    app.component('Icon', FontAwesomeIcon);
    app.component('Input', Input);
    app.component('Label', Label);
    app.component('Modal', Modal);
    app.component('Select', Select);
  },
};