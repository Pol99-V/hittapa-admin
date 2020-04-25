<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile/>
      <b-link class="navbar-brand" to="#">
        <img alt="CoreUI Logo" class="navbar-brand-full" height="25" src="img/brand/logo.svg" width="89">
        <img alt="CoreUI Logo" class="navbar-brand-minimized" height="30" src="img/brand/sygnet.svg" width="30">
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg"/>
      <b-navbar-nav class="d-md-down-none ml-auto">
        <b-nav-item class="d-md-down-none">
        </b-nav-item>
      </b-navbar-nav>
      <!--      <AsideToggler class="d-none d-lg-block" />-->
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <SidebarNav :navItems="navItems"></SidebarNav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <!--<AppAside fixed>
        &lt;!&ndash;aside&ndash;&gt;
        <DefaultAside/>
      </AppAside>-->
    </div>
    <TheFooter>
      <!--footer-->
      <div>
        <a href="http://hittapa.com/">HittaPå Administrator</a>
        <span class="ml-1">&copy; 2020</span>
      </div>
      <div class="ml-auto">
        <span class="mr-1">Powered by</span>
        <a href="http://hittapa.com/">HittaPå Inc</a>
      </div>
    </TheFooter>
  </div>
</template>

<script>
  import nav from '@/_nav'
  import {
    Aside as AppAside,
    AsideToggler,
    Breadcrumb,
    Footer as TheFooter,
    Header as AppHeader,
    Sidebar as AppSidebar,
    SidebarFooter,
    SidebarForm,
    SidebarHeader,
    SidebarMinimizer,
    SidebarNav,
    SidebarToggler
  } from '@coreui/vue'

  export default {
    name: 'DefaultContainer',
    components: {
      AsideToggler,
      AppHeader,
      AppSidebar,
      AppAside,
      TheFooter,
      Breadcrumb,
      SidebarForm,
      SidebarFooter,
      SidebarToggler,
      SidebarHeader,
      SidebarNav,
      SidebarMinimizer
    },
    data() {
      return {
        navItems: nav.items
      }
    },
    computed: {
      name() {
        return this.$route.name
      },
      list() {
        return this.$route.matched.filter((route) => route.name || route.meta.label)
      }
    }
  }
</script>
