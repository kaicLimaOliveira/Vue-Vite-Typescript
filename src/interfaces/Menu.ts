interface MenuBase {
  label: string;
  routeName: string;
  params?: any;
  icon?: string | string[];
}
 
interface Link extends MenuBase {
  type: "link";
}
 
interface Dropdown extends MenuBase {
  type: "dropdown";
  links: Link[];
}
 
type Menu = (Link | Dropdown)[];

export type {
  Link,
  Dropdown,
  Menu,
}