import React, { Component } from 'react';
import EditForm from './editForm';
import ExerciseTable from './exerciseTable';  
import {Button, Input , Col, Row} from 'antd';

class trainingPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planName: "",
      exercise: "",
      sets: 0,
      reps: 0,
      list: [],
      editId: null,
      editMode: false
    };
  }

passTrainingPlan = (list) =>{
  const trainingPlan = list;
  const trainingPlanName = this.state.planName;

  this.props.callbackFromParent(trainingPlanName,trainingPlan);
}

myCallback = (updatedList) =>{
  if(updatedList){
    this.setState({ 
      list: updatedList,
      editId: null,
      editMode: false,
    });
  }
}

setEditMode = (id) =>{
  this.setState({ 
    editMode: true,
    editId: id 
  });
}

handleChange = ({ target }) =>{
  //update react state 
  this.setState({ [target.name]: target.value });
};

addItem() {
  //Create new item with uniqe id
  const newItem = {
    id: 1 + Math.floor(Math.random() * 101 + 0),
    exercise: this.state.exercise,
    sets: this.state.sets,
    reps: this.state.reps
  }
  //Copy of current list of items
  const list = [...this.state.list]

  //add new item to list
  list.push(newItem);

  //update state with new list and reset newItem input 
  this.setState({
    list,
    exercise: "",
    sets: 0,
    reps: 0,

  });
}

//react self invoke function 
componentWillMount(){
  if(this.props.stateEdit === true){
    const plan = this.props.list[0].trainingPlan;
    const planName = this.props.list[0].trainingPlanName
    this.setState({
      list: plan,
      planName: planName,
    });
  }
    
}
  render() { 
    return (
      
        <React.Fragment>
        {
          this.state.editMode === false ? 
            <div className="container">
              <div className="training-plan" >
                  <Row > 
                    <Col span={12} className="plan-element" >
                      <Input
                        type="text"
                        name="planName"
                        placeholder="Nazwa planu..."
                        defaultValue={this.state.planName}
                        value={this.state.planName}
                        onChange={this.handleChange}
                      />
                    </Col>
                    <Col span={3} className="plan-element">
                      <Button onClick={() => {this.passTrainingPlan(this.state.list)}}>
                        Zapisz plan
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="plan-element">
                      <Input
                        type="text"
                        name="exercise"
                        placeholder="Wpisz nazwę ćwiczenia..."
                        value={this.state.exercise}
                        onChange={this.handleChange}
                      />
                      <span>Ilość serii:</span>
                      <Input
                        type="number"
                        name="sets"
                        min="1"
                        value={this.state.sets}
                        onChange={this.handleChange}
                      />
                      <span>Ilość powtórzeń:</span>
                      <Input
                        type="number"
                        name="reps"
                        min="1"
                        value={this.state.reps}
                        onChange={this.handleChange}
                      />
                      <Button onClick={() => this.addItem()}>
                        Dodaj
                      </Button>
                    </Col>
                  </Row>
              </div>
              <div className="training-table" >
                <ExerciseTable
                  list={this.state.list}
                  delete={this.props.deleteItem}
                  edit={this.setEditMode}
                />
              </div>    
          </div>            
          :
          
            <EditForm 
              id={this.state.editId}
              list={this.state.list}
              callbackFromParent={this.myCallback}>
            </EditForm>
          
        }
      </React.Fragment>
      
    );
  }
}



export default trainingPlan;


          
        
        