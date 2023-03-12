<script lang="ts" setup>
interface Props {
  body: string
}
const Props = defineProps<Props>()
const dialog = ref<boolean>(false)
</script>

<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" icon="mdi-dots-horizontal" flat size="small" />
      </template>
      <v-card min-height="200px">
        <v-card-title>
          タイトル
        </v-card-title>
        <v-card-subtitle>
          サブタイトル
        </v-card-subtitle>
        <v-card-text class="pb-3">
          {{ body }}
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>