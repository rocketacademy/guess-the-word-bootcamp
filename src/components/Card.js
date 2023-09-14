import React from "react";

export default class Card extends React.Component {
    constructor(props){
        super(props);
    };

    render(){
        let {status} = this.props;
        let color

        if (status === "won"){
            color = "text-green-800";
        } else if 
        (status === "lose"){
            color = "text-red-600";
        } else {
            color = "text-black";
        }

        return (
            <div className={`${color} card h-44 w-32 bg-slate-100 shadow-xl justify-center text-7xl font-bold`}>
                {this.props.children}
            </div>
        )
    }
}