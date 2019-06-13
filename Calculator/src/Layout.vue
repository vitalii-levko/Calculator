<template>
  <div :class="cls">
    <span
      v-for="item in items"
      :key="item.id"
      @click="item.act(item.value)"
      :class="item.cls" 
    >
    {{ item.title }}
    </span>
  </div>
</template>

<script>
  export default {
    name: 'Layout',
    props: ['items', 'cls'],
  };
</script>
