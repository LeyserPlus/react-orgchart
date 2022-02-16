import React,{ PureComponent } from 'react';
import autoBind from 'react-autobind';
import OrganizationChart from "../components/ChartContainer";
// import MyNode from "./my-node";
import MyNode from "./MyNode";
import { datas } from "../mock/orgChartData";
import "./custom-node-chart.css";

class CustomNodeChart extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  exportTo () {
    this.orgchart.exportTo('test','png');
  }

  render () {
    const ds = {
      id: "n1",
      name: "Lao Lao",
      title: "general manager",
      children: [
        { id: "n2",name: "Bo Miao",title: "department manager" },
        {
          id: "n3",
          name: "Su Miao",
          title: "department manager",
          children: [
            { id: "n4",name: "Tie Hua",title: "senior engineer" },
            {
              id: "n5",
              name: "Hei Hei",
              title: "senior engineer",
              children: [
                { id: "n6",name: "Dan Dan",title: "engineer" },
                { id: "n7",name: "Xiang Xiang",title: "engineer" }
              ]
            },
            { id: "n8",name: "Pang Pang",title: "senior engineer" }
          ]
        },
        { id: "n9",name: "Hong Miao",title: "department manager" },
        {
          id: "n10",
          name: "Chun Miao",
          title: "department manager",
          children: [
            {
              id: "n11",
              name: "Yue Yue",
              title: "senior engineer",
              children: [
                {
                  id: "n12",
                  name: "Yue Yue",
                  title: "senior engineer12",
                  children: [
                    {
                      id: "n14",
                      name: "Yue Yue",
                      title: "senior engineer12",
                      children: [
                        {
                          id: "n15",
                          name: "Yue Yue",
                          title: "senior engineer12",
                          children: [
                            {
                              id: "n16",
                              name: "Yue Yue",
                              title: "senior engineer12"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  id: "n13",
                  name: "Yue Yue",
                  title: "senior engineer13"
                }
              ]
            }
          ]
        }
      ]
    };

    return (
      <div>
        <button
          onClick={this.exportTo}
        >
          Export
        </button>
        <OrganizationChart
          ref={(c) => this.orgchart = c}
          datasource={datas}
          chartClass="myChart"
          containerClass="container"
          NodeTemplate={MyNode}
          zoom={false}
          collapsible={false}
        />
      </div>
    )
  }
};

export default CustomNodeChart;
