import React, { Component } from 'react';
import EditForm from './editForm';

//import { render } from '@testing-library/react';

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
  this.setState({ 
    list: updatedList,
    editId: null,
    editMode: false,
});
}

setEditMode = (id) =>{
  this.setState({ 
    editMode: true,
    editId: id 
  });
}

deleteItem = (id) =>{
  //copy current list of items
  const list = [...this.state.list];

  //filter out item being deleted
  const updatedList = list.filter(item => item.id !== id)

  this.setState({ 
    list: updatedList 
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
          <div className="training-plan">
          <input
            type="text"
            name="planName"
            placeholder="Nazwa planu..."
            defaultValue={this.state.planName}
            value={this.state.planName}
            onChange={this.handleChange}
            
          />
          <button onClick={() => {this.passTrainingPlan(this.state.list)}}>
          Zapisz plan
          </button>
          <br />
  
          <input
            type="text"
            name="exercise"
            placeholder="Wpisz nazwę ćwiczenia..."
            value={this.state.exercise}
            onChange={this.handleChange}
          />
          Ilość serii:
          <input
            type="number"
            name="sets"
            min="1"
            value={this.state.sets}
            onChange={this.handleChange}
          />
          Ilość powtórzeń:
          <input
            type="number"
            name="reps"
            min="1"
            value={this.state.reps}
            onChange={this.handleChange}
          />
          <button onClick={() => this.addItem()}>
            Dodaj
          </button>
          <ol>
            {this.state.list.map(item => {
              return (
                <li key={item.id}>
                  Ćwiczenie:{item.exercise}<br />
                    Ilość seii:{item.sets}<br />
                    Ilość Powtórzeń:{item.reps}<br />
                  <button onClick={() => this.deleteItem(item.id)}>
                    Usuń
                  </button>
                  <button onClick={() => this.setEditMode(item.id)}>
                    Edytuj
                  </button>
                </li>
              );
            })}
          </ol>
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


          
        
        