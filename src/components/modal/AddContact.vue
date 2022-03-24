<template>
      <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="addModal" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add New Contact</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
               <form>
                   <div class="row">
                        <div class="col-6">
                             <input type="text" 
                             class="form-control" 
                             placeholder="Input First Name"
                             v-model="vModelFirstName"/>  
                        </div>
                         <div class="col-6">
                             <input type="text"  
                             class="form-control" 
                             placeholder="Input Last Name"
                             v-model="vModelLastName"/>  
                        </div>
                         <div class="col-12 mt-3">
                            <input
                              v-on:keyup="formatNumber"
                              class="form-control"
                              placeholder="Enter phone number, e.g. +6511112222"
                              v-model="vModelPhoneNumber"
                            />
                        </div>
                   </div>
               </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="addContact">Save</button>
            </div>
          </div>
        </div>
      </div>
</template>
<script>
/* eslint-disable */ 
import short from 'short-uuid'
import { mapGetters, mapActions } from 'vuex'
import { PhoneNumberFormat, PhoneNumberUtil } from "google-libphonenumber";
import $ from "jquery";

const formatInternationalPhoneNumber = function formatInternationalPhoneNumber(n) {
  let num = "";
  try {
    num = PhoneNumberUtil.getInstance().format(
      PhoneNumberUtil.getInstance().parseAndKeepRawInput(n, 'US'),
      PhoneNumberFormat.E164
    );
  } catch (e) {}
  return num;
};

export default {

  name: 'AddContact',
  data() {
      return {
         vModelFirstName: "",
         vModelLastName: "",
         vModelPhoneNumber: null,
         formatted: "",
      };
  },
  watch : {
     
  },
  computed: {
    ...mapGetters({
        IFEXIST: "ifExist"
    }),
  },
  methods: {
    ...mapActions({
        ADD_CONTACT: "addContactAction",
        CHECK_IF_EXIST: "checkIfExistingAction",
    }),
    formatNumber() {
      this.formatted = formatInternationalPhoneNumber(this.vModelPhoneNumber);
    },
    addContact(){

          if(this.vModelFirstName == "" || this.vModelLastName == ""){
               this.$swal({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Please input name!',
                })
          }else if(this.vModelPhoneNumber == ""){
                this.$swal({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Please input phone number!',
                })
          }else{
                   if(this.IFEXIST == true){
                      this.CHECK_IF_EXIST(this.formatted)
                      this.$swal({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'This number is already exist!',
                      })
                  }else{
                      this.CHECK_IF_EXIST(this.formatted)
                      let payload = {
                          id: short.generate(),
                          first_name: this.vModelFirstName,
                          last_name: this.vModelLastName,
                          phone_number: this.formatted,
                          isFavorite: false,
                          created_at: new Date(),
                      }
                      this.ADD_CONTACT(payload)
                      $('#addModal').modal('hide')
                      this.$emit("refresh");
                      this.resetForm()
                  }
               
          }
      
    },
    resetForm(){
        this.vModelFirstName = ""
        this.vModelLastName = ""
        this.vModelPhoneNumber = ""
    },
  },
}
</script>
<style scoped>

</style>
