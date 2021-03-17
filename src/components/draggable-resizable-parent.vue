<template>
  <div>
    <div
      ref="parentElement"
      style="position: relative; height: 400px; border: 1px solid blue; margin: 1em;"
    >
      <template v-if="width && height">
        <draggable-resizable-item
          v-for="(item, index) in items"
          :key="index"
          :parent-width="width"
          :parent-height="height"
          :width="item.width"
          :height="item.height"
          :top="item.top"
          :left="item.left"
          @width-change="item.width = $event"
          @height-change="item.height = $event"
          @top-change="item.top = $event"
          @left-change="item.left = $event"
        >
          <p>Content of Element #{{ index + 1 }}</p>
        </draggable-resizable-item>
      </template>
    </div>

    <div style="margin: 1em;">
      <button @click="addNewItem" style="background: red; color: white; border: none; padding: 0.5em 1em;">
        + Add new element
      </button>

      <div style="display: flex; flex-wrap: wrap;">
        <div v-for="(item, index) in items" :key="index" style="margin-right: 2em; min-width: 205px">
          <h4 style="margin-bottom: .5em;">
            Element #{{ index + 1 }}
          </h4>
          Width: <input v-model="item.width"><br>
          Height: <input v-model="item.height"><br>
          Top: <input v-model="item.top"><br>
          Left: <input v-model="item.left"><br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DraggableResizableItem from './draggable-resizable-item.vue'

export default {
  components: {
    DraggableResizableItem
  },

  data: () => ({
    width: 0,
    height: 0,

    items: [
      {
        width: '20%',
        height: '40%',
        top: '20%',
        left: '40%'
      },
      {
        width: '20%',
        height: '40%',
        top: '20%',
        left: '70%'
      }
    ]
  }),

  mounted () {
    this.setParentElementWidthAndHeight()
    window.addEventListener('resize', this.onWindowResize)
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.onWindowResize)
  },

  methods: {
    onWindowResize () {
      this.setParentElementWidthAndHeight()
    },

    setParentElementWidthAndHeight () {
      this.width = this.$refs.parentElement.clientWidth
      this.height = this.$refs.parentElement.clientHeight
    },

    addNewItem () {
      this.items.push({
        width: '20%',
        height: '20%',
        top: '0%',
        left: '0%'
      })
    }
  }
}
</script>
