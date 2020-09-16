import React from "react";


class SaveData extends React.Component{

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(){
        let currentState = this.props.calculator.getState();
        var blob = new Blob([JSON.stringify(currentState)],{type:'application/json'});
        const a = document.createElement('a');
        a.href= URL.createObjectURL(blob);
        a.download = 'data.json';
        a.click();
    }

    render() {
        return(
            <button className={"btn btn-primary btn-outlined"} onClick={this.onClick}>Save Json</button>
        )
    }

}


export default SaveData;