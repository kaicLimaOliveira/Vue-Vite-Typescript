interface InputProps {
  id?: string;
  label?: string;
  helpText?: string;
  modelValue?: string;
  mask?: string; 
  icon?: string;
}

interface ButtonProps {
  type?: 'primary' | 'link' | 'info' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'normal' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  fullwidth?: boolean;
  outlined?: boolean;
}

export {
  InputProps,
  ButtonProps,
}