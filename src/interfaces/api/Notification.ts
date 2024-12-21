type NotificationTypes = "success" | "error" | "info" | "warning" 

interface Notification {
  id: number,
  type: NotificationTypes;
  title: string;
  seen?: boolean;
  createdAt: string | Date;
  args: any;
}

export type {
  Notification
}