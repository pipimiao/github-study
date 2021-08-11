/**
 * 本文件是用于解释react-loadable原理
 */
import React,{Component} from 'react';

const Loadable = ({
  loader,
  loading:Loading
}) => {
  return class LoadableComponent extends Component{

    state = {
      LoadedComponent: null
    }

    componentDidMount(){
      loader().then(resp=>{
        this.setState({LoadedComponent:resp.default})
      })
    }

    render(){
      const {LoadedComponent} = this.state;
      // console.log(LoadedComponent);
      return (
        LoadedComponent ?
        <LoadedComponent/>
        :
        <Loading/>
      )
    }
  }
}

export default Loadable;