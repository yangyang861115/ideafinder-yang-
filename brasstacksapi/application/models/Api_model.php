<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Api_model extends CI_Model{
    public function read($tablename,$fieldname,$id){
        if($id===NULL){
           $replace = "" ;
        }
        else{
            $replace = "=$id";
        }
        $query = $this->db->query("select * from $tablename where $fieldname".$replace);
        return $query->result_array();
    }
    public function insert($tablename,$data){
        $this->db->insert($tablename, $data);
        return TRUE;
    }
    public function delete($tablename,$fieldname,$id){
        $query = $this->db->query("delete from $tablename where $fieldname=$id");
        return TRUE;
        }

    public function update($table,$data,$where)
    {
        $res = $this->db->update($table, $data, $where);
        return $res;
    }

    public function question_answer_byId($id)
    {
        // if($id==''){
        //     $query = $this->db->query("select a.*,b.qu_quest,c.uc_title,c.uc_user_id from UserResponse a,Question b,UserCanvas c where a.ur_quID=b.quID and a.ur_mcID = c.ucID order by a.urID");
        // } else {
        //     $query = $this->db->query("select a.*,b.qu_quest,c.uc_title,c.uc_user_id from UserResponse a,Question b,UserCanvas c where a.ucID = '$id' and a.ur_quID=b.quID and a.ur_mcID = c.ucID order by a.urID");
        // }    
        // return $query->result_array();

        $response_data = $result = array();

        if($id==''){
            $query = $this->db->query("select * from UserCanvas");
        } else {
            $query = $this->db->query("select * from UserCanvas where ucID='$id'");
        }    

        $row =  $query->result_array();
        foreach ($row as $value) {
            $ucID =  $value['ucID'];
            $response_data['ucID'] = $value['ucID'];
            $response_data['title'] = $value['uc_title'];
            $response_data['desc'] = $value['uc_desc'];
            $response_data['pdf_report_url'] = $value['pdf_report_url'];

            $query_res = $this->db->query("select a.*,b.qu_quest,b.qu_short,b.qu_desc,b.qu_max,b.qu_min from UserResponse a,Question b where a.ur_quID=b.quID and a.ur_mcID = '$ucID' order by a.urID");
            $row_res =  $query_res->result_array();
            $response_data['Question'] = $row_res;

            array_push($result, $response_data);
        }
        return $result;
    }    

    public function all_question_answer($id)
    {
        $query = $this->db->query("select a.*,b.qu_short,b.qu_map,c.uc_title,c.uc_date,c.uc_user_id from UserResponse a,Question b,UserCanvas c where ur_mcID='$id' and a.ur_quID=b.quID and a.ur_mcID = c.ucID order by a.urID");

        return $query->result_array();
    }

}
