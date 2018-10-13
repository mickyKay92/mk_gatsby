import React, {Component} from 'react';
import styled from 'styled-components';

class PieceOverview extends Component{
    shouldComponentUpdate(){
        return false;
    }
    render(){
        return (
            <div id="pieceDetail" className="content wrapper animation" onLoad={delay(function(){document.querySelector('#pieceDetail').classList.add('opacity-1');},200)}>
                <div className="pieceInfoGrid">
                    <div className="test grid-row-1 item-center-row">
                        <p className="pt-60 pb-60 pieceFontSize">{this.props.set.description}</p>
                    </div>
                </div>
                <div className="pieceInfoImageGrid">
                    {this.props.set.image.map((gc, index) => <img key={index} src={gc} className={`pieceInfoClass grid-col-2 ${this.props.set.class}`} alt={index}></img>)}
                </div>
            </div>
        );
    }
};
export default PieceOverview;