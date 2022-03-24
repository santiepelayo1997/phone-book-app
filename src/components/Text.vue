<template>
    <div>
        <p class="card-title"><b>{{fieldName}}</b> {{fieldValue}}</p>
    </div>
</template>
<script>


/* eslint-disable */ 
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Button',
  props: {
      fieldName: String,
      fieldValue: String
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
  },
}
</script>
<style scoped>

</style>
