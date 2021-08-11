import {
  Dashboard,
  Login,
  NotFound,
  ArticleList,
  Settings,
  ArticleEdit
} from '../views';


export const mainRouter = [{
  pathname:'/login',
  component:Login
},{
  pathname:'/404',
  component:NotFound
}]

export const adminRouter = [{
  pathname:'/admin/dashboard',
  component:Dashboard,
  title:'仪表盘',
  icon:'dashboard',
  isNav:true
},{
  pathname:'/admin/article',
  component:ArticleList,
  title:'文章列表',
  icon:'unordered-list',
  isNav:true
},{
  pathname:'/admin/article/edit/:id',
  component:ArticleEdit,
  title:'文章修改',
  isNav:false
},{
  pathname:'/admin/settings',
  component:Settings,
  title:'设置',
  icon:'setting',
  isNav:true
}]