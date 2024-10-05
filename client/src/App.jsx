
import Navbar from "./component/Navbar/Navbar"; 
import Home from "./page/Home/Home";
import Header from "./component/Header/Header";
import Sidebar from "./component/Sidebar/Sidebar";
import Personal from "./page/Personnal/Personal";
import { useState } from "react";
import Employee from "./page/Employee/Employee";
import EmployeeDetail from "./page/Employee/Detail/EmployeeDetail"; 
import "./index.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from "react";
import Login from "./page/Login/Login";
import Insert from "./page/Employee/Insert/insert";
import EmployeeType from "./page/Employee/Type/EmployeeType";
import Branch from "./page/Branch/Branch";
import Department from "./page/Department/Department";
import EmployeeTitle from "./page/Employee/Tilte/EmployeeTitle";
import EmployeeLevel from "./page/Employee/Level/EmployeeLevel";
import EmployeeGroup from "./page/Employee/Group/EmployeeGroup";
import EmployeeHealthInsurance from "./page/Employee/HealthInsurance/EmployeeHealthInsurance";
import TrainningNewEmployee from "./page/EmployeeLifeCycle/TrainningNewEmployee/TrainningNewEmployee";
import EmployeeSkillMap from "./page/EmployeeLifeCycle/EmployeeSkillMap/EmployeeSkillMap";
import EmployeePromotion from "./page/EmployeeLifeCycle/EmployeePromotion/EmployeePromotion";
import EmployeeTransfer from "./page/EmployeeLifeCycle/EmployeeTransfer/EmployeeTransfer";
import TypeOfTalent from "./page/EmployeeLifeCycle/Type_of_Talent/Type_of_Talent";
import Talents from "./page/EmployeeLifeCycle/Talents/Talents";
import EmployeeSeparation from "./page/EmployeeLifeCycle/EmployeeSeparation/EmployeeSeparation";
import TrainningNewEmployeePrototype from "./page/EmployeeLifeCycle/TrainningNewEmployeePrototype/TrainningNewEmployeePrototype";
import EmployeeSeparationPrototype from "./page/EmployeeLifeCycle/EmployeeSeparationPrototype/EmployeeSeparationPrototype";

import { useParams } from 'react-router-dom';
const App = () => {
  const location = useLocation();
  const isEmployeeRoute = location.pathname === '/app/employee';
  const isEmployeeType = location.pathname === '/app/employee_type';
  const isBranch = location.pathname === '/app/branch';
  const isDepartment = location.pathname === '/app/departments';
  const isEmployeeTitle = location.pathname === '/app/employee_title';
  const isEmployeeLevel = location.pathname === '/app/employee_level';
  const isEmployeeGroup = location.pathname === '/app/employee_group';
  const isEmployeeHealthInsurance = location.pathname === '/app/employee_HealthInsurance';
  const isTrainningNewEmployee = location.pathname === "/app/trainning_new_employee" ;
  const isEmployeeSkillMap = location.pathname === "/app/employee_skill_map" ;
  const isEmployeePromotion = location.pathname === "/app/employee_promotion";
  const isEmployeeTransfer = location.pathname ===  "/app/employee_transfer";
  const isTypeOfTalent = location.pathname ===  "/app/type_of_talent";
  const isTalents = location.pathname === "/app/talents";
  const isEmployeeSeparation = location.pathname === "/app/employee_separation" ;
  const isTrainningNewEmployeePrototype = location.pathname === "/app/trainning_new_employee_prototype";
  const isEmployeeSeparationPrototype = location.pathname === "/app/employee_separation_prototype";
  const isEmployeeDetailRoute = location.pathname.startsWith('/employee/');
  const [menu, setMenu] = useState("Trang Chủ");
  const [click, setClick] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [path, setPath] = useState("/");
  const [clickLink, setClickLink] = useState(false);
  const [pathshortcut, setPathshortcut] = useState("/");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDialogInsertOpen, setIsDialogInsertOpen] = useState(false);

  const handleToggleDialog = () => {
    setIsDialogInsertOpen(!isDialogInsertOpen);
  };

  const handleHeaderClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {}, [isSidebarOpen]);
  // useEffect(() => {
  //   if (isLoginOpen) {
  //     document.body.classList.add('login-open');
  //   } else {
  //     document.body.classList.remove('login-open');
  //   }
  // }, [isLoginOpen]);

  
  return (
    <>
    <ToastContainer />
      {isDialogInsertOpen && (
        <Insert setIsDialogInsertOpen={setIsDialogInsertOpen} />
      )}
     
      <div id="main" className={isLoginOpen ? 'blur' : ''}>
          <Navbar  pathshortcut={pathshortcut} setPathshortcut={setPathshortcut} menu={menu} setMenu={setMenu} path={path} setPath={setPath} clickLink={clickLink} setClickLink={setClickLink} />
        <div id="main">
          <div className="app">
            {!isTrainningNewEmployee && !isEmployeeSkillMap && !isEmployeePromotion && !isEmployeeTransfer && !isTypeOfTalent && !isTalents && !isEmployeeSeparation && !isTrainningNewEmployeePrototype && !isEmployeeSeparationPrototype &&  !isEmployeeHealthInsurance && !isEmployeeGroup && !isEmployeeLevel && !isEmployeeTitle && !isDepartment && !isBranch && !isEmployeeType &&!isEmployeeRoute && !isEmployeeDetailRoute && (
              <Header   isDialogInsertOpen={isDialogInsertOpen} className="a"  menu={menu} setMenu={setMenu} onHeaderClick={handleHeaderClick} 
              />
            )}
            <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
              {!isTrainningNewEmployee && !isEmployeeSkillMap && !isEmployeePromotion && !isEmployeeTransfer && !isTypeOfTalent && !isTalents && !isEmployeeSeparation && !isTrainningNewEmployeePrototype && !isEmployeeSeparationPrototype &&  !isEmployeeHealthInsurance && !isEmployeeGroup && !isEmployeeLevel && !isEmployeeTitle && !isDepartment && !isBranch && !isEmployeeType && !isEmployeeRoute && !isEmployeeDetailRoute && isSidebarOpen && (
                <Sidebar  menu={menu} setMenu={setMenu} click={click}setClick={setClick} path={path}setPath={setPath}/>
              )}
              <div className="content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route  path="/employee"  element={ <Personal  pathshortcut={pathshortcut} setPathshortcut={setPathshortcut} clickLink={clickLink}setClickLink={setClickLink} click={click} setClick={setClick} /> } />
                  <Route path="/app/employee"  element={ <Employee toggleDialog={handleToggleDialog}clickLink={clickLink} setClickLink={setClickLink} open={isSidebarOpen} setOpen={setIsSidebarOpen}onHeaderClick={handleHeaderClick} /> } />
                  <Route path="/employee/:id" element={<EmployeeDetail />} />
                  <Route path="/app/employee_type" element={<EmployeeType />} />
                  <Route path="/app/branch" element={<Branch />} />
                  <Route path="/app/departments" element={<Department/>} />
                  <Route path="/app/employee_title" element={<EmployeeTitle/>} />
                  <Route path="/app/employee_level" element={<EmployeeLevel/>} />
                  <Route path="/app/employee_group" element={<EmployeeGroup/>} />
                  <Route path="/app/employee_HealthInsurance" element={<EmployeeHealthInsurance/>} />
                  <Route path="/app/trainning_new_employee" element={<TrainningNewEmployee/>} />
                  <Route path="/app/employee_skill_map" element={<EmployeeSkillMap/>} />
                  <Route path="/app/employee_promotion" element={<EmployeePromotion/>} />
                  <Route path="/app/employee_transfer" element={<EmployeeTransfer/>} />
                  <Route path="/app/type_of_talent" element={<TypeOfTalent/>} />
                  <Route path="/app/talents" element={<Talents/>} />
                  <Route path="/app/employee_separation" element={<EmployeeSeparation/>} />
                  <Route path="/app/trainning_new_employee_prototype" element={<TrainningNewEmployeePrototype/>} />
                  <Route path="/app/employee_separation_prototype" element={<EmployeeSeparationPrototype/>} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

