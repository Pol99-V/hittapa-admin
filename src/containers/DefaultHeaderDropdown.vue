<template>
  <AppHeaderDropdown no-caret right>
    <template slot="header">
      <img
        alt="admin@bootstrapmaster.com"
        class="img-avatar"
        src="img/avatars/6.jpg"/>
    </template>
    <template slot="dropdown">
      <div>
        <h6 class="text-capitalize text-center">your dropdown</h6>
        <ol>
          <li>one</li>
          <li>two</li>
          <li>three</li>
        </ol>
      </div>
    </template>
  </AppHeaderDropdown>
</template>

<script>
  import {HeaderDropdown as AppHeaderDropdown} from '@coreui/vue'

  export default {
    name: 'DefaultHeaderDropdown',
    components: {
      AppHeaderDropdown
    }
  }
</script>

