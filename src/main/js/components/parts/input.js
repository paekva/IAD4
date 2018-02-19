import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {changeX, changeY, changeR} from "../../actions/actions"
import {Button} from "belle"
import InputNumber from 'rc-input-number'

class Input extends React.Component{
    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        let newPoint = {};
        newPoint['x'] = this.props.storeX;
        newPoint['y'] = this.props.storeY;
        newPoint['r'] = this.props.storeR;
        newPoint['inside'] = this.props.inside;

        let inputs = [
            <label> Введите координаты х, у и радиус r </label>,
            <InputNumber placeholder="Введите X" className="rounded" defaultValue={this.props.storeX}
                         min={-3} max={5}
                         onChange={(value) => {this.props.changeX(value)}} />,
            <InputNumber placeholder="Введите Y" className="rounded" defaultValue={this.props.storeY}
                         min={-6} max={6}
                         onChange={(value) => {this.props.changeY(value)}} />,
            <InputNumber placeholder="Введите R" className="rounded" defaultValue={this.props.storeR}
                         min={0} max={5}
                         onChange={(value) => {this.props.changeR(value)}} />,
            <Button className="rounded" key="submit" onClick=
                {  (e) => {
                    this.handleSubmit(e);
                    let inside = this.props.check(this.props.storeX,this.props.storeY,this.props.storeR);
                    this.props.handleClick(this.props.storeX,this.props.storeY,this.props.storeR,inside);
                }
                }>Проверить</Button>,
        ];

        return (
            <div>
                <form>
                    {inputs}
                </form>
            </div>
        )
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

export default connect(mapStateToProps, matchDispatchToProps)(Input);