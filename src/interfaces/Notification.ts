type NotificationTypes = "success" | "error" | "info" | "warning" 

interface Notification {
  id: number,
  type: NotificationTypes;
  title: string;
  seen?: boolean;
  createdAt: string;
  args: any;
}

export type {
  Notification
}