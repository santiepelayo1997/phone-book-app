<template>
    <div>
        <button type="button" :class="'mr-3 btn ' + btnType" @click="action()">{{btnName}}</button>
    </div>
</template>
<script>

/* eslint-disable */ 
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Button',
  props: {
      data: Object,
      btnName: String,
      btnType: String
  },
  components: {

  },
  data() {
      return {
     
      };
  },
  watch : {
     
  },
  created(){
   
  },
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
    ...mapActions({
    }),
    action(){
        this.$emit('action')
    },
  },
}
</script>
<style scoped>

</style>
