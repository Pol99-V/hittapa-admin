export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'primary',
        // text: 'NEW'
      }
    },
    {
      name: 'Users',
      url: '/users',
      icon: 'icon-user',
      children: [
        {
          name: 'ListUsers',
          url: '/users/list',
          icon: 'fa fa-angle-double-right'
        }
      ]
    },
    {
      name: 'Categories',
      url: '/categories',
      icon: 'fa fa-list-alt',
    },
    {
      name: 'SubCategory',
      url: '/subcategory',
      icon: 'fa fa-list-alt',
    },
    {
      name: 'Requirements',
      url: '/requirements',
      icon: 'cui-paperclip icons',
      /*children: [
        {
          name: 'List Requirements',
          url: '/requirements/list',
          icon: 'fa fa-angle-double-right'
        },
        {
          name: 'Edit Requirements',
          url: '/requirements/edit',
          icon: 'fa fa-angle-double-right'
        }
      ]*/
    },
    {
      name: 'Activity Post',
      url: '/post',
      icon: 'cui-paperclip icons',
    },
    {
      name: 'Push Notification',
      url: '/notification',
      icon: 'cui-paperclip icons',
    },
    {
      name: 'Log Out',
      url: '/logout',
      icon: 'fa icon-logout',
    },
  ]
}
