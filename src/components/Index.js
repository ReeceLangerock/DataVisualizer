import React from "react";
import { push } from "react-router-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

export class Index extends React.Component {
  componentWillMount() {}
  componentWillUnmount() {}
  render() {
    return (
      <div className="parallax">
        <div className="container">
          <div className="hover-container">

            <h1 className="title-font">Data Vizualizers</h1>
            <button onClick={() => this.props.changePage("barchart")}>
              Bar Chart
            </button><button onClick={() => this.props.changePage("force-directed")}>
              Force Directed
            </button><button onClick={() => this.props.changePage("heat-map")}>
              Heat Map
            </button><button onClick={() => this.props.changePage("map")}>
              Map
            </button><button onClick={() => this.props.changePage("scatter-plot")}>
              Scatter Plot
            </button>

          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: link => push(link)
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Index);
