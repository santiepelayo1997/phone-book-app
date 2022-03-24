<template>
<div>
    <form >
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
                    class="form-control"
                    placeholder="Enter phone number, e.g. +6511112222"
                    v-model="vModelPhoneNumber"
                    />
                </div>
        </div>
        <div class="row mt-4">
            <div class="col-12 ">
                <button type="button" class="btn btn-success" @click="saveChanges(data)">Save Changes</button>
            </div>
        </div>
    </form>
</div>
</template>

<script>
/* eslint-disable */ 
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'
import { PhoneNumberFormat, PhoneNumberUtil } from "google-libphonenumber";

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
  name: 'EditForm',
  props: {
      data: Object
  },
  components: {

  },
  data() {
      return {
         vModelFirstName: "",
         vModelLastName: "",
         vModelPhoneNumber: "",
         formatted: "",
      };
  },
  watch : {
     
  },
  created(){
      this.assignValues()
  },
  computed: {
    ...mapGetters({
    
    }),
  },
  methods: {
    ...mapActions({
        EDIT_CONTACT: "updateContactAction"
    }),
    async assignValues() {
      await this.$nextTick
      this.vModelFirstName = this.data.first_name
      this.vModelLastName = this.data.last_name
      this.vModelPhoneNumber = this.data.phone_number
    },
    moment: function () {
      return moment();
    },
    deleteContact(id){
        this.DELETE_CONTACT(id)
    },
    saveChanges(data){
        let number = formatInternationalPhoneNumber(this.vModelPhoneNumber);
        let payload = {
            id: data.id,
            first_name: this.vModelFirstName,
            last_name: this.vModelLastName,
            phone_number: number,
            created_at: new Date(),
        }
        this.EDIT_CONTACT(payload)
        this.$emit('reset')
        this.$emit("refresh");
    },
  },
}
</script>
<style scoped>

</style>
