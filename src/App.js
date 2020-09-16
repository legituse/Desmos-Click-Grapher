import React from 'react';
import Desmos from 'desmos';
import LoadData from './SavingAndLoading/LoadData';
import Equations from './Functions/Equations'

var mainCalculator;
var elt;
var currentX = 0;
var currentY = 0;


function inRectangle(point, rect) {
    return (
        point.x >= rect.left &&
        point.x <= rect.right &&
        point.y <= rect.top &&
        point.y >= rect.bottom
    )
}

class App extends React.Component{

    constructor(props) {
        super(props);
        elt = document.createElement('div')
        elt.id='calcDiv';
        elt.style.width = '1400px'
        elt.style.height = '700px'
        elt.style.resize = 'both';
        elt.style.overflow = 'auto';
        mainCalculator = Desmos.GraphingCalculator(elt)
        mainCalculator.updateSettings({expressionsCollapsed: true});
        mainCalculator.setExpression({ id: 'graph1', latex: 'y=x^2' })
        document.body.prepend(elt)


        this.state={
            numOfExpressions: mainCalculator.getExpressions.length+2,
            eqnButtonClicked: false,
            pageClicked: false,
            currentEqn: '',
            mouseListener: false
        }

        this.handleButton=this.handleButton.bind(this);
        this.clickedOnGraph=this.clickedOnGraph.bind(this);
        this.handleEqnCreate=this.handleEqnCreate.bind(this);
        this.handleEqnCreateWithMouse=this.handleEqnCreateWithMouse.bind(this);
        this.handleEqnCreate=this.handleEqnCreate.bind(this);
        this.mouseMoveEqn=this.mouseMoveEqn.bind(this);


    }

    handleButton(e){
        e.preventDefault();
        console.log(e.target.name);
        this.setState({
            eqnButtonClicked: true,
            currentEqn: e.target.name
        })

    }


    componentDidMount() {
        document.addEventListener('click', this.clickedOnGraph);
    }

    clickedOnGraph(evt){
        var rect = elt.getBoundingClientRect();
        var x = evt.clientX - rect.left;
        var y = evt.clientY - rect.top;
        // Note, pixelsToMath expects x and y to be referenced to the top left of
        // the calculator's parent container.
        var mathCoordinates = mainCalculator.pixelsToMath({x: x, y: y});

        if(this.state.mouseListener){
            document.removeEventListener('mousemove', this.mouseMoveEqn);
            this.setState({
                numOfExpressions: this.state.numOfExpressions+1,
                eqnButtonClicked: false,
                currentEqn: '',
                mouseListener: false
            })
        }

        if (!inRectangle(mathCoordinates, mainCalculator.graphpaperBounds.mathCoordinates)){
            if(this.state.eqnButtonClicked&&this.state.pageClicked){
                this.setState({
                    eqnButtonClicked: false,
                    currentEqn: '',
                    pageClicked: false
                })
            }
            else if (this.state.eqnButtonClicked){
                this.setState({
                    pageClicked: true
                })
            }
            console.log(this.state);
            return;
        }

        this.setState({
            pageClicked: false
        })



        currentX=mathCoordinates.x.toPrecision(3);
        currentY=mathCoordinates.y.toPrecision(3);

        if(this.state.eqnButtonClicked&&this.state.currentEqn.length>0){
            this.handleEqnCreateWithMouse();
        }
        console.log(this.state);

    }

    handleEqnCreate(){
        mainCalculator.setExpression({
            id: 'a'+(this.state.numOfExpressions),
            latex: this.state.currentEqn.replace(/a/g,currentX).replace(/b/g,currentY).replace(/\+-/g,"-").replace(/--/g,"+")
        });
        this.setState({
            numOfExpressions: this.state.numOfExpressions+1,
            eqnButtonClicked: false,
            currentEqn: ''
        })
    }

    handleEqnCreateWithMouse(){
        this.setState({mouseListener: true})
        document.addEventListener('mousemove',this.mouseMoveEqn);
    }

    mouseMoveEqn(ev){
        let xReflection = 1;
        let yReflection = 1;
        if(document.getElementById('xAxisReflection').checked){
            xReflection = -1;
        }
        if(document.getElementById('yAxisReflection').checked){
            yReflection = -1;
        }
        mainCalculator.setExpression({
            id: 'a'+(this.state.numOfExpressions),
            latex: this.state.currentEqn.replace(/a/g,(xReflection*ev.clientX/ev.clientY).toFixed(2)).replace(/x/g,yReflection+"*x").replace(/b/g,currentX).replace(/c/g,currentY)
                .replace(/1*x/g,"x").replace(/-1*x/g,"-x").replace(/\+-/g,"-").replace(/--/g,"+")
        })
    }

    render() {
    return(
        <div>
            <LoadData calculator={mainCalculator} />
            <div className="d-flex align-items-start">
                <div className="p-2">
                    <input type="checkbox" id="yAxisReflection" name="yAxisReflection" value="yAxisReflection"/>
                    <label htmlFor="yAxisReflection" className="m-2 text-info" >  Reflect On Y Axis    </label>
                </div>
                <div className="p-2">
                    <input type="checkbox" id="xAxisReflection" name="xAxisReflection" value="xAxisReflection"/>
                    <label htmlFor="xAxisReflection" className="m-2 text-info">  Reflect On X Axis   </label>
                </div>
            </div>
            <Equations handleclick={this.handleButton} />
        </div>
    )

  }
}

export default App;
