import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Graph from './Graph'
import BarGraph from './BarGraph'

export default class Multigraph extends Component {
  state = {
    activeTab: '1'
  };


  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              This Month
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              This Year
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col className="graphCol" sm="12">
                <Graph {...this.props} categories={this.props.categories} data={this.props.data} total={this.props.total} />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <BarGraph {...this.props} categories={this.props.categories} data={this.props.data} total={this.props.total} />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}