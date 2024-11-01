type Type = 'success' | 'danger' | 'info' | 'warning'; 

interface Alert {
  id?: string | number;
  type: Type;
  icon?: string;
  title: string;
  content: string;
}

export type {
  Alert
}