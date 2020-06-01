import React, { Component } from 'react';
import TrainingPlan from './trainingPlan';
//import { render } from '@testing-library/react';

class trainingPlanList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        list:[
            {id:1, name: "trening 1"},
            {id:2, name: "trening 2"},
            {id:2, name: "trening 2"},
        ],
        addingMode: false,
        
    };
  }
    setAddingMode(){
        this.setState({
            addingMode: true,
          }); 
       // console.log(test);
    }
    myCallback(test){
        //
        console.log(test);
    }

    

  render() {
    return (
    <React.Fragment>
    {
        this.state.addingMode === false ? 
        <div className="trainingPlanList">
            <button onClick={() => {this.setAddingMode()}}>
                Stwórz nowy plan treningowy
            </button>
             <br/>
                <h3>Lista planów treningowych</h3>
            <br/>
                {
                    this.state.list.map((plan,index) => {
                        return <div>{plan.name} </div>
                    })
                }
        
        </div>
        :
        <TrainingPlan
        callbackFromParent={this.myCallback}>
        </TrainingPlan>
        }
    </React.Fragment>
    );
  }
}



export default trainingPlanList;

