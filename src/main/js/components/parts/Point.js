import React from "react";

export default class Point extends React.Component{
    render() {
        return (
            <tr>
                <td>{this.props.point.x}</td>
                <td>{this.props.point.y}</td>
                <td>{this.props.point.r}</td>
                <td>{this.props.point.inside ? 'Принадлежит' : 'Не принадлежит'}</td>
            </tr>);
    }
}