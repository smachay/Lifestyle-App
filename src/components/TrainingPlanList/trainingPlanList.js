import React, { Component } from 'react';
import TrainingPlan from './trainingPlan';

class trainingPlanList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        list:[],
        addingMode: false,
        editMode: false,
        planForEdit: [],
    };
  }

deleteItem = (id) => {
    //copy current list of items
    const list = [...this.state.list];

    //filter out item being deleted
    const updatedList = list.filter(item => item.id !== id)

    this.setState({ 
        list: updatedList 
    });
}

setEditMode = (id) =>{
    const list = this.state.list;
    //find element
    const plan = list.filter(item => item.id === id);
    this.setState({ 
        editMode: true,
        planForEdit: plan 
    });
    
}

setAddingMode(){
    this.setState({
        addingMode: true,
    }); 
}

myCallback = (trainingPlanName,trainingPlan) =>{
    //create new item
    const newItem = {
        id: 1 + Math.floor(Math.random() * 101 + 0),
        trainingPlanName,
        trainingPlan
    };
    
    if(this.state.editMode === true){
        const list = [...this.state.list].filter(item => item.id === newItem.id);
        list.push(newItem);
        this.setState({ 
            list,
            editMode: false,
        });
    }else{
        //Copy of current list of items
        const list = [...this.state.list]
        //add new item to the list
        list.push(newItem);
        this.setState({ 
            list,
            addingMode: false,
            
        });
       
    }
}

    

  render() {
    if(this.state.addingMode === true){
        return (
            <TrainingPlan
            callbackFromParent={this.myCallback}>
            deleteItem={this.deleteItem}
            </TrainingPlan>
        );
    }else if(this.state.editMode === true){
        return (
            <TrainingPlan
            callbackFromParent={this.myCallback}
            list={this.state.planForEdit}
            stateEdit={this.state.editMode}
            deleteItem={this.deleteItem}>
            </TrainingPlan>
        );
    }else {
        return(
        <div className="container">
            <div className="training-plan-list">
                <button onClick={() => {this.setAddingMode()}}>
                    Stwórz nowy plan treningowy
                </button>
                <br/>
                <h3>Lista planów treningowych</h3>
                <br/>
                { 
                    this.state.list.map(plan => {
                        return (
                            <div>
                                <ol type="" key={plan.id}>
                                    <h2>{plan.trainingPlanName}</h2>
                                    <button onClick={() => this.deleteItem(plan.id)}>
                                    Usuń
                                    </button>
                                    <button onClick={() => this.setEditMode(plan.id)}>
                                    Edytuj
                                    </button>
                                </ol> 
                            </div>
                        );
                    })
                }
            </div>        
        </div>
        );
    }
  }
}



export default trainingPlanList;

  
           

