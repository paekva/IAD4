import React from 'react'
import {change, changeR, changeX, changeY} from "../../actions/actions"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import Input from "./input"

class Graph extends React.Component {
    constructor(props)
    {
        super(props);
        this.array = props.points;
        this.handleClickInGraph = this.props.handleClick;
    }

    componentDidMount() {
        this.updateCanvas(this.props.storeR);
    }

    componentDidUpdate() {
        this.updateCanvas(this.props.storeR);
        this.drawPoints(this.props.storeR);
    }

    getCursorPosition(e){
        let x, y;
        if (e.pageX !== undefined && e.pageY !== undefined) {
            x = e.pageX;
            y = e.pageY;
        } else {
            x = e.clientX + document.body.scrollLeft +
                document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop +
                document.documentElement.scrollTop;
        }

        x -= 165;
        y -= 150;
        y *= -1;
        x = x / 20;
        y = y / 20;
        return {x: x, y: y};
    }

    check(x,y,r)
    {
        if((x<0)&&(y<0)&&(x*x+y*y<r*r)) return true;
        else if((x>0)&&(y<0)&&(y>x-r)) return true;
        else if((x>0)&&(y>0)&&(x<r)&&(y<r)) return true;
        else return false;
    }

    drawPoints(r)
    {
        let pointArray = this.array;
        const canva = document.getElementById('canva');
        const ctx = canva.getContext('2d');
        pointArray.forEach(function(entry) {
            if(entry.r === r)
            {
                if(entry.inside) ctx.fillStyle = '#5FE16B';
                else ctx.fillStyle = 'red';
            }
            else ctx.fillStyle = '#D2B6B0';
            let x = entry.x;
            let y = entry.y;
            x = x * 20;
            y = y * 20;
            y *= -1;
            x += 150;
            y += 150;
            ctx.beginPath();
            ctx.arc(x, y, 2.3, 0, 2* Math.PI);
            ctx.fill();
            ctx.closePath();
        });
    }

    drawAPoint(x,y,r,inside)
    {
        const canva = document.getElementById('canva');
        const ctx = canva.getContext('2d');
        if(inside) ctx.fillStyle = '#5FE16B';
        else ctx.fillStyle = 'red';
        x = x * 20;
        y = y * 20;
        y *= -1;
        x += 150;
        y += 150;
        ctx.beginPath();
        ctx.arc(x, y, 2.3, 0, 2* Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    updateCanvas(radius) {
        const canva = document.getElementById('canva');
        const ctx = canva.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0,0, 300, 300);
        let mashtab = 20;
        //Отрисовка фигуры

        ctx.fillStyle = '#6A5ACD';
        ctx.beginPath();
        ctx.fillRect(150, 150 - mashtab * radius, mashtab * radius, mashtab * radius);
        ctx.lineTo(150, 150);
        ctx.lineTo(150, 150 + mashtab * radius);
        ctx.lineTo(150 + mashtab * radius, 150);
        ctx.arc(150, 150, mashtab * radius, 0.5 * Math.PI, Math.PI);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.lineTo(150, 150);
        ctx.lineTo(150, 150 + mashtab * radius);
        ctx.lineTo(150 + mashtab * radius, 150);
        ctx.fill();
        ctx.closePath();

        //Отрисовка осей
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.moveTo(150, 0);
        ctx.lineTo(150, 300);
        ctx.moveTo(0, 150);
        ctx.lineTo(300, 150);
        ctx.stroke();
        ctx.closePath();
    }
    render() {
        return (
           <div>
               <canvas id="canva" onClick={(e) =>
               {
                   if(this.props.storeR===undefined)
                   {
                       alert("Неверный радиус");
                       return;
                   }
                   let arr = this.getCursorPosition(e);
                   let inside = this.check(arr['x'],arr['y'],this.props.storeR);
                   this.handleClickInGraph(arr['x'],arr['y'],this.props.storeR, inside);

                   this.drawAPoint(arr['x'],arr['y'],this.props.storeR, inside);
               }
               } ref="canvas" width={300} height={300}/>

               <Input check={this.check} handleClick={ (x,y,r,inside) => {
                   this.drawAPoint(x,y,r,inside);
                   this.handleClickInGraph(x,y,r,inside); }} />
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
            change: change,
        },
        dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Graph);