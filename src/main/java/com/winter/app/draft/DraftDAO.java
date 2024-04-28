package com.winter.app.draft;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.winter.app.employee.DepartmentVO;
import com.winter.app.employee.EmployeeVO;
import com.winter.app.util.pagination.Pagination;



@Mapper
public interface DraftDAO {
	
	List<Map<String, Object>> getBasisDraft() throws Exception;
	List<DepartmentVO> getDepartmentList()throws Exception;
	DraftVO getDraftMaxDocNum()throws Exception;
	Map<String, Object> getEmployeeDetail(EmployeeVO employeeVO) throws Exception;
	List<DepartmentVO> getDepartmentHighList() throws Exception;
	int setApprovalLine(ApprovalLineVO approvalLineVO)throws Exception;
	EmployeeVO getCEO()throws Exception;
	ApprovalLineVO getApprovalMaxNum() throws Exception;
	List<Map<String, Object>> getApprovalList(ApprovalLineVO approvalLineVO) throws Exception;
	int setAPList(APListVO apListVO)throws Exception;
	List<APListVO> getAPList(APListVO apListVO)throws Exception;
	List<ApprovalLineVO> getALDetail(ApprovalLineVO approvalLineVO)throws Exception;
	int setBasisDraft(DraftVO draftVO)throws Exception;
	int setSignCheck(SignCheckVO signCheckVO)throws Exception;
	int setRef(ReferencesVO referencesVO)throws Exception;
	////////////
	List<Map<String, Object>> getMyDraftList(Map<String, Object> map)throws Exception;
	Long getTotalCount(EmployeeVO employeeVO)throws Exception;
	
	int setDraftFile(DraftFileVO draftFileVO)throws Exception;
	
	
}
