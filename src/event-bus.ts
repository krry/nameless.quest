/* 
  Global Event Bus

  [source](https://www.digitalocean.com/community/tutorials/vuejs-global-event-bus)

  to use, first import:
  import {EventBus} from '../event-bus'

  then to emit:
  EventBus.$emit('channel-name', messageObj)

  or to listen:
  EventBus.$on('channel-name', callbackFn)
*/
import Vue from 'vue'
const EventBus = new Vue()
export default EventBus
