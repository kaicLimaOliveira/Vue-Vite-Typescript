type Type = 'success' | 'error' | 'info' | 'warning'; 
type Icon = 'circle-check' | 'circle-xmark' | 'circle-info' | 'circle-warning'; 

interface Alert {
  id?: string | number;
  type: Type;
  icon?: Icon;
  title: string;
  content: string;
}

export type {
  Alert
}