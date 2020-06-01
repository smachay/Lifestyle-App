import React, { Component } from 'react';
//import { render } from '@testing-library/react';

class toDoList extends Component{
    constructor(props){
        super(props);
    
        this.state={
          newItem:"",
          list:[]
        }    
      }
      deleteItem(id){
        //copy current list of items
        const list = [...this.state.list];

        //filter out item being deleted
        const updatedList = list.filter(item => item.id !== id)

        this.setState({ list: updatedList });
      }

      handleChange = ({ target }) => {
        //update react state 
        this.setState({ [target.name]: target.value });
      };

      addItem(){
        //Create item with uniqe id
        const newItem={
            id: 1 + Math.floor(Math.random() * 101 + 0),
            value: this.state.newItem.slice()
        };
        //Copy of current list of items
        const list = [...this.state.list]

        //add new item to list
        list.push(newItem);

        //update state with new list and reset newItem input 
        this.setState({
            list,
            newItem:""
        });
      }
      render(){
      return (
        <div className="toDoList">
            <div>
                Dodaj rzeczy do zrobienia
            </div>
            <input
            type="text"
            name="newItem"
            placeholder="Wpisz przedmiot..."
            value={this.state.newItem}
            onChange={this.handleChange}
            />

            <button onClick={()=> this.addItem()}>
                Dodaj
            </button>
            <br/>
            <ul>
            {this.state.list.map(item => {
              return (
                <li key={item.id}>
                  {item.value}
                  <button onClick={() => this.deleteItem(item.id)}>
                    x
                  </button>
                </li>
              );
            })}
            </ul>

        </div>
      );
    }
    
}

export default toDoList;
