import React from "react";


class Equations extends React.Component{

    constructor(props) {
        super(props);
    }


    render() {
        return(
            <div>
                <button className={"btn btn-outline-primary"} onClick={this.props.handleclick} name={"y=ax+b"}>Linear Equation</button>
                <button className={"btn btn-outline-primary"} onClick={this.props.handleclick} name={"y=a\\left(x-b\\right)^2+c"}>Quadratic Equation</button>
                <button className={"btn btn-outline-primary"} onClick={this.props.handleclick} name={"y=a\\left|x-b\\right|+c"}>Absolute Equation</button>
            </div>
        )
    }

}

export default Equations;