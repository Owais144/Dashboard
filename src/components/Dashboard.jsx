import React, { Component } from 'react'
import './dashboard.css'
import { Col, Row, Container } from 'react-bootstrap'
import WidgetText from './WidgetText'
import WidgetBar from './WidgetBar'
import WidgetDoughnut from './WidgetDoughnut'
import WidgetDoughnut3d from "./WidgetDoughnut3d";
import Dropdown from 'react-dropdown';
import "react-dropdown/style.css";
import Bar3d from "./Bar3d";
import 'bootstrap/dist/css/bootstrap.min.css';


const config = {
    apiKey: 'AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI',
    spreadsheetId: '1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg'
}
const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId
    }/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      item: [],
      dropdownOptions: [],
      selectedValue: null,
      organicSource: null,
      directSource: null,
      referralSource: null,
      pageViews: null,
      users: null,
      newUsers: null,
      sourceArr: [],
      userArr: [],
      sessions: null,
      sessionNumbers: null,
      sessionPage: null,
      sessionAvgTime: null,
      bounceRate: null,
      sessionArr:[],
      TimeArr: [],
      socialSource: null,
    };
  }

  getData = (arg) => {
    const arr = this.state.items;
    const arrLen = arr.length;

    let organicSource = 0;
    let directSource = 0;
    let referralSource = 0;
    let newUsers = 0;
    let users = 0;
    let pageViews = 0;
    let selectedValue = null;
    let sourceArr =[];
    let userArr=[];
    let sessions=0;
    let sessionNumbers = 0;
    let sessionPage = 0;
    let sessionAvgTime = 0;
    let sessionArr=[];
    let bounceRate = 0;
    let TimeArr = [];
    let socialSource = 0



    for (let i = 0; i < arrLen; i++) {
      if (arg == arr[i]["month"]) {
        organicSource = arr[i].organic_source;
        directSource = arr[i].direct_source;
        referralSource = arr[i].referral_source;
        pageViews = arr[i].page_views;
        users = arr[i].users;
        newUsers = arr[i].new_users;
        sessions = arr[i].sessions;
        sessionNumbers = arr[i].number_of_sessions_per_users;
        sessionPage = arr[i].page_per_session;
        sessionAvgTime = arr[i].avg_session_time;
        bounceRate = arr[i].bounce_rate;
        socialSource = arr[i].social_source;
        sourceArr.push(
          {
            label: "Organic Souce",
            value: arr[i].organic_source,
          },
          {
            label: "Direct Souce",
            value: arr[i].direct_source,
          },
          {
            label: "Referral Souce",
            value: arr[i].referral_source,
          }
        );
        userArr.push(
          {
            label: "Users",
            value: arr[i].users,
          },
          {
            label: "New Users",
            value: arr[i].new_users,
          }
        );
        sessionArr.push(
          {
            label: "number of sessions per user",
            value: arr[i].number_of_sessions_per_users,
          },
          {
            label: "bounce rate",
            value: arr[i].bounce_rate,
          }
        )
        TimeArr.push(
          {
            label: "page per session",
            value: arr[i].page_per_session,
          },
          {
            label: "avg session time",
            value: arr[i].avg_session_time,
          }
        );
      }
    }
    selectedValue = arg;

    this.setState({
      organicSource: organicSource,
      directSource: directSource,
      referralSource: referralSource,
      pageViews: pageViews,
      users: users,
      newUsers: newUsers,
      sourceArr: sourceArr,
      userArr: userArr,
      sessions: sessions,
      sessionNumbers: sessionNumbers,
      sessionPage: sessionPage,
      sessionAvgTime: sessionAvgTime,
      sessionArr:sessionArr,
      TimeArr:TimeArr,
      bounceRate: bounceRate,
      socialSource:socialSource,

    });
  };
  updateDashboard = (event) => {
    this.getData(event.value);
    this.setState({ selectedValue: event.value }, () => {
      console.log(this.state.organicSource);
    });
  };
  componentDidMount() {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let batchRowValues = data.valueRanges[0].values;

        const rows = [];

        for (let i = 1; i < batchRowValues.length; i++) {
          let rowObject = {};
          for (let j = 0; j < batchRowValues[i].length; j++) {
            rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
          }
          rows.push(rowObject);
        }
        let dropdownOptions = [];

        for (let i = 0; i < rows.length; i++) {
          dropdownOptions.push(rows[i].month);
        }

        dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();
        this.setState(
          {
            items: rows,
            dropdownOptions: dropdownOptions,
            selectedValue: "Jan 2018",
          },
          () => this.getData("Jan 2018")
        );
      });
  }

  render() {

    const options = ["one", "two", "three"];
    const defaultOption = options[0];

    return (
      <div>
        <Container fluid>
          <Row className="TopHeader">
            <Col>Dashboard</Col>
            <Col>
              <Dropdown
                options={this.state.dropdownOptions}
                onChange={this.updateDashboard}
                value={this.state.selectedValue}
                placeholder="Select an option"
              />
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="mainDashboard">
            <Col>
              <WidgetText
                title="Organic Source"
                value={this.state.organicSource}
              />
            </Col>
            <Col>
              <WidgetText
                title="Direct Source"
                value={this.state.directSource}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <WidgetText
                title="Referral Source"
                value={this.state.referralSource}
              />
            </Col> 
            <Col>
              <WidgetText title="Page Views" value={this.state.pageViews} />
            </Col>
          </Row>
          <Row>
            <Col>
              <WidgetText title="Users" value={this.state.users} />
            </Col>
            <Col>
              <WidgetText title="New Users" value={this.state.newUsers} />
            </Col>
            </Row>
            <Row>
              <Col>
                  <WidgetText title="sessions" value={this.state.sessions} />
              </Col>
              <Col>
                <WidgetText title="Social Source" value={this.state.socialSource} />
              </Col>
            </Row>
            <Row>
            <Col>
              <WidgetBar
                title=" Source Comparision"
                data={this.state.sourceArr}
              />
            </Col>
            <Col>
              <WidgetDoughnut
                title=" User Comparision"
                data={this.state.userArr}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <WidgetDoughnut3d title="session data" data={this.state.sessionArr} />

            </Col>
            <Col>
              <Bar3d title="Average time" data={this.state.TimeArr} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Dashboard;