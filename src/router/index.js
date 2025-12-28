import { createRouter, createWebHistory } from 'vue-router';
import Analytics from '../views/Analytics.vue'
import Reports from '../views/Reports.vue'
import Users from '../views/Users.vue'
import AllUsers from '../views/AllUsers.vue'
import AddNewUser from '../views/AddNewUsers.vue'
import RolesPermissions from '../views/RolesPermissions.vue'
import Products from '../views/Products.vue'
import Messages from '../views/Messages.vue'
import Settings from '../views/Settings.vue'

const routes = [
  {
    path: '/analytics',
    name: 'Analytics',
    component: Analytics
  },
  {
    path: '/reports',
    name: 'Reports',
    component: Reports
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/users/all',
    name: 'AllUsers',
    component: AllUsers
  },
  {
    path: '/users/add-new',
    name: 'AddNewUser',
    component: AddNewUser
  },
  {
    path: '/users/roles-permissions',
    name: 'RolesPermissions',
    component: RolesPermissions
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/messages',
    name: 'Messages',
    component: Messages
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;