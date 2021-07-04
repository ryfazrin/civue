<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Crud extends MX_Controller {
	public $data;
	function __construct()
	{
		parent::__construct();
		$this->load->model('Crud_m');
		
	}

	public function index()
	{
		$this->data['halaman']='vcrud';
		$this->load->view('_main',$this->data);
	}
	public function tampil()
	{
		   $query=  $this->Crud_m->tampil();
             if($query){
		
                   $result['biodata']  = $this->Crud_m->tampil();
             
          }
        echo json_encode($result);
	}
	 public function caribiodata(){
         $value = $this->input->post('text');
          $query =  $this->Crud_m->caribiodata($value);
           if($query){
               $result['biodata']= $query;
           }
           
        echo json_encode($result);
         
    }
	public function tambahbiodata(){
		$config = array(
        array('field' => 'nama',
              'label' => 'nama',
              'rules' => 'trim|required'
             ),
             array('field' => 'alamat',
              'label' => 'alamat',
              'rules' => 'trim|required'
             ),
             array('field' => 'nohp',
              'label' => 'nohp',
              'rules' => 'required'
             )
);
$this->form_validation->set_rules($config);
        if ($this->form_validation->run() == FALSE) {
            $result['error'] = true;
            $result['msg'] = array(
                'nama'=>form_error('nama'),
                'alamat'=>form_error('alamat'),
                'nohp'=>form_error('nohp')
            );
            
        }else{
                $data = array(
                'nama'=> $this->input->post('nama'),
                'alamat'=> $this->input->post('alamat'),
                'nohp'=> $this->input->post('nohp')
                
            );
            if($this->Crud_m->tambahbiodata($data)){
               $result['error'] = false;
                $result['msg'] ='Biodata berhasil Ditambahkan';
            }
            
        }
        echo json_encode($result);
    }
 public function updatebiodata(){    
         $config = array(
        array('field' => 'nama',
              'label' => 'Nama',
              'rules' => 'trim|required'
             ),
             array('field' => 'alamat',
              'label' => 'Alamat',
              'rules' => 'trim|required'
             ),
             array('field' => 'nohp',
              'label' => 'No Hp',
              'rules' => 'required'
             )
);
$this->form_validation->set_rules($config);
        if ($this->form_validation->run() == FALSE) {
            $result['error'] = true;
            $result['msg'] = array(
                 'nama'=>form_error('nama'),
                'alamat'=>form_error('alamat'),
                'nohp'=>form_error('nohp')
            );
            
        }else{
          $id = $this->input->post('id');
          $data = array(
                   'nama'=> $this->input->post('nama'),
                'alamat'=> $this->input->post('alamat'),
                'nohp'=> $this->input->post('nohp')
            );
                if($this->Crud_m->updatebiodata($id,$data)){
                    $result['error'] = false;
                    $result['success'] = 'Biodata berhasil di update';
                }
       
    }
          echo json_encode($result);
     }
      public function deletebiodata(){
         $id = $this->input->post('id');
        if($this->Crud_m->deletebiodata($id)){
             $msg['error'] = false;
            $msg['success'] = 'Biodata Berhasi di hapus';
        }else{
             $msg['error'] = true;
        }
        echo json_encode($msg);
         
    }
}

/* End of file crud.php */
/* Location: ./application/controllers/crud.php */