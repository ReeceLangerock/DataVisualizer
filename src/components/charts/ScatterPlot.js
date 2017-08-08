import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import { VictoryScatter, VictoryChart, VictoryAxis, VictoryLabel, VictoryTooltip, VictoryLegend } from "victory";
import data from "./../../datasets/scatterplot-data";

class ScatterPlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      riderData: {
        name: "test"
      }
    };
  }
  formatData() {
    data.sort((a, b) => b.Seconds - a.Seconds);
    let formattedData = [...data];
    const fastestTime = data[0].Seconds;
    data.map((point, index) => {
      formattedData[index] = { y: index, x: fastestTime - point.Seconds, label: point.Name };
    });

    return formattedData;
  }

  renderPopup(point) {
    let index = point.data[point.index].eventKey;
    console.log(data[index].Name);
    let riderData = data[index];
    this.setState({
      riderData
    });
  }

  render() {
    let formattedData = this.formatData();

    return (
      <div className="chart-container">
        <div>
          <p>{this.state.riderData.Name}:{this.state.riderData.Nationality}</p>
          <p>Year:{this.state.riderData.Year} Time:{this.state.riderData.Time}</p>
          <br/>
          <p>{this.state.riderData.Doping}</p>
        </div>
        <div className="chart">
          <VictoryChart width={1000} height={500} domainPadding={{ x: 0, y: 0 }} padding={{ top: 20, bottom: 60, left: 60, right: 20 }}>
            <VictoryAxis
              label="Ranking"
              style={{
                axis: { stroke: "#756f6a" },
                axisLabel: { fontSize: 20, padding: 30 },
                ticks: { stroke: "grey", size: 5 },
                tickLabels: { fontSize: 15, padding: 5 }
              }}
              dependentAxis
            />
            <VictoryAxis
              label="Minutes Behind Fastest Time
"
              style={{
                axis: { stroke: "#756f6a" },
                axisLabel: { fontSize: 20, padding: 30 },
                ticks: { stroke: "grey", size: 5 },
                tickLabels: { fontSize: 15, padding: 5 }
              }}
            />
            <VictoryScatter
              
              style={{
                data: {
                  fill: "blue"
                }
              }}
              data={formattedData}
              x="x"
              y="y"
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onMouseOver: (e, props) => {
                      this.renderPopup(props);

                      return [
                        {
                          target: "data",
                          mutation: () => {
                            style: {
                              fill: ("gold");
                            }
                          }
                        }
                      ];
                    },
                    onMouseOut: () => {
                      return [
                        {
                          target: "data",
                          mutation: () => {}
                        }
                      ];
                    }
                  }
                }
              ]}
            /><VictoryLegend colorScale={["red", "blue"]} data={[{ name: "No Doping Allegations", symbol: { type: "circle" } }, { name: "Doping Allegation", symbol: { type: "circle" } }]} />

          </VictoryChart>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ScatterPlot);
