import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { GlobalState } from '../../../../globalState';
import { FactorGradient } from 'babylonjs/Misc/gradients';
import { LockObject } from '../lockObject';

interface IFactorGradientStepGridComponent {
    globalState: GlobalState;
    gradient: FactorGradient;
    lockObject: LockObject;
    lineIndex: number;
    onDelete: () => void;
    onUpdateGradient: () => void;
    onCheckForReOrder: () => void;
}

export class FactorGradientStepGridComponent extends React.Component<IFactorGradientStepGridComponent, {gradient: number}> {

    constructor(props: IFactorGradientStepGridComponent) {
        super(props);

        this.state={gradient: props.gradient.gradient};
    }

    updateFactor1(factor: number) {
        this.props.gradient.factor1 = factor;

        this.props.onUpdateGradient();
        this.forceUpdate();
    }    

    updateFactor2(factor: number) {
        this.props.gradient.factor2 = factor;

        this.props.onUpdateGradient();
        this.forceUpdate();
    }   
    
    updateGradient(gradient: number) {
        this.props.gradient.gradient = gradient;

        this.setState({gradient: gradient});

        this.props.onUpdateGradient();
    }

    onPointerUp() {
        this.props.onCheckForReOrder();
    }

    lock() {
        if (this.props.lockObject) {
            this.props.lockObject.lock = true;
        }
    }

    unlock() {
        if (this.props.lockObject) {
            this.props.lockObject.lock = false;
        }
    }

    render() {
        let gradient = this.props.gradient;

        return (
            <div className="gradient-step">
                <div className="step">
                    {`#${this.props.lineIndex}`}
                </div>
                <div className="factor1">
                    <input type="number" step={"0.01"} className="numeric-input" value={gradient.factor1} onBlur={() => this.unlock()} onFocus={() => this.lock()}
                        onChange={evt => this.updateFactor1(parseFloat(evt.target.value))} />
                </div>
                <div className="factor2">
                    <input type="number" step={"0.01"} className={"numeric-input" + ((gradient.factor1 === gradient.factor2 || gradient.factor2 === undefined) ? " grayed" : "")} value={gradient.factor2} onBlur={() => this.unlock()} onFocus={() => this.lock()} 
                        onChange={evt => this.updateFactor2(parseFloat(evt.target.value))} />
                </div>
                <div className="step-value">
                    {gradient.gradient.toFixed(2)}
                </div>
                <div className="step-slider">
                    <input className="range" type="range" step={0.01} min={0} max={1.0} value={gradient.gradient}
                        onPointerUp={evt => this.onPointerUp()}
                        onChange={evt => this.updateGradient(parseFloat(evt.target.value))} />
                </div>
                <div className="gradient-delete" onClick={() => this.props.onDelete()}>
                    <FontAwesomeIcon icon={faTrash} />
                </div>
            </div>
        )
    }
}