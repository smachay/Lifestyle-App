import React, { Component } from 'react';
//import { render } from '@testing-library/react';

class editForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
        exercise:"",
        sets: 0,
        reps: 0,
        
    };
  }
setValues(){

}
passEditedList(id){
  //copy current list of items
  const updatedList = [...this.props.list];

  updatedList[id] = {...updatedList[id], exercise: this.state.exercise, reps: this.state.reps, sets: this.state.sets};
  //Passing updatef list to parent component 
  this.props.callbackFromParent(updatedList);
}

handleChange = ({target}) =>{
    //update react state 
    this.setState({ [target.name]: target.value });
}
//react self invoke function 
componentWillMount(){
  const list = this.props.list;
  //find element
  const elementIndex = list.findIndex((e)=>e.id === this.props.id);
 
  this.setState({
    exercise: list[elementIndex].exercise,
    sets: list[elementIndex].sets,
    reps: list[elementIndex].reps,
    id: elementIndex
  });
}

  render() {
    return (
      <div className="editForm">
        Edytuj swój plan
        <br/>
        <input
            type="text"
            name="exercise"
            defaultValue={this.state.exercise}
            value={this.state.exercise}
            onChange={this.handleChange}
        />
        <br/>
        Ilość serii:
        <input
          type="number"
          name="sets"
          defaultValue={this.state.sets}
          value={this.state.sets}
          onChange={this.handleChange}
        />
        <br/>
        Ilość powtórzeń:
        <input
          type="number"
          name="reps"
          defaultValue={this.state.reps}
          value={this.state.reps}
          onChange={this.handleChange}
        />
        <br/>
        <button onClick={() => this.passEditedList(this.state.id)}>
          Dodaj
        </button>
      
      </div>
    );
  }
}


export default editForm;
