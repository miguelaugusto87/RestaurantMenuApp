import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../../frontend/views/Home.vue'
import store from '../../main.js'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/home/:cart?',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'AppVue',
   // component: () => import(/* webpackChunkName: "about" */ '../../App.vue'),
  },
  {
    path: '/about/',   
     name: 'About',
     component: () => import(/* webpackChunkName: "about" */ '../../frontend/views/About.vue')
   },
  {
   path: '/products/:cart/:prod?/:categoryName?',   
    name: 'Products',
    component: () => import(/* webpackChunkName: "about" */ '../../frontend/views/Products.vue'),
  },
  {
    path: '/order/:cart/:order?',   
     name: 'Order',
     component: () => import(/* webpackChunkName: "about" */ '../../frontend/views/Order.vue')
   },
   {
    path: '/order/:cart/:order?',   
     name: 'OrderState',
     component: () => import(/* webpackChunkName: "about" */ '../../frontend/views/OrderState.vue')
   },
   {
    path: '/order/:customerId/:CustomerName?',   
     name: 'ListOrder',
     component: () => import(/* webpackChunkName: "about" */ '../../frontend/views/ListOrder.vue')
   },
  {
    path: '/category',
    name: 'Category',
    component: () => import(/* webpackChunkName: "about" */ '../views/Category.vue'),
    beforeEnter: (to, from, next) =>{
      if (store.state.authenticated == false)
      {
        next("/login");
      } else {
        next();
      }
    }
  },
  {
    path: '/category-form/:categoryId?',
    name: 'CategoryForm',
    component: () => import(/* webpackChunkName: "about" */ '../views/CategoryForm.vue'),
    beforeEnter: (to, from, next) =>{
      if (store.state.authenticated == false)
      {
        next("/login");
      } else {
        next();
      }
    }
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import(/* webpackChunkName: "about" */ '../views/Product.vue'),
    beforeEnter: (to, from, next) =>{
      if (store.state.authenticated == false)
      {
        next("/login");
      } else {
        next();
      }
    }
  },
  {
    path: '/product-form/:productId?/:categoryId?/:menuId?',
    name: 'ProductForm',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProductForm.vue'),
    beforeEnter: (to, from, next) =>{
      if (store.state.authenticated == false)
      {
        next("/login");
      } else {
        next();
      }
    }
  },
  {
    path: '/productByCategory/:categoryId/:menuId?',
    name: 'ProductByCategory',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProductByCategory.vue'),
    beforeEnter: (to, from, next) =>{
      if (store.state.authenticated == false)
      {
        next("/login");
      } else {
        next();
      }
    }
  },
  {
    path: '/menu',
    name: 'Menu',
    component: () => import(/* webpackChunkName: "about" */ '../views/Menu.vue'),
    beforeEnter: (to, from, next) =>{
      if (store.state.authenticated == false)
      {
        next("/login");
      } else {
        next();
      }
    }
  },
  {
    path: '/menu-form/:menuId?',
    name: 'MenuForm',
    component: () => import(/* webpackChunkName: "about" */ '../views/MenuForm.vue'),
    beforeEnter: (to, from, next) =>{
      if (store.state.authenticated == false)
      {
        next("/login");
      } else {
        next();
      }
    }
  },
  {
    path: '/customer',
    name: 'Customer',
    component: () => import(/* webpackChunkName: "about" */ '../views/Customer.vue'),
    beforeEnter: (to, from, next) =>{
      if (store.state.authenticated == false)
      {
        next("/login");
      } else {
        next();
      }
    }
  },
  {
    path: '/customer-form/:customerId?',
    name: 'CustomerForm',
    component: () => import(/* webpackChunkName: "about" */ '../views/CustomerForm.vue'),
    beforeEnter: (to, from, next) =>{
      if (store.state.authenticated == false)
      {
        next("/login");
      } else {
        next();
      }
    }
  },
  {
    path: '/table',
    name: 'Table',
    component: () => import(/* webpackChunkName: "about" */ '../views/Table.vue'),
    beforeEnter: (to, from, next) =>{
      if (store.state.authenticated == false)
      {
        next("/login");
      } else {
        next();
      }
    }
  },
  {
    path: '/table-form/:tableId?',
    name: 'TableForm',
    component: () => import(/* webpackChunkName: "about" */ '../views/TableForm.vue'),
    beforeEnter: (to, from, next) =>{
      if (store.state.authenticated == false)
      {
        next("/login");
      } else {
        next();
      }
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import(/* webpackChunkName: "about" */ '../views/Order.vue'),
    beforeEnter: (to, from, next) =>{
      if (store.state.authenticated == false)
      {
        next("/login");
      } else {
        next();
      }
    }
  },
  {
    path: '/tax',
    name: 'Tax',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Tax.vue'),
    beforeEnter: (to, from, next) =>{
      if (store.state.authenticated == false)
      {
        next("/login");
      } else {
        next();
      }
    }
  },
  {
    path: '/tax-form/:taxId?',
    name: 'TaxForm',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/TaxForm.vue'),
    beforeEnter: (to, from, next) =>{
      if (store.state.authenticated == false)
      {
        next("/login");
      } else {
        next();
      }
    }
  },
  {
    path: '/shipping',
    name: 'Shipping',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Shipping.vue'),
    beforeEnter: (to, from, next) =>{
      if (store.state.authenticated == false)
      {
        next("/login");
      } else {
        next();
      }
    }
  },
  {
    path: '/shipping-form/:shippingId?',
    name: 'ShippingForm',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ShippingForm.vue'),
    beforeEnter: (to, from, next) =>{
      if (store.state.authenticated == false)
      {
        next("/login");
      } else {
        next();
      }
    }
  },
  {
    path: '/otherCharge',
    name: 'OtherCharge',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/OtherCharge.vue'),
    beforeEnter: (to, from, next) =>{
      if (store.state.authenticated == false)
      {
        next("/login");
      } else {
        next();
      }
    }
  },
  {
    path: '/otherCharge-form/:otherChargeId?',
    name: 'OtherChargeForm',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/OtherChargeForm.vue'),
    beforeEnter: (to, from, next) =>{
      if (store.state.authenticated == false)
      {
        next("/login");
      } else {
        next();
      }
    }
  },
  {
    path: '/user',
    name: 'User',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/User.vue'),
    beforeEnter: (to, from, next) =>{
      if (store.state.authenticated == false)
      {
        next("/login");
      } else {
        next();
      }
    }
  },
  {
    path: '/user-form/:userId?',
    name: 'UserForm',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/UserForm.vue'),
    beforeEnter: (to, from, next) =>{
      if (store.state.authenticated == false)
      {
        next("/login");
      } else {
        next();
      }
    }
  },
  {
    path: '/role',
    name: 'Role',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Role.vue'),
    beforeEnter: (to, from, next) =>{
      if (store.state.authenticated == false)
      {
        next("/login");
      } else {
        next();
      }
    }
  },
  {
    path: '/role-form/:roleId?',
    name: 'RoleForm',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/RoleForm.vue'),
    beforeEnter: (to, from, next) =>{
      if (store.state.authenticated == false)
      {
        next("/");
      } else {
        next();
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/controlPanel',
    name: 'ControlPanel',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ControlPanel.vue'),
    beforeEnter: (to, from, next) =>{
      if (store.state.authenticated == false)
      {
        next("/login");
      } else {
        next();
      }
    }

  },
  {
    path: '/basicDataSettingsForm/:settingId?',
    name: 'BasicSettingForm',
    component: () => import(/* webpackChunkName: "about" */ '../views/BasicDataSettingsForm.vue'),
    beforeEnter: (to, from, next) =>{
      if (store.state.authenticated == false)
      {
        next("/");
      } else {
        next();
      }
    }
  },
  {
    path: '/aboutDataSettings',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutDataSetting.vue'),
    beforeEnter: (to, from, next) =>{
      if (store.state.authenticated == false)
      {
        next("/");
      } else {
        next();
      }
    }
  },
  {
    path: '/aboutDataSettingsForm/:aboutId?',
    name: 'AboutForm',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutDataSettingsForm.vue'),
    beforeEnter: (to, from, next) =>{
      if (store.state.authenticated == false)
      {
        next("/");
      } else {
        next();
      }
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
