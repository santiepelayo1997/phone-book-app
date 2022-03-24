<template>
    <div class="col-12">
        <!-- Search Name -->
        <input type="text" class="form-control mb-4"  v-model="vModelSearch" placeholder="Search Name.."/>

        <!-- Filter Button -->
         <button class="btn btn-primary mb-4" v-on:click="ascending = !ascending" >
            <i v-if="ascending" class="fa fa-sort-up">Sort by Name Desc</i> 
            <i v-else class="fa fa-sort-down">Sort by Name Asc</i>
        </button>

        <div class="form-group">
            <label for="exampleFormControlSelect2">Select Filter to the Table</label>
            <select  @change="onChangeFilter($event)" class="form-select form-control mb-3" v-model="vModelFilterTable">
                    <option value="view-all">All</option>
                    <option value="show-favorites">View Favorites</option>
            </select>
        </div>
            

        <div class="card mb-4" v-for="item in filteredArray" :key="item">
            <div class="card-body" >
                <span v-if="currentId == item.id" >
                        <!-- Edit Component to update details of the contact -->
                        <EditForm :data="item" @reset="resetForm" @refresh="refreshData"/>
                </span>
                <span v-else>
                        <span v-if="item.isFavorite">
                              <span class="badge badge-pill badge-success float-right">Favorite</span>
                        </span>
                      
                        <Text fieldName="First Name:" :fieldValue="item.first_name"/>
                        <Text fieldName="Last Name:" :fieldValue="item.last_name"/>
                        <Text fieldName="Phone Number:" :fieldValue="item.phone_number"/>
                        <Text fieldName="Date Created:" :fieldValue="moment(item.created_at).format('YYYY-MM-DD')"/>
                        
                    <div class="d-flex">
                        <!-- List of actions in card -->
                        <span v-if="item.isFavorite">
                              <Button  @action="removeAsFavorite(item)" btnName="REMOVE AS FAVORITE" btnType="btn-danger"/>
                        </span>
                        <span v-else>
                              <Button  @action="markAsFavorite(item)" btnName="MARK AS FAVORITE" btnType="btn-primary"/>
                        </span>
                        
                        <Button @action="deleteContact(item.id)" btnName="DELETE" btnType="btn-danger"/>
                        <Button @action="editContact(item)" btnName="EDIT" btnType="btn-success"/>
                    </div>
                  
                </span>
               
            </div>
        </div>

    </div>
</template>

<script>

/* eslint-disable */ 
import { mapGetters, mapActions } from 'vuex'
import EditForm from './EditForm.vue'
import Button from './Button.vue'
import Text from './Text.vue'
import $ from "jquery";
import moment from 'moment'

export default {
  name: 'Card',
  props: {
      data: Object
  },
  components: {
      EditForm,
      Button,
      Text
  },
  data() {
      return {
         vModelSearch: "",
         vModelFirstName: "",
         vModelLastName: "",
         vModelPhoneNumber: "",
         vModelFilterTable: "view-all",
         sortBy: "first_name",
         ascending: false,
         currentId: "",
         ifEditForm: false
      };
  },
  watch : {
     
  },
  computed: {
    ...mapGetters({
      
    }),
   filteredArray() {
        let dataArray = this.data
        
        // Process search input
        if (this.vModelSearch != '' && this.vModelSearch) {
            dataArray = dataArray.filter((item) => {
            return item.first_name
                .toUpperCase()
                .includes(this.vModelSearch.toUpperCase())
            })
        }
        
        // Sort by alphabetical order
        dataArray = dataArray.sort((a, b) => {
            if (this.sortBy == 'first_name') {
                let fa = a.first_name.toLowerCase(), fb = b.first_name.toLowerCase()
            
                if (fa < fb) {
                return -1
                }
                if (fa > fb) {
                return 1 
                }
                return 0
            }
        })
        
        // Show sorted array in descending or ascending order
        if (!this.ascending) {
            dataArray.reverse()
        }
            
        return dataArray
    }
  },
  methods: {
    ...mapActions({
        DELETE_CONTACT: "removeContactAction",
        EDIT_CONTACT: "updateContactAction",
        VIEW_FAVORITES: "setToFavoritesAction",
        SHOW_ALL : "showAllAction",
    }),
    moment: function () {
      return moment();
    },
    deleteContact(id){
        this.DELETE_CONTACT(id)
        this.refreshData()
    },
    editContact(data){
        this.currentId = data.id
    },
    markAsFavorite(data){
         let payload = {
            id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            phone_number: data.phone_number,
            isFavorite: true,
        }
        this.EDIT_CONTACT(payload)
        this.refreshData()
    },
    removeAsFavorite(data){
         let payload = {
            id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            phone_number: data.phone_number,
            isFavorite: false,
        }
        this.EDIT_CONTACT(payload)
        this.refreshData()
    },
    onChangeFilter(){
        console.log(this.vModelFilterTable)
        if(this.vModelFilterTable == "view-all"){
            console.log("asdas")
            this.$emit('filter', "all")
        }else{
            this.$emit('filter', "favorites")
        }
    },
    refreshData(){
        this.$emit("refresh");
    }, 
    resetForm(data){
        this.currentId = ""
    },
    openModal(){
        let element = this.$refs.add_modal.$el
        $(element).modal('show')
    },
 
  },
}
</script>
<style scoped>

</style>
