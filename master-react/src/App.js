import React, { Component } from 'react'
import {Button} from 'antd';

const testHoc = (WrappedComponent) => {
  return class HOCComponent extends Component{
    render(){
      return(
        <>
          <WrappedComponent/>
          <div>高阶组件信息</div>
        </>
      )
    }
  }
}

@testHoc
 class App extends Component {
  render() {
    return (
      <div>
        app
        <Button type="primary">测试</Button>
      </div>
    )
  }
}

export default App;

