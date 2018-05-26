import * as React from 'react';
import * as classNames from 'classnames';
import * as style from './style.css';


export interface SlotProps {
  session: number;
  spins: number;
  digit: number;
  onStop: any;
}

export interface SlotState {
  isStop: boolean;
  spins: number;
  digit: number;
}

export class Slot extends React.Component<SlotProps, SlotState> {

  constructor(props?: SlotProps, context?: any) {
    super(props, context);
    this.state = {
      isStop: true,
      spins: props.spins || 0,
      digit: props.digit || this.getRandomDigit()
    };
  }
  
  private getRandomDigit = () => { return Math.floor(Math.random() * 8 + 1) }
  
  private getTransition = (delay = 1000) => {
    return `${delay / 1000}s ease-in-out`;
  }
  
  private getTransform = (margin: number) => {
    return `matrix(1, 0, 0, 1, 0, ${margin})`;
  }
  
  play = (spins: number, res: number) => {
    const delay = 500;
    if (spins > 0) {
      this.setState({
        isStop: false,
        spins: spins,
        digit: this.state.digit === 9 ? 1 : 9
      });
      
      setTimeout(() => window.requestAnimationFrame(() => {
        this.play(this.state.spins - 1, res)
      }), delay);
    } else {
      this.stop(res);
    }
  }

  private stop = (res: number) => {
    const delay = 500;
    this.setState({ spins: 0, digit: res });
    setTimeout(() => window.requestAnimationFrame(() => {
      setTimeout(this.props.onStop, 0);
    }), delay);
  }
  
  componentWillReceiveProps(nextProps: SlotProps) {
    console.warn('Slot->componentWillReceiveProps, spins=', nextProps.spins, 'digit=', nextProps.digit);
    if (nextProps.session !== this.props.session) {
      this.play(nextProps.spins, nextProps.digit);
    }
  }

  render() {
    let firstDrumStyle = {
      transition: this.getTransition(500),
      transform: this.getTransform(-100 * this.state.digit)
    };
    console.log('Slot->render, spins=');
    return (
      <ul style={firstDrumStyle} className={classNames(style.digits)}>
        <li> 1 </li><li> 2 </li><li> 3 </li><li> 4 </li><li> 5 </li><li> 6 </li><li> 7 </li><li> 8 </li><li> 9</li>
      </ul>
    );
  }
}

export default Slot;
