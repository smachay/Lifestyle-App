import React, { Component } from 'react';
import { Row, Col, Form , Input , Button } from 'antd';

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
passEditedList(id){
  
  //copy current list of items
  const updatedList = [...this.props.list];
  
  updatedList[id] = {...updatedList[id], exercise: this.state.exercise, reps: this.state.reps, sets: this.state.sets};
  //Passing updatef list to parent component 
  this.props.callbackFromParent(updatedList);
}

handleChange = (e) =>{
    //update react state 
    this.setState(e);
    
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
    const layout = {
      labelCol: { span: 8},
      wrapperCol: { span: 8},
      align: "middle",
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 4 },
    };
    return (
      <Row style={{margin:'1%'}}>
      <Col 
      span={8} 
      className='edit-form'    
      >
          
          <Form
            {...layout}
            name="edit-form"
            onFinish={() => this.passEditedList(this.state.id)}
            onValuesChange={e =>this.handleChange(e)}
            initialValues={{ 
              exercise: this.state.exercise,
              sets: this.state.sets,
              reps: this.state.reps
            }}
          >
            <Form.Item name="exercise" wrapperCol={{offset: 8, span: 6}}>
              <span>Edytuj swój plan</span>
            </Form.Item>

            <Form.Item label="Ćwiczenie" name="exercise">
              <Input/>
            </Form.Item>

            <Form.Item label="Ilość serii" name="sets">
              <Input type="number" />
            </Form.Item>

            <Form.Item label="Ilość powtórzeń" name="reps">
              <Input type="number" />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" >
                Zapisz
              </Button>
            </Form.Item>
        </Form>
      </Col>
    </Row>
    );
  }
}


export default editForm;
