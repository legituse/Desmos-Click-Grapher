import React from "react";
import SaveData from './SaveData';



class LoadData extends React.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        var file = e.target.files[0];

        var reader = new FileReader();
        reader.onload = function(e) {
            var contents = e.target.result.toString();
            localStorage.setItem("loadjsondata",contents);

        };
        reader.readAsText(file);
        this.props.calculator.setState(localStorage.getItem("loadjsondata"));
        console.log(JSON.stringify(this.props.calculator.getExpressions()));
    }



    render() {
        return (
            <div>
                <SaveData calculator={this.props.calculator} />
                <label htmlFor="loaddata" className={"m-2 btn btn-primary btn-outlined"} >Load Json</label>
                <input id="loaddata" type={"file"} accept={"application/json"} style={{display: 'none'}} onChange={this.onChange} />
            </div>
        )
    }

}

export default LoadData;