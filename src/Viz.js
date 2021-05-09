import React from 'react';
import p5 from 'p5';
import "p5/lib/addons/p5.sound";

export default class Viz extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: null
        }

        this.myRef = React.createRef();
        this.osc = null;
        this.runViz = false;
        this.vizLock = false;

        this.names = [];
    }

    sketch = (p) => {

        p.setup = () => {
            p.createCanvas(window.innerWidth, window.innerHeight);
            this.osc = new p5.Noise('white');
        }

        p.draw = () => {
            p.background(10, 10, 30);
            p.fill(255);

            if (this.runViz && !this.vizLock) {
                this.vizLock = true;
                p.runViz(this.props.data);
            }

            for (const name of this.names) {
                p.text(name.text, name.x, name.y);
            }

        }

        p.runViz = (data) => {
            p.runQuali(data.q1, 0, 100);
            setTimeout(() => {
                p.runQuali(data.q2, 0, 300);
                setTimeout(() => {
                    p.runQuali(data.q3, 0, 500);
                }, 2000);
            }, 2000);
        }

        p.runQuali = (quali, index, offset) => {
            this.osc.amp(1, 0);
            this.osc.start();
            this.osc.amp(0, 0.025);

            this.names.push({
               text: `${quali[index].driver.code} - ${quali[index].timestamp}`,
                x: offset,
                y: index * 10
            });

            if (index >= quali.length - 1) {
                return;
            }

            setTimeout(
                () => {p.runQuali(quali, index + 1, offset);},
                (quali[index + 1].time - quali[index].time)
                );

        }


        p.mouseClicked = () => {
        }
    }

    componentDidMount() {
        this.myP5 = new p5(this.sketch, this.myRef.current)
    }

    render() {
        this.runViz = this.props.data;
        console.log(this.props.data);

        return (
            <div ref={this.myRef}>

            </div>
        )
    }
}