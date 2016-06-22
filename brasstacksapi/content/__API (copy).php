<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class API extends REST_Controller{

    public function __construct() {
                parent::__construct();
                $this->load->model('Api_model');
                // echo "<pre>";
                // print_r($_REQUEST); die;
                header('Content-Type: application/json; charset=utf-8');
    }    

    // GET Data

    public function data_get($id_param = NULL){
        echo "get"; die;
        $success = FALSE;
        $message = "";
        $response_data = array();
        $resultQ = array();
        $request_data = $_REQUEST;
        $id = $this->input->get('mqID');
        $user_id = $request_data['user_id'];  

        extract($request_data,EXTR_SKIP);

        if(trim($user_id)!='')
        {
            if(trim($user_id)=='1')
            {
                if($id===NULL){
                    $id = $id_param;
                }else{
                    $id = $id;
                }
                    $data = $this->Api_model->read("MasterQuestionnaires","mqID",$id);
                    if ($data)
                    {
                        $success = true;
                        $message = "Questionnaires list with questions";
                        $response_data = $data;
                        //$this->response($data, REST_Controller::HTTP_OK); 

                        // get all questions for Questionnaires     
                        $i=0;
                        foreach ($response_data as $res_value) {
                            $mqID = $res_value['mqID']; 
                            $data = $this->Api_model->read("Question","qu_mqID",$mqID);
                            //echo $this->db->last_query(); die;
                            if($data)
                            { 
                                $response_data[$i]['Question'] = $data;
                              
                            }else{
                                $response_data[$i]['Question'] = array();
                            }
                            $i++;
                        }
                    }
                    else
                    {
                        $message = "No data found.";
                        // $this->response([
                        //     'status' => FALSE,
                        //     'error' => 'No books were found'
                        // ], REST_Controller::HTTP_NOT_FOUND); 
                    }
                
            }
            else
            {
                    $message = "Signing Failed";
            }    
        }
        else
        {
                $message = "Please enter all parameters.";
        }    
        $return_data = array("success"=>$success,"message"=>$message,"response_data"=>$response_data);
        echo json_encode($return_data);

    }

    // Insert Data
    public function data_post(){ 
//        echo "post"; die;
        $success = FALSE;
        $message = "";
        $response_data = array();
        $resultQ = array();
        $data = array();
        $request_data = $_REQUEST;
        extract($request_data,EXTR_SKIP);
        $user_id = $request_data['user_id'];  
        $string_data = $request_data['data'];     
        $array = json_decode($string_data,true);

        if(trim($user_id)!='')
        {
            if(trim($user_id)=='1')
            {
                if(!empty($array))
                {   
                    foreach($array as $values)
                    {
                        if($values['Mq_canvas_title']!=''&&$values['Mq_canvas_desc']!='')
                        {    
                            $success = true; 
                            $message = "Data Inserted successfully.";

                            $data['Mq_canvas_title']=$values['Mq_canvas_title'];
                            $data['Mq_canvas_desc']=$values['Mq_canvas_desc'];
                            $res = $this->Api_model->insert("MasterQuestionnaires",$data);
                            $mqID = $this->db->insert_id(); 
                             if(!empty($values['Question']))
                             {
                                foreach ($values['Question'] as $Qvalue) {

                                    $Qdata['qu_mqID']=$mqID;
                                    $Qdata['qu_short']=$Qvalue['qu_short'];
                                    $Qdata['qu_quest']=$Qvalue['qu_quest'];
                                    $Qdata['qu_desc']=$Qvalue['qu_desc'];
                                    $Qdata['qu_max']=$Qvalue['qu_max'];
                                    $Qdata['qu_min']=$Qvalue['qu_min'];
                                    $res = $this->Api_model->insert("Question",$Qdata);
                                }
                             }  

                                // Get response After Insert data
                               $res_ques = $this->Api_model->read("MasterQuestionnaires","mqID",$mqID);

                                $response_data = $res_ques;
                                    $i=0;
                                    foreach ($response_data as $res_value) {
                                        $mqID = $res_value['mqID']; 
                                        $data = $this->Api_model->read("Question","qu_mqID",$mqID);
                                        if($data)
                                        { 
                                            $response_data[$i]['Question'] = $data;
                                          
                                        }else{
                                            $response_data[$i]['Question'] = array();
                                        }
                                        $i++;
                                    }

                        }
                        else
                        {
                            $message = "Please pass proper data to insert.";
                        }      
                    } 
                }
                else
                {
                        $message = "Please enter all parameters.";
                }       

            }
            else
            {
                    $message = "Signing Failed";
            }    
        }
        else
        {
                $message = "Please enter all parameters.";
        }    

        $return_data = array("success"=>$success,"message"=>$message,"response_data"=>$response_data);
        echo json_encode($return_data);
    }

    // Update Data
    public function data_put(){
        $success = FALSE;
        $message = "";
        $response_data = array();
        $resultQ = array();
        $data = array();
        $request_data = $_REQUEST;
        extract($request_data,EXTR_SKIP);
        $id = $this->uri->segment(3); 
        $user_id = $request_data['user_id'];  
        $string_data = $request_data['data'];     
        $array = json_decode($string_data,true);
        if(trim($user_id)!='')
        {
            if(trim($user_id)=='1')
            {
                if(!empty($array))
                {   
                    foreach($array as $values)
                    {
                        if($values['Mq_canvas_title']!=''&&$values['Mq_canvas_desc']!='')
                        {    
                            $success = true;
                            $message = "Questionnaires data edit successfully.";

                            $data['Mq_canvas_title']=$values['Mq_canvas_title'];
                            $data['Mq_canvas_desc']=$values['Mq_canvas_desc'];
                            $where['mqID']=$id;
                            $res = $this->Api_model->update("MasterQuestionnaires",$data,$where);
                             if(!empty($values['Question']))
                             {
                                foreach ($values['Question'] as $Qvalue) {
                                    
                                    $Qdata['qu_short']=$Qvalue['qu_short'];
                                    $Qdata['qu_quest']=$Qvalue['qu_quest'];
                                    $Qwhere['quID']=$Qvalue['quID'];
                                    $Qdata['qu_desc']=$Qvalue['qu_desc'];
                                    $Qdata['qu_max']=$Qvalue['qu_max'];
                                    $Qdata['qu_min']=$Qvalue['qu_min'];
                                  

                                    $res = $this->Api_model->update("Question",$Qdata,$Qwhere);
                                }
                             }  

                                // Get response After Edit data
                               $res_ques = $this->Api_model->read("MasterQuestionnaires","mqID",$id);

                                $response_data = $res_ques;
                                    $i=0;
                                    foreach ($response_data as $res_value) {
                                        $mqID = $res_value['mqID']; 
                                        $data = $this->Api_model->read("Question","qu_mqID",$mqID);
                                        if($data)
                                        { 
                                            $response_data[$i]['Question'] = $data;
                                          
                                        }else{
                                            $response_data[$i]['Question'] = array();
                                        }
                                        $i++;
                                    }

                        }
                        else
                        {
                            $message = "Please pass proper data to edit.";
                        }      
                    } 
                }
                else
                {
                        $message = "Please enter all parameters.";
                }       

            }
            else
            {
                    $message = "Signing Failed";
            }    
        }
        else
        {
                $message = "Please enter all parameters.";
        }    

        $return_data = array("success"=>$success,"message"=>$message,"response_data"=>$response_data);
        echo json_encode($return_data);
    }

    // Delete Data
    public function data_delete(){
        $success = FALSE;
        $message = "";
        $response_data = array();
        $resultQ = array();
        $request_data = $_REQUEST;
        extract($request_data,EXTR_SKIP);
        $id = $this->uri->segment(3); 
        $user_id = $request_data['user_id'];  

        if(trim($user_id)!=''&&trim($id)!='')
        {
            if(trim($user_id)=='1')
            {
                $data = $this->Api_model->read("MasterQuestionnaires","mqID",$id);
                if($data)
                {
                    $data = $this->Api_model->delete("MasterQuestionnaires","mqID",$id);
                    $success = true;
                    $message = "Questionnaires data deleted successfully.";
                }else{
                    $message = "No data found for delete.";
                }
            }
            else
            {
                    $message = "Signing Failed";
            }    
        }
        else
        {
                $message = "Please enter all parameters.";
        }    
        $return_data = array("success"=>$success,"message"=>$message);
        echo json_encode($return_data);
    }
}