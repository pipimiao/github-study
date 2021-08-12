import axios from 'axios';
import { message } from 'antd';

const isDev = process.env.NODE_ENV === 'development';


const service = axios.create({
  baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/288629':''
});

service.interceptors.request.use((config)=>{
  config.data = Object.assign({},config.data,{
    // authToken:window.localStorage.getItem('authToken')
    authToken:'dfsfdsdfsdfsddf'
  })
  return config;
});

service.interceptors.response.use((resp)=>{
  if(resp.data.code === 200){
    return resp.data.data;
  }else{
    //全局处理错误
    message.error(resp.data.data.errMsg);
  }
});

export const getArticles = (offset=0,limited=10) => {
  return service.post('/api/v1/articleList',{
    offset,
    limited
  });
}

//通过id删除文章

export const deleteArticle = (id) => {
  return service.post(`/api/v1/articleDelete/${id}`)
}