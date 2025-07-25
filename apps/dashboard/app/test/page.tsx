import OrganisationForm from "./components/organisation";
import LocationForm from "./components/location";
import SubsidiaryForm from "./components/subsidiary";
import DivisionManagement from "./components/division";
import DesignationManagement from "./components/designation";
import DepartmentManagement from "./components/department";
import SubDepartmentManagement from "./components/subdepartment";
import GradeManagement from "./components/grades";
import SectionManagement from "./components/sections";
import NatureOfWorkManagement from "./components/natureofwork";
import WorkSkillManagement from "./components/workskill";   
import CategoryManagement from "./components/category";
import ShiftChangeForm from "./components/shiftchange";
import ShiftForm from "./components/shift";

export default function FormPage() {
    return (
        <><OrganisationForm /><LocationForm /><SubsidiaryForm />
        <DivisionManagement /><DesignationManagement /><DepartmentManagement />
            <SubDepartmentManagement /><GradeManagement /><SectionManagement/>
            <NatureOfWorkManagement/><WorkSkillManagement/><CategoryManagement/>
            <ShiftChangeForm/><ShiftForm/></>
    )
}