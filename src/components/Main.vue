<template>
  <div>
    <div class="container">
      
        <div class="row">

            <div class="col-12">
              <button type="button" class="btn btn-primary float-right mb-3" @click="openModal">Add New Contact</button>
            </div>
            <!-- Modal Component for adding a new contact -->
            <AddContact ref="add_modal" @refresh="refreshData"/>

            <!-- Card template for the contact details -->
            <template  v-if="CONTACT_DATA && CONTACT_DATA.length">
                <CardTemplate :data="CONTACT_DATA" @filter="filterTable" :ref="`card_template${CONTACT_DATA.id}`" @refresh="refreshData"/>
            </template>
            <template v-else>
                <div class="col-12 d-flex align-items-center" style="min-height: 300px;">
                  <div class="container text-center">
                    <h5 class="pt-1 pb-0 m-0">No items found</h5>
                     <button type="button" class="btn btn-primary mt-3" @click="filterTable('all')">Back</button>
                  </div>
                </div>
            </template>

        </div>

    </div>
  </div>
</template>

<script>
/* eslint-disable */ 
import { mapGetters, mapActions } from 'vuex'
import AddContact from './modal/AddContact.vue'
import CardTemplate from './Card.vue'
import $ from "jquery";

export default {
  name: 'MainComponent',
  props: {
  
  },
  components: {
    AddContact,
    CardTemplate
  },
  data() {
      return {
          CONTACT_DATA: [],
          nextItem: 0,
          limit: 3,
      };
  },
  watch : {
     
  },
  computed: {
    ...mapGetters({
        CONTACTS: "contact",
    }),
  },
  created(){
     // this.CONTACT_DATA = this.CONTACTS
  },
  mounted(){
     this.getNextUser();
     this.loadMore()
  },
  methods: {
    ...mapActions({

    }),
    loadMore() {  
        this.limit + 1
        const append = this.CONTACTS.slice(0, this.CONTACT_DATA.length + this.limit);
        this.CONTACT_DATA = append
    },
    refreshData(){
        this.loadMore()
    },
    getNextUser() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
        if (bottomOfWindow) {
            console.log(bottomOfWindow)
            this.loadMore()
        }
      }
    },
    openModal(){
        let element = this.$refs.add_modal.$el
        $(element).modal('show')
    },
    filterTable(val){ 
        this.CONTACT_DATA = []
        if(val == "all"){
            this.CONTACT_DATA = this.CONTACTS
        }else{
            this.CONTACTS.map(item => {
              if(item.isFavorite === true){
                this.CONTACT_DATA.push(item)
              }
            })
        }
    }
 
  },
}
</script>
<style scoped>

</style>
