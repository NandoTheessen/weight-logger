import React, { Component } from 'react';
import FusionCharts from 'fusioncharts'
import Charts from 'fusioncharts/fusioncharts.charts'
import ReactFC from 'react-fusioncharts'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: JSON.parse(localStorage.getItem("data")),
      date: '',
      weight: 0
    };
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  submitWeight = () => {
    let newItem = {
      "label": this.state.date,
      "value": `${this.state.weight}`
    }
    this.setState({
      data: this.state.data.concat(newItem),
      weight: '',
      date: ''
    })
  }

  render() {
    Charts(FusionCharts)
    const myDataSource = {
      "chart": {
        "caption": "Weight in Kilograms over time",
        "subCaption": "This Year",
        "xAxisName": "Date",
        "yAxisName": "Weight in kg",
        "lineThickness": "2",
        "paletteColors": "#0075c2",
        "baseFontColor": "#333333",
        "baseFont": "Helvetica Neue,Arial",
        "captionFontSize": "14",
        "subcaptionFontSize": "14",
        "subcaptionFontBold": "0",
        "showBorder": "0",
        "bgColor": "#ffffff",
        "showShadow": "0",
        "canvasBgColor": "#ffffff",
        "canvasBorderAlpha": "0",
        "divlineAlpha": "100",
        "divlineColor": "#999999",
        "divlineThickness": "1",
        "divLineIsDashed": "1",
        "divLineDashLen": "1",
        "divLineGapLen": "1",
        "showXAxisLine": "1",
        "xAxisLineThickness": "1",
        "xAxisLineColor": "#999999",
        "showAlternateHGridColor": "0",
        "yAxisMaxValue": "155",
        "yAxisMinValue": "85"
      },
      data: this.state.data
    }
    const chartConfigs = {
      type: 'area2d',
      width: 600,
      height: 400,
      dataFormat: 'json',
      dataSource: myDataSource,
    };

    this.state.data ? localStorage.setItem("data", JSON.stringify(this.state.data)) : localStorage.setItem("data", JSON.stringify([]));
    return (
      <div className="container-fluid">

        <ReactFC {...chartConfigs} />
        <div className="input-fields">
          <input
            name="date"
            type="date"
            value={this.state.date}
            onChange={this.onChange}
            placeholder="date"
            format="M/D/YY"
          />
          <input
            type="text"
            placeholder="weight"
            name="weight"
            value={this.state.weight}
            onChange={this.onChange}
          />
          <button onClick={this.submitWeight}>Submit</button>
        </div>

      </div>
    );
  }
}

export default App;
