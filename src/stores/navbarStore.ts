import { defineStore } from "pinia";
import { Dropdown, Link, Menu } from "../interfaces/Menu";
import { useRouter } from "vue-router";

export const useNavbarStore = defineStore('navbar', {
  state: () => ({
    enableNavbar: false,
  }),
  actions: {
    getAvailableNavbarRoutes(): Menu {
      const router = useRouter();
      const routes = router?.options.routes;
      const excludedRoutes = [
        'NotFound', 
        'Home', 
        'NotificationsHistory', 
        'Login'
      ];
      
      const navbarRoutes: Menu = routes
        .filter(route => !excludedRoutes.includes(route.name as string))
        .map(route => {
          const label = route.meta?.translatedName;
          const routeName = route.name;
    
          if (route.children) {
            const links: Link[] = route.children.map(child => ({
              type: 'link',
              routeName: child.meta?.translatedName as string,
              label: child.meta?.translatedName as string,
              icon: child.meta?.icon,
            }));
            
            return {
              type: 'dropdown',
              routeName: routeName,
              label: label,
              icon: route.meta?.icon,
              links,
            } as Dropdown;
            
          } else {
            return {
              type: 'link',
              routeName: routeName,
              label: label,
              icon: route.meta?.icon,
            } as Link;
          }
        });
    
      return navbarRoutes
    }
  },
})