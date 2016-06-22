<?php
error_reporting(0);

defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . '/libraries/REST_Controller.php';

class api extends REST_Controller{

    public function __construct() {
                parent::__construct();
                $this->load->model('Api_model');
                // echo "<pre>";
                // print_r($_REQUEST); die;
                header('Content-Type: application/json; charset=utf-8');
    }    

    // Model API Start 
    // GET Model Data
   public function model_get($id_param = NULL){
        $success = FALSE;
        $message = "";
        $response_data = array();
        $resultQ = array();
        $request_data = $_REQUEST;
        $id = $this->uri->segment(3); 
        extract($request_data,EXTR_SKIP);
        if(isset($request_data['user_id'])){
            $user_id = $request_data['user_id'];  
        }else{
            $user_id = '';  
        }

        if(trim($user_id)!='')
        {
            if(trim($user_id)=='1')
            {
                if($id===NULL){
                    $id = $id_param;
                }else{
                    $id = $id;
                }
                    $data = $this->Api_model->read("Model","moID",$id);
                    if ($data)
                    {
                        $success = true;
                        $message = "Model list";
                        $response_data = $data;
                    }
                    else
                    {
                        $message = "No data found.";
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


    // Insert Model Data
    public function model_post(){ 
        $success = FALSE;
        $message = "";
        $response_data = array();
        $data = array();
        $request_data = $this->_post_args;
        //extract($request_data,EXTR_SKIP);

        if(isset($request_data['data'])){
            $array = $request_data['data'];     
            //$array = json_decode($string_data,true);
        }

        if(isset($request_data['user_id'])){
            $user_id = $request_data['user_id'];  
        }else{
            $user_id = '';  
        }

        if(trim($user_id)!='')
        {
            if(trim($user_id)=='1')
            {
                if(!empty($array))
                {   
                        if(isset($array['mo_name']) && $array['mo_name'] !=''&&isset($array['mo_desc']) && $array['mo_desc']!='')
                        {    
                            $success = true; 
                            $message = "Model Data Inserted successfully.";

                            $data['mo_name']=$array['mo_name'];
                            $data['mo_desc']=$array['mo_desc'];

                            foreach($array['mo_list'] as $moval){

                                if($moval['modelTitle']!=''&&$moval['modelShortName']!=''&&$moval['modelDescription']!=''&&$moval['modelMaxLength']!=''&&$moval['modelMinLength']!='') 
                                {   
                                    $mo['Title'] = $moval['modelTitle'];
                                    $mo['ShortName'] = $moval['modelShortName'];
                                    $mo['Description'] = $moval['modelDescription'];
                                    $mo['MaxLength'] = $moval['modelMaxLength'];
                                    $mo['MinLength'] = $moval['modelMinLength'];
                                    $data['mo_'.$moval['Id']] = implode('^',$mo);
                                }else{
                                    $data['mo_'.$moval['Id']] = '';
                                }    
                            }

                            $res = $this->Api_model->insert("Model",$data);
                            $moID = $this->db->insert_id(); 

                           //  // Get response After Insert data
                           // $res_ques = $this->Api_model->read("Model","moID",$moID);
                           // $response_data = $res_ques;
                        }
                        else
                        {
                            $message = "Please pass proper data to insert.";
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

       $return_data = array("success"=>$success,"message"=>$message);
       echo json_encode($return_data);
    }

    // Update Model Data
    public function model_put(){
        $success = FALSE;
        $message = "";
        $response_data = array();
        $data = array();
        //$request_data = $_REQUEST;
        $request_data = $this->_put_args;

        //extract($request_data,EXTR_SKIP);

        if(isset($request_data['data'])){
            $array = $request_data['data'];     
            //$array = json_decode($string_data,true);
        }

        if(isset($request_data['user_id'])){
            $user_id = $request_data['user_id'];  
        }else{
            $user_id = '';  
        }
        // $id = $this->uri->segment(3); 
        $id = $array['moID'];

        if(trim($user_id)!=''&&$id!='')
        {
            if(trim($user_id)=='1')
            {
                if(!empty($array))
                {   
                        if(isset($array['mo_name']) && $array['mo_name'] !=''&&isset($array['mo_desc']) && $array['mo_desc']!='')
                        {    
                            $data['mo_name']=$array['mo_name'];
                            $data['mo_desc']=$array['mo_desc'];
                            $where['moID']=$id;

                            $count_data = $this->Api_model->read("Model","moID",$id);
                            if($count_data){
                                $success = true;
                                $message = "Model data edit successfully.";

                                foreach($array['mo_list'] as $moval){

                                    if($moval['modelTitle']!=''&&$moval['modelShortName']!=''&&$moval['modelDescription']!=''&&$moval['modelMaxLength']!=''&&$moval['modelMinLength']!='') 
                                    {   
                                        $mo['Title'] = $moval['modelTitle'];
                                        $mo['ShortName'] = $moval['modelShortName'];
                                        $mo['Description'] = $moval['modelDescription'];
                                        $mo['MaxLength'] = $moval['modelMaxLength'];
                                        $mo['MinLength'] = $moval['modelMinLength'];
                                        $data['mo_'.$moval['Id']] = implode('^',$mo);
                                    }else{
                                        $data['mo_'.$moval['Id']] = '';
                                    }    
                                }

                                $res = $this->Api_model->update("Model",$data,$where);

                                // // Get response After Edit data
                                // $res_ques = $this->Api_model->read("Model","moID",$id);
                                // $response_data = $res_ques;

                            }else{
                                $message = 'No data found';
                            }

                        }
                        else
                        {
                            $message = "Please pass proper data to edit.";
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

        $return_data = array("success"=>$success,"message"=>$message);
        echo json_encode($return_data);
    }

    // Delete Model Data
    public function model_delete(){
        $success = FALSE;
        $message = "";
        $response_data = array();
        $request_data = $_REQUEST;
        extract($request_data,EXTR_SKIP);
        $id = $this->uri->segment(3); 
        if(isset($request_data['user_id'])){
            $user_id = $request_data['user_id'];  
        }else{
            $user_id = '';  
        }

        if(trim($user_id)!=''&&trim($id)!='')
        {
            if(trim($user_id)=='1')
            {
                $data = $this->Api_model->read("Model","moID",$id);
                if($data)
                {
                    $data = $this->Api_model->delete("Model","moID",$id);
                    $success = true;
                    $message = "Model data deleted successfully.";
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

    // Model API End


    // Canvas API Start 
    // GET Canvas Data
    public function canvas_get($id_param = NULL){
        $success = FALSE;
        $message = "";
        $response_data = array();
        $request_data = $_REQUEST;
        $id = $this->uri->segment(3); 
        extract($request_data,EXTR_SKIP);
        if(isset($request_data['user_id'])){
            $user_id = $request_data['user_id'];  
        }else{
            $user_id = '';  
        }

        if(trim($user_id)!='')
        {
            if(trim($user_id)=='1')
            {
                if($id===NULL){
                    $id = $id_param;
                }else{
                    $id = $id;
                }
                    $data = $this->Api_model->read("Canvas","caID",$id);
                    if ($data)
                    {
                        $success = true;
                        $message = "Canvas list";
                        $response_data = $data;
                    }
                    else
                    {
                        $message = "No data found.";
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

    // Insert Canvas Data
    public function canvas_post(){ 
        $success = FALSE;
        $message = "";
        $response_data = array();
        $data = array();

        $request_data = $this->_post_args;
        //extract($request_data,EXTR_SKIP);

        if(isset($request_data['data'])){
            $array = $request_data['data'];     
            //$array = json_decode($string_data,true);
        }

        if(isset($request_data['user_id'])){
            $user_id = $request_data['user_id'];  
        }else{
            $user_id = '';  
        }

        if(trim($user_id)!='')
        {
            if(trim($user_id)=='1')
            {
                if(!empty($array))
                {   
                        if(isset($array['ca_title']) && $array['ca_title'] !=''&&isset($array['ca_desc']) && $array['ca_desc']!='')
                        {    
                            $success = true; 
                            $message = "Canvas data Inserted successfully.";

                            $data['ca_user_id']=$user_id;
                            $data['ca_title']=$array['ca_title'];
                            $data['ca_desc']=$array['ca_desc'];
                            $data['ca_model']=$array['ca_model'];

                            $res = $this->Api_model->insert("Canvas",$data);
                            $caID = $this->db->insert_id(); 

                            foreach($array['Question'] as $qusval){

                                if($qusval['qu_short']!=''&&$qusval['qu_map']!=''&&$qusval['qu_quest']!=''&&$qusval['qu_desc']!='') 
                                {   
                                    $quData['qu_mcID'] = $caID;
                                    $quData['qu_map'] = $qusval['qu_map'];
                                    $quData['qu_short'] = $qusval['qu_short'];
                                    $quData['qu_quest'] = $qusval['qu_quest'];
                                    $quData['qu_desc'] = $qusval['qu_desc'];

                                    $res = $this->Api_model->insert("Question",$quData);
                                }
                            }

                            // // Get response After Insert data
                            // $res_ques = $this->Api_model->read("Canvas","caID",$moID);
                            // $response_data = $res_ques;
                        }
                        else
                        {
                            $message = "Please pass proper data to insert.";
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

       $return_data = array("success"=>$success,"message"=>$message,"caID"=>$caID);
       echo json_encode($return_data);
    }

    // Update Canvas Data
    public function canvas_put(){
        $success = FALSE;
        $message = "";
        $response_data = array();
        $data = array();
        $request_data = $_REQUEST;
        extract($request_data,EXTR_SKIP);
        $id = $this->uri->segment(3); 
        if(isset($_REQUEST['data'])){
            $string_data = $request_data['data'];     
            $array = json_decode($string_data,true);
        }

        if(isset($request_data['user_id'])){
            $user_id = $request_data['user_id'];  
        }else{
            $user_id = '';  
        }

        if(trim($user_id)!=''&&$id!='')
        {
            if(trim($user_id)=='1')
            {
                if(!empty($array))
                {   
                    foreach($array as $values)
                    {
                        if(isset($values['ca_title']) && $values['ca_title'] !=''&&isset($values['ca_desc']) && $values['ca_desc']!='')
                        {    
                            $data['ca_user_id']=$values['ca_user_id'];
                            $data['ca_title']=$values['ca_title'];
                            $data['ca_desc']=$values['ca_desc'];
                            $data['ca_model']=$values['ca_model'];
                            $where['caID']=$id;

                            $count_data = $this->Api_model->read("Canvas","caID",$id);
                            if($count_data){
                                $success = true;
                                $message = "Canvas data edit successfully.";
                                $res = $this->Api_model->update("Canvas",$data,$where);
                                $reID = $this->db->insert_id(); 

                                // Get response After Insert data
                                $res_ques = $this->Api_model->read("Canvas","caID",$id);
                                $response_data = $res_ques;

                            }else{
                                $message = 'No data found';
                            }

                            // Get response After Edit data
                            $res_ques = $this->Api_model->read("Canvas","caID",$id);
                            $response_data = $res_ques;
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

    // Delete Canvas Data
    public function canvas_delete(){
        $success = FALSE;
        $message = "";
        $response_data = array();
        $request_data = $_REQUEST;
        extract($request_data,EXTR_SKIP);
        $id = $this->uri->segment(3); 
        if(isset($request_data['user_id'])){
            $user_id = $request_data['user_id'];  
        }else{
            $user_id = '';  
        }

        if(trim($user_id)!=''&&trim($id)!='')
        {
            if(trim($user_id)=='1')
            {
                $data = $this->Api_model->read("Canvas","caID",$id);
                if($data)
                {
                    $data = $this->Api_model->delete("Canvas","caID",$id);
                    $success = true;
                    $message = "Canvas data deleted successfully.";
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

    // Canvas API End

    // User Response Edit
    public function userresponse_put(){ 
        $success = FALSE;
        $message = "";
        $response_data = array();
        $data = array();
        $request_data = $_REQUEST;
        extract($request_data,EXTR_SKIP);
        $id = $this->uri->segment(3); 
        $string_data = $request_data['data'];     
        $array = json_decode($string_data,true);
        if(isset($request_data['user_id'])){
            $user_id = $request_data['user_id'];  
        }else{
            $user_id = '';  
        }

        if(trim($user_id)!='')
        {
            if(trim($user_id)=='1')
            {
                if(!empty($array))
                {   
                    foreach($array as $values)
                    {
                        if(isset($values['re_maID']) && $values['re_maID'] !=''&& isset($values['re_quID']) && $values['re_quID'] !='' && isset($values['re_resp']) && $values['re_resp'] !='')
                        {    

                            $where['reID']=$id; 
                            $data['re_maID']=$values['re_maID'];
                            $data['re_quID']=$values['re_quID'];
                            $data['re_resp']=$values['re_resp'];

                            $count_data = $this->Api_model->read("UserRespone","reID",$id);
                            if($count_data){
                                $success = true; 
                                $res = $this->Api_model->update("UserRespone",$data,$where);
                                $reID = $this->db->insert_id(); 
                                $message = "User Response Edited successfully.";

                                // Get response After Insert data
                                $res_ques = $this->Api_model->read("UserRespone","reID",$id);
                                $response_data = $res_ques;

                            }else{
                                $message = 'No data found';
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

    // GET Question Data
    public function question_get($id_param = NULL){
        $success = FALSE;
        $message = "";
        $response_data = array();
        $request_data = $this->get();

        $id = $this->get('qu_mcID');  

        if(isset($request_data['user_id'])){
            $user_id = $request_data['user_id'];  
        }else{
            $user_id = '';  
        }

        if(trim($user_id)!='')
        {
            if(trim($user_id)=='1')
            {
                if($id===NULL){
                    $id = $id_param;
                }else{
                    $id = $id;
                }
                    $data = $this->Api_model->read("Question","qu_mcID",$id);
                    if ($data)
                    {
                        $success = true;
                        $message = "Question list";
                        $response_data = $data;
                    }
                    else
                    {
                        $message = "No data found.";
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

      // Get User Response
    public function userresponse_get($id_param = NULL){ 
        $success = FALSE;
        $message = "";
        $response_data = array();
        $request_data = $this->get();

        $id = $this->get('ucID');  

        if(isset($request_data['user_id'])){
            $user_id = $request_data['user_id'];  
        }else{
            $user_id = '';  
        }
        if(trim($user_id)!='')
        {
            if($id===NULL){
                $id = $id_param;
            }else{
                $id = $id;
            }

            if(trim($user_id)=='1')
            {
                    // Get response After Insert data
                    //$data = $this->Api_model->read("UserRespone","re_maID",'1');
                    $data = $this->Api_model->question_answer_byId($id);
                    if($data){
                        $success = TRUE;
                        $message = 'User question and response';
                        $response_data = $data;
                    }else{
                        $message = 'No data found';
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

    // User Response Insert
    public function userresponse_post(){ 
        $success = FALSE;
        $message = "";
        $response_data = array();
        $data = array();
        $request_data = $this->_post_args;

        if(isset($request_data['data'])){
            $array = $request_data['data'];     
        }

        if(isset($request_data['user_id'])){
            $user_id = $request_data['user_id'];  
        }else{
            $user_id = '';  
        }

        if(trim($user_id)!='')
        {
            if(trim($user_id)=='1')
            {
                if(!empty($array))
                {   
                        if(isset($array['title']) && $array['title'] !='')
                        {    
                            $success = true; 
                            $message = "User Response Inserted successfully.";

                            $data_canvas['uc_user_id']=$user_id;
                            $data_canvas['uc_title']=$array['title'];
                            $data_canvas['uc_mcID']=$array['uc_mcID'];

                            $Canvasres = $this->Api_model->insert("UserCanvas",$data_canvas);
                            $ucID = $this->db->insert_id(); 

                            $data['ur_mcID']=$ucID;
                            foreach ($array['answers'] as $ansvalue) {
                                $data['ur_quID']=$ansvalue['re_quID'];
                                $data['re_resp']=$ansvalue['re_resp'];

                            $res = $this->Api_model->insert("UserResponse",$data);
                            }
                        }
                        else
                        {
                            $message = "Please pass proper data to insert.";
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

       $return_data = array("success"=>$success,"message"=>$message,"ucID"=>$ucID);
       echo json_encode($return_data);
    }

}