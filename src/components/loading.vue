<template>
  <q-card>
    <q-skeleton height="210px" width="100%" square />
    <q-card-section>
      <q-item-label>
        <q-skeleton type="text" />
      </q-item-label>
      <q-item-label caption>
        <q-skeleton type="text" />
      </q-item-label>
    </q-card-section>

    <q-card-actions align="center" class="q-gutter-md">
      <q-skeleton type="QBtn" />
    </q-card-actions>
  </q-card>
</template>
<script>
export default {
  name: 'LoadingCard',
  setup() {
    return {}
  },
}
</script>