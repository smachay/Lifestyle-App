import React from 'react';
import {Table,Space} from 'antd';


function exerciseTable(props) {
    const columns = [
    {
        title: 'Ćwiczenie',
        dataIndex: 'exercise',
        key: 'exercise',
    },
    {
        title: 'Ilość serii',
        dataIndex: 'sets',
        key: 'sets',
    },
    {
        title: 'Ilość powtórzeń',
        dataIndex: 'reps',
        key: 'reps',
    },
    {
        title: '',
        key: 'action',
        render: (item) => (
        <Space size="middle">
        <a onClick={() => props.edit(item.id)}>Edytuj</a>
        |
        <a onClick={() => props.delete(item.id)}>Usuń</a>
        </Space>
        )
    }]
    return( 
        <div className="exercise-table" >
            <Table 
            locale={{ emptyText: 'Nie dodano jeszcze żadnego ćwiczenia...' }}
            columns={columns}
            pagination={false}
            dataSource={props.list}
            />
        </div> )
  }
 
  export default exerciseTable;