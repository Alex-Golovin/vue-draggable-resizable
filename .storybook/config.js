import { configure, addParameters } from '@storybook/vue'

import Vue from 'vue'

import VueDraggableResizable from '../src/components/vue-draggable-resizable'
import DraggableResizableItem from '../src/components/draggable-resizable-item'
import DraggableResizableParent from '../src/components/draggable-resizable-parent'
import '../src/components/vue-draggable-resizable.css'

Vue.component('vue-draggable-resizable', VueDraggableResizable)
Vue.component('draggable-resizable-item', DraggableResizableItem)
Vue.component('draggable-resizable-parent', DraggableResizableParent)

addParameters({
  options: {
    /**
     * display panel that shows addon configurations
     * @type {Boolean}
     */
    showPanel: false
  }
})

function loadStories() {
  require('../stories')
}

configure(loadStories, module)
