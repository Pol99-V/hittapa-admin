import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer');

// Views - Pages
const Page404 = () => import('@/views/pages/Page404');
const Page500 = () => import('@/views/pages/Page500');
const Login = () => import('@/views/pages/Login');
const Register = () => import('@/views/pages/Register');
const CreateAccount = () => import('@/views/pages/CreateAccount');
const ForgotPassword = () => import('@/views/pages/ForgotPassword');
const Success = () => import('@/views/pages/Success');
const Callback = () => import('@/views/pages/Callback');

// Views
const Dashboard = () => import('@/views/Dashboard');

// Views Users
const usertables = () => import('@/views/usertable/UserTable');

//Categories views
const categorytable = () => import('@/views/categorytable/CategoryTable');

// sub category views
const subcategorytable = () => import('@/views/subcategorytable/SubCategoryTable');

// Requirements views
const requirementstable = () => import('@/views/requirementstable/RequirementsTable');

// Notification views
const notificationtable = () => import('@/views/notificationtable/NotificationTable');
// post views
const posttable = () => import('@/views/posttable/PostTable');
// logout views
const logouttable = () => import('@/views/logouttable/LogoutTable');

const activitiyDetail = () => import('@/views/posttable/DetailActivity');

Vue.use(Router);

function AuthGuard(to, from, next) {

  if (!store.getters.isLoggedIn) {
    next({name: 'Login'})
  } else {
    // analytics.identify(store.getters.getSessionInformation.email, {
    //   firstname: store.getters.getSessionInformation.firstname,
    //   username: store.getters.getSessionInformation.username,
    //   website: location.protocol + '//' + location.host + '/admin/#/users/' + store.getters.getSessionInformation.user_id,
    //   email: store.getters.getSessionInformation.email,
    //   plan: store.getters.getSessionInformation.role,
    // });
    next()
  }
}

function Guest(to, from, next) {
  if (store.getters.isLoggedIn) {
    next({name: 'Home'})
  } else {
    next()
  }
}

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({y: 0}),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      beforeEnter: AuthGuard,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: '/users',
          redirect: '/users/list',
          name: 'Users',
          component: {
            render(c) {
              return c('router-view')
            }
          },
          children: [
            {
              path: 'list',
              name: 'ListUsers',
              component: usertables
            }
            // {
            //   path: 'data-table',
            //   name: 'Data Table',
            //   component: DataTable
            // },
          ]
        },
        {
          path: '/categories',
          name: 'Categories',
          component: categorytable,
        },
        {
          path: '/subcategory',
          name: 'SubCategory',
          component: subcategorytable,
        },
        {
          path: '/requirements',
          name: 'Requirements',
          component: requirementstable,
        },
        {
          path: '/post',
          name: 'Activity Post',
          component: posttable,
        },
        {
          path: '/post/:id',
          name: 'ActivityDetail',
          component: activitiyDetail
        },
        {
          path: '/notification',
          name: 'Push Notification',
          component: notificationtable,
        },
        {
          path: '/logout',
          name: 'Log Out',
          component: logouttable,
        },
      ]
    },
    {
      path: '/auth',
      redirect: '/auth/login',
      name: 'Auth',
      component: {
        render(c) {
          return c('router-view')
        }
      },
      beforeEnter: Guest,
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login,
        },
        {
          path: 'callback/:token',
          name: 'callback',
          component: Callback
        },
        {
          path: 'register',
          name: 'Register',
          component: Register,
        },
        {
          path: 'forgot-password',
          name: 'ForgotPassword',
          component: ForgotPassword,
        },
        {
          path: 'success',
          name: 'Success',
          component: Success
        },
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render(c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        }
      ]
    },
    {
      path: '**',
      redirect: '/pages'
    }
  ]
})
