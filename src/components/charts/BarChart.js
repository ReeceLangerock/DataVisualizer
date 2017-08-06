import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictoryTooltip } from "victory";
import data from "./../../datasets/barchart-data";

class BarChart extends Component {




  formatData() {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    });
    console.log('in format data')
    data.data.map((point, index) => {
      const formattedDate = moment(new Date(point[0])).format("MMMM YYYY");
      let  formattedGDP = point[1];
      formattedGDP = formatter.format(formattedGDP)
      data.data[index] = { x: new Date(point[0]), y: point[1], label: `${formattedGDP} Billion\n${formattedDate}` };
    });

    return data;
  }

  render() {
    let formattedData = this.formatData();
    console.log('in render')

    return (
      <div className="chart-container">
        <div className = "chart">
        <VictoryChart
          width={1000}
          height={500}
          scale={{ x: "time" }}
          // adding the material theme provided with Victory
          domainPadding={{ x: 0, y: 0 }}
          padding={{ top: 40, bottom: 40, left: 60, right: 20 }}

        >
          <VictoryAxis tickCount={14} />
          <VictoryAxis dependentAxis label={'Gross Domestic Product, USA'} axisLabelComponent={<VictoryLabel verticalAnchor={"start"} textAnchor = {"end"} dy={40}/>}/>
          <VictoryBar
            labelComponent={<VictoryTooltip />}
            style={{
              data: {
                fill: "blue",
                strokeWidth: 2.5
              }
            }}
            data={formattedData.data}
            x="x"
            y="y"
            events={[
              {
                target: "data",
                eventHandlers: {
                  onMouseOver: () => {
                    return [
                      {
                        target: "data",
                        mutation: () => ({ style: { fill: "gold" } })
                      },
                      {
                        target: "labels",
                        mutation: () => ({ active: true })
                      }
                    ];
                  },
                  onMouseOut: () => {
                    return [
                      {
                        target: "data",
                        mutation: () => {}
                      },
                      {
                        target: "labels",
                        mutation: () => ({ active: false })
                      }
                    ];
                  }
                }
              }
            ]}
          />

        </VictoryChart>
      </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(BarChart);
