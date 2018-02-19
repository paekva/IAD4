import React from 'react'
import Point from "./Point";

export default class Table extends React.Component{

    componentDidMount() {
        this.interval = setInterval(this.tick, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    constructor(props)
    {
        super(props);
    }
    render() {
        let rows = [];
        this.props.points.forEach(function (point) {
            rows.push(<Point point={point}/>);
        });
        return (
            <div className="container">
                <table width="500px" className="table table-striped">
                <thead>
                <tr>
                    <th>X</th>
                    <th>Y</th>
                    <th>R</th>
                    <th>Принадлежит ?</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
            </div>
        );
    }
}
