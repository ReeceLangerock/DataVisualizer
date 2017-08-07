import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import { VictoryScatter, VictoryChart, VictoryAxis, VictoryLabel, VictoryTooltip } from "victory";
import data from "./../../datasets/scatterplot-data";

class ScatterPlot extends Component {
  formatData() {

    data.sort((a,b) => b.Seconds - a.Seconds)
    const fastestTime = data[0].Seconds
    data.map((point, index) => {

      data[index] = { y: index, x: fastestTime - point.Seconds, label:  point.Time};
    });

    return data;
  }

  render() {
    let formattedData = this.formatData();

    return (
      <div className="chart-container">
        <div className="chart">
          <VictoryChart
            width={1000}
            height={500}

            // adding the material theme provided with Victory
            domainPadding={{ x: 0, y: 0 }}
            padding={{ top: 40, bottom: 40, left: 60, right: 20 }}
          >
            <VictoryAxis dependentAxis />
            <VictoryAxis   />
            <VictoryScatter
              labelComponent={<VictoryTooltip />}
              style={{
                data: {
                  fill: "blue",
                  strokeWidth: 2.5
                }
              }}
              data={formattedData}
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
export default connect(mapStateToProps, mapDispatchToProps)(ScatterPlot);
