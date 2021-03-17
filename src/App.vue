<template>
  <div id="app">
    <draggable-resizable-parent />
  </div>
</template>

<script>
import DraggableResizableParent from './components/draggable-resizable-parent'
import './components/vue-draggable-resizable.css'

export default {
  name: 'app',
  components: {
    DraggableResizableParent
  }
}
</script>
