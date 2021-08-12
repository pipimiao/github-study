import React, { Component } from "react";
import { Button, Card, Table, Tag } from "antd";
import { getArticles } from "../../requests";
import moment from "moment";

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
      isLoading:false
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
			render: () => {
				return <ButtonGroup>
            <Button size="small" type="primary">编辑</Button>
            <Button size="small" type="danger">删除</Button>
        </ButtonGroup>;
			},
		});

		return columns;
	};

	getData = () => {
    this.setState({isLoading:true});
		getArticles().then((resp) => {
			console.log(resp);
			const columnKeys = Object.keys(resp.list[0]);
			const columns = this.createColumns(columnKeys);
			this.setState({
				total: resp.total,
				columns,
				dataSource: resp.list,
			});
		}).catch(err=>{
      //处理错误
    }).finally(()=>{
      this.setState({isLoading:false});
    });
	};

	componentDidMount() {
		this.getData();
	}
	render() {
		return (
			<Card
				title='文章列表'
				bordered={false}
				extra={<Button>导出excel</Button>}
			>
				<Table
					rowKey={(record) => record.id}
					dataSource={this.state.dataSource}
					columns={this.state.columns}
					pagination={{ total: this.state.total }}
          loading={this.state.isLoading}
				/>
			</Card>
		);
	}
}
