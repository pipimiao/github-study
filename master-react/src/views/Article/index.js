import React, { Component } from "react";
import { Button, Card, Table, Tag,Modal,Typography } from "antd";
import { getArticles,deleteArticle } from "../../requests";
import moment from "moment";
import XLSX from 'xlsx';

const {confirm} = Modal

const ButtonGroup = Button.Group;
const titleDisplayMap = {
	id: "id",
	title: "标题",
	author: "作者",
	createAt: "日期",
	amount: "阅读量",
};

export default class ArticleList extends Component {
	constructor() {
		super();
		this.state = {
			dataSource: [],
			columns: [],
			total: 0,
			isLoading: false,
			offset: 0,
			limit: 10,
		};
	}

	createColumns = (columnKeys) => {
		const columns = columnKeys.map((column) => {
			if (column === "amount") {
				return {
					title: titleDisplayMap[column],
					dataIndex: column,
					render: (text, record) => {
						const { amount } = record;
						return (
							<Tag color={amount > 200 ? "red" : "green"}>{record.amount}</Tag>
						);
					},
				};
			}

			if (column === "createAt") {
				return {
					title: titleDisplayMap[column],
					dataIndex: column,
					render: (text, record) => {
						const { createAt } = record;
						return moment(createAt).format("YYYY年MM月DD日 HH时mm分ss秒");
					},
				};
			}
			return {
				title: titleDisplayMap[column],
				dataIndex: column,
				index: column,
			};
		});

		columns.push({
			title: "操作",
			key: "action",
			render: (text,record) => {
				return (
					<ButtonGroup>
						<Button size='small' type='primary'>
							编辑
						</Button>
						<Button size='small' type='danger' onClick={this.deleteArticle.bind(this,record)}>
							删除
						</Button>
					</ButtonGroup>
				);
			},
		});

		return columns;
	};

  deleteArticle(record){
    confirm({
      title:<Typography>确定要删除<span>{record.title}</span>吗?</Typography>,
      content:'此操作不可逆，请谨慎操作！',
      onOk(){
        deleteArticle(record.id).then(resp=>{
          console.log("===========delete===========");
          console.log(resp)
        })
      }
    })
  }

  onPageChange = (page,pageSize) => {
    this.setState({
      offset: pageSize * (page-1),
      limit:pageSize
    },()=>{
      this.getData()
    })
  }

  onShowSizeChange = (current,size) => {
    this.setState({
      offset: 0,
      limit:size
    },()=>{
      this.getData()
    })
  }

	getData = () => {
		const { offset, limit } = this.state;
		this.setState({ isLoading: true });
		getArticles(offset, limit)
			.then((resp) => {
				const columnKeys = Object.keys(resp.list[0]);
				const columns = this.createColumns(columnKeys);
				this.setState({
					total: resp.total,
					columns,
					dataSource: resp.list,
				});
			})
			.catch((err) => {
				//处理错误
			})
			.finally(() => {
				this.setState({ isLoading: false });
			});
	};

	componentDidMount() {
		this.getData();
	}

  toExcel = () => {
    const data = [Object.keys(this.state.dataSource[0])];
    for(let i=0;i<this.state.dataSource.length;i++){
      data.push([
        this.state.dataSource[i].id,
        this.state.dataSource[i].title,
        this.state.dataSource[i].author,
        this.state.dataSource[i].amount,
        moment(this.state.dataSource[i].createAt).format("YYYY-MM-DD HH:mm:ss")
      ]);
    }
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,"SheetJS");
    XLSX.writeFile(wb,`articles-${this.state.offset/this.state.limit}-${moment().format('YYYY-MM-DD-HH-mm-ss')}.xlsx`);
  
  }

	render() {
		return (
			<Card
				title='文章列表'
				bordered={false}
				extra={<Button onClick={this.toExcel}>导出excel</Button>}
			>
				<Table
					rowKey={(record) => record.id}
					dataSource={this.state.dataSource}
					columns={this.state.columns}
					pagination={{ 
            current:this.state.offset/this.state.limit+1,
            total: this.state.total,
            onChange:this.onPageChange,
            showQuickJumper:true,
            showSizeChanger:true,
            onShowSizeChange:this.onShowSizeChange
          }}
					loading={this.state.isLoading}
				/>
			</Card>
		);
	}
}
