import React from 'react';

import ToDoList from './components/toDoList';
import TrainingPlan from './components/trainingPlan';
import TrainingPlanList from './components/trainingPlanList';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu } from 'antd';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const { Sider, Content } = Layout;


//import { render } from '@testing-library/react';

function App() {
  
    
    return (
      <Router>
      <div className="app">
      <Layout style={{ minHeight: '100vh' }}>
       <Sider>
         <Menu theme="dark">
           <Menu.Item key="1"> 
              <Link to="/toDoList">Rzeczy do zrobienia</Link>
           </Menu.Item>
           <Menu.Item key="2" >
              <Link to="/trainingPlanList">Plany treningowe</Link>
           </Menu.Item>
         </Menu>
       </Sider>
        <Content>
          <Switch>
            <Route path="/toDoList">
              <ToDoList />
            </Route>
            <Route path="/trainingPlanList">
              <TrainingPlanList />
            </Route>
          </Switch>
        </Content>
        </Layout>
        
      
           
      </div>
      </Router> 
    );
   }

export default App;

      
