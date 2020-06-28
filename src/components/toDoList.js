import React, { Component } from 'react';
import { Checkbox } from 'antd';
import {List,Button } from 'antd';
import {DeleteTwoTone,PlusOutlined} from '@ant-design/icons';
//import { render } from '@testing-library/react';

class toDoList extends Component{
    constructor(props){
        super(props);
    
        this.state={
          newItem:"",
          list:[],
          listAchived:[]
        }    
      }
      deleteItem(id,listType){
        if(listType === false){
          //copy current list of items
          const list = [...this.state.list];
          
          //filter out item being deleted
          const updatedList = list.filter(item => item.id !== id);

          this.setState({ list: updatedList });
        }else{
          //copy current list of items
          const list = [...this.state.listAchived];
          
          //filter out item being deleted
          const updatedList = list.filter(item => item.id !== id);

          this.setState({ listAchived: updatedList });
        }
        
      }

      addListAchived = (id) =>{
        const itemId = id;
        const achived = this.state.list.find(item => item.id === id)
        const listAchived = [...this.state.listAchived];
        listAchived.push(achived);
        this.deleteItem(itemId, false);
        this.setState({
          listAchived,
        });
          
      };

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
        <div className="addTask">
          <List
            locale={{ emptyText: 'Zaplanuj swój dzień...' }}
            header={
            <div>
              Dodaj rzeczy do zrobienia
              <br/>
              <input
                type="text"
                name="newItem"
                placeholder="Wpisz przedmiot..."
                value={this.state.newItem}
                onChange={this.handleChange}
              />
              <Button className="addBtn" type="primary" shape="circle" icon={<PlusOutlined />} onClick={()=> this.addItem()}/>
            </div>
            }
            bordered
            dataSource={this.state.list}
            renderItem={item => (
              <List.Item>
                <Checkbox key={item.id} options={item} onChange={() => this.addListAchived(item.id)}>
                {item.value}
                </Checkbox>
                <DeleteTwoTone onClick={() => this.deleteItem(item.id,false)}/>
              </List.Item>
            )}
          />
        </div>
        <div className="listAchived">
          <List
              locale={{ emptyText: 'Zacznij działać, lista sama się nie zapełni!' }}
              header={
              <div>
                Zrobione rzeczy
              </div>
              }
              bordered
              dataSource={this.state.listAchived}
              renderItem={item => (
                <List.Item>
                  <div>{item.value}</div>
                  <DeleteTwoTone onClick={() => this.deleteItem(item.id,true)}/>
                </List.Item>
              )}
            />
        </div>
      </div>
      );
    }
    
}

export default toDoList;
