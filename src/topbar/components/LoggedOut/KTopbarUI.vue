<template>
  <q-toolbar>
    <router-link
      :to="'/'"
      class="logo"
    >
      <KarrotLogo />
    </router-link>
    <q-toolbar-title>
      <div class="row justify-between no-wrap">
        <div/>
        <KBreadcrumb
          class="bread"
          :breadcrumbs="breadcrumbs"
        />
        <div/>
      </div>
    </q-toolbar-title>
    <div class="actions">
      <LocaleSelect />
      <router-link :to="{ name: 'login' }">
        <q-btn class="text-white">
          {{ $t('LOGIN.SUBMIT') }}
        </q-btn>
      </router-link>
      <router-link
        v-if="!$q.platform.is.mobile"
        :to="{ name: 'signup' }"
      >
        <q-btn
          flat
          class="text-white bg-secondary"
        >
          {{ $t('LOGIN.SIGNUP') }}
        </q-btn>
      </router-link>
    </div>
  </q-toolbar>
</template>

<script>
import { QToolbar, QToolbarTitle, QBtn } from 'quasar'
import KarrotLogo from '@/logo/components/KarrotLogo'
import KBreadcrumb from '@/topbar/components/KBreadcrumb'
import LocaleSelect from '@/utils/components/LocaleSelect'

export default {
  components: {
    QToolbar, QToolbarTitle, QBtn, KarrotLogo, KBreadcrumb, LocaleSelect,
  },
  props: {
    breadcrumbs: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
}
</script>

<style scoped lang="stylus">
@import '~variables'
.logo
  margin-left 1em
  height 36px
.actions .router-link-exact-active
  display none
</style>
