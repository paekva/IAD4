import React from 'react'
import {Button} from 'belle'
import {changeR, changeX, changeY} from "../actions/actions"
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Graph from "./parts/graph"
import Table from "./parts/table"
import {Col, Grid, Row} from "react-bootstrap"
import axios from "axios";

const root = '/api/points';
class App extends React.Component{

    constructor()
    {
        super();
        this.state = {
            points: [  ],
        };
    }

    onCreate(newPoint) {
        axios.post(root, newPoint).then(() => {
            return new Promise((resolve, reject) => {
                resolve();
            });
        });
    }

    handleClick(x,y,r) {
        const newPoint = {};
        newPoint['x'] = x;
        newPoint['y'] = y;
        newPoint['r'] = r;
        this.onCreate(newPoint);
    }


   render() {
       return (
           <div>
               <Grid fluid>
                   <Row className="show-grid">
                       <Col xs={6} sm={12} md={6} lg={6}>
                           <Graph points = {this.state.points} handleClick={
                               (x,y,r,inside) => {
                                   this.handleClick(x,y,r);
                                   this.forceUpdate();
                                   const newPoint = {};
                                   newPoint['id']= this.state.points.length;
                                   newPoint['x'] = x;
                                   newPoint['y'] = y;
                                   newPoint['r'] = r;
                                   newPoint['inside'] = inside;
                                   this.state.points.push(newPoint);
                               }} />
                       </Col>
                       <Col xs={6} sm={12} md={6} lg={6}>
                           <Table points = {this.state.points} />
                       </Col>
                   </Row>
                   <Row className="show-grid">
                       <Col xs={12} sm={12} md={12} lg={12}>
                           <Button onClick={() =>  {
                               document.location = "/logout"
                           }}>Выйти</Button>
                       </Col>
                   </Row>
               </Grid>
           </div>
       );
}
}


function mapStateToProps(state) {
    return {
        storeX: state.point.x,
        storeY: state.point.y,
        storeR: state.point.r,
        inside: state.point.inside,
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            changeX: changeX,
            changeY: changeY,
            changeR: changeR,
        },
        dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(App);