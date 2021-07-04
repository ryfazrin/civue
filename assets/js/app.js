Vue.component('modal',{ //modal
    template:`
      <transition
                enter-active-class="animated rollIn"
                     leave-active-class="animated rollOut">
    <div class="modal is-active" >
  <div class="modal-card border border border-secondary">
    <div class="modal-card-head text-center bg-dark">
    <div class="modal-card-title text-white">
          <slot name="head"></slot>
    </div>
<button class="delete" @click="$emit('close')"></button>
    </div>
    <div class="modal-card-body">
         <slot name="body"></slot>
    </div>
    <div class="modal-card-foot" >
      <slot name="foot"></slot>
    </div>
  </div>
</div>
</transition>
    `
})
var v = new Vue({
   el:'#app',
    data:{
        url:'http://localhost/civue/',
        addModal: false,
        editModal:false,
        deleteModal:false,
        biodata:[],
        search: {text: ''},
        emptyResult:false,
        newbiodata:{
            nama:'',
            alamat:'',
            nohp:''},
        pilihbiodata:{},
        formValidate:[],
        successMSG:'',
        
        //pagination
        currentPage: 0,
        rowCountPage:5,
        totalbiodata:0,
        pageRange:2
    },
     created(){
      this.tampil(); 
    },
    methods:{
         tampil(){ axios.get(this.url+"crud/tampil").then(function(response){
                 if(response.data.biodata == null){
                     v.noResult()
                    }else{
                        v.getData(response.data.biodata);
                    }
            })
        },
          caribiodata(){
            var formData = v.formData(v.search);
              axios.post(this.url+"crud/caribiodata", formData).then(function(response){
                  if(response.data.biodata == null){
                      v.noResult()
                    }else{
                      v.getData(response.data.biodata);
                    
                    }  
            })
        },
          tambah(){   
            var formData = v.formData(v.newbiodata);
              axios.post(this.url+"crud/tambahbiodata", formData).then(function(response){
                if(response.data.error){
                    v.formValidate = response.data.msg;
                }else{
                    v.successMSG = response.data.msg;
                    v.clearAll();
                    v.clearMSG();
                }
               })
        },
        updatebiodata(){
            var formData = v.formData(v.pilihbiodata); axios.post(this.url+"crud/updatebiodata", formData).then(function(response){
                if(response.data.error){
                    v.formValidate = response.data.msg;
                }else{
                      v.successMSG = response.data.success;
                    v.clearAll();
                    v.clearMSG();
                
                }
            })
        },
        deletebiodata(){
             var formData = v.formData(v.pilihbiodata);
              axios.post(this.url+"crud/deletebiodata", formData).then(function(response){
                if(!response.data.error){
                     v.successMSG = response.data.success;
                    v.clearAll();
                    v.clearMSG();
                }
            })
        },
         formData(obj){
      var formData = new FormData();
          for ( var key in obj ) {
              formData.append(key, obj[key]);
          } 
          return formData;
    },
        getData(biodata){
            v.emptyResult = false; // become false if has a record
            v.totalBiodata = biodata.length //get total of user
            v.biodata = biodata.slice(v.currentPage * v.rowCountPage, (v.currentPage * v.rowCountPage) + v.rowCountPage); //slice the result for pagination
            
             // if the record is empty, go back a page
            if(v.biodata.length == 0 && v.currentPage > 0){ 
            v.pageUpdate(v.currentPage - 1)
            v.clearAll();  
            }
        },
            
        selectbiodata(crud){
            v.pilihbiodata = crud; 
        },
        clearMSG(){
            setTimeout(function(){
       v.successMSG=''
       },3000); // disappearing message success in 2 sec
        },
        clearAll(){
            v.newbiodata = { 
            nama:'',
            alamat:'',
            nohp:''};
            v.formValidate = false;
            v.addModal= false;
            v.editModal=false;
            v.deleteModal=false;
            v.refresh()
            
        },
        noResult(){
          
               v.emptyResult = true;  // become true if the record is empty, print 'No Record Found'
                      v.biodata = null 
                     v.biodata = 0 //remove current page if is empty
            
        },

      
        pageUpdate(pageNumber){
              v.currentPage = pageNumber; //receive currentPage number came from pagination template
                v.refresh()  
        },
        refresh(){
             v.search.text ? v.caribiodata() : v.tampil(); //for preventing
            
        }
    }
})