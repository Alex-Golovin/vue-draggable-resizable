<template>
  <vue-draggable-resizable
    :parent="true"
    :w="widthPx"
    :h="heightPx"
    :x="leftPx"
    :y="topPx"
    @dragstop="onDragStop"
    @resizestop="onResizeStop"
  >
    <slot />
  </vue-draggable-resizable>
</template>

<script>
import VueDraggableResizable from './vue-draggable-resizable.vue'

export default {
  components: { VueDraggableResizable },

  props: {
    parentWidth: {
      type: Number,
      required: true
    },
    parentHeight: {
      type: Number,
      required: true
    },
    width: {
      type: String,
      required: true
    },
    height: {
      type: String,
      required: true
    },
    top: {
      type: String,
      required: true
    },
    left: {
      type: String,
      required: true
    }
  },

  data: () => ({
    itemWidth: '',
    itemHeight: '',
    itemTop: '',
    itemLeft: '',

    widthPx: null,
    heightPx: null,
    topPx: null,
    leftPx: null
  }),

  watch: {
    width (value) {
      this.itemWidth = value
      this.recalculateWidthAndHeightInPx()
    },
    height (value) {
      this.itemHeight = value
      this.recalculateWidthAndHeightInPx()
    },
    top (value) {
      this.itemTop = value
      this.recalculateTopAndLeftInPx()
    },
    left (value) {
      this.itemLeft = value
      this.recalculateTopAndLeftInPx()
    },
    itemWidth (value) {
      this.$emit('width-change', value)
    },
    itemHeight (value) {
      this.$emit('height-change', value)
    },
    itemTop (value) {
      this.$emit('top-change', value)
    },
    itemLeft (value) {
      this.$emit('left-change', value)
    }
  },

  mounted () {
    this.setItemParameters()
    this.recalculateWidthAndHeightInPx()
    this.recalculateTopAndLeftInPx()
    window.addEventListener('resize', this.onWindowResize)
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.onWindowResize)
  },

  methods: {
    setItemParameters () {
      this.itemWidth = this.width
      this.itemHeight = this.height
      this.itemTop = this.top
      this.itemLeft = this.left
    },

    onWindowResize () {
      this.recalculateWidthAndHeightInPx()
      this.recalculateTopAndLeftInPx()
    },

    recalculateWidthAndHeightInPx () {
      this.widthPx = (this.parentWidth / 100) * Number(this.itemWidth.replace('%', ''))
      this.heightPx = (this.parentHeight / 100) * Number(this.itemHeight.replace('%', ''))
    },

    recalculateTopAndLeftInPx () {
      this.topPx = (this.parentHeight / 100) * Number(this.itemTop.replace('%', ''))
      this.leftPx = (this.parentWidth / 100) * Number(this.itemLeft.replace('%', ''))
    },

    recalculateTopAndLeftInPercents () {
      this.itemTop = this.topPx / (this.parentHeight / 100) + '%'
      this.itemLeft = this.leftPx / (this.parentWidth / 100) + '%'
    },

    recalculateWidthAndHeightInPercents () {
      this.itemWidth = this.widthPx / (this.parentWidth / 100) + '%'
      this.itemHeight = this.heightPx / (this.parentHeight / 100) + '%'
    },

    onDragStop (left, top) {
      this.topPx = top
      this.leftPx = left
      this.recalculateTopAndLeftInPercents()
    },

    onResizeStop (left, top, width, height) {
      this.topPx = top
      this.leftPx = left
      this.widthPx = width
      this.heightPx = height
      this.recalculateTopAndLeftInPercents()
      this.recalculateWidthAndHeightInPercents()
    }
  }
}
</script>
