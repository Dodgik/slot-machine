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
  transition: string;
  transform: string;
}

export class Slot extends React.Component<SlotProps, SlotState> {

  constructor(props?: SlotProps, context?: any) {
    super(props, context);
    const digit = props.digit || this.getRandomDigit();
    this.state = {
      isStop: true,
      spins: props.spins || 0,
      digit: digit,
      transition: this.getTransition(0),
      transform: this.getTransform(digit),
    };
  }
  
  private getRandomDigit = () => { return Math.floor(Math.random() * 8 + 1) }
  
  private getTransition = (delay = 500, timing = 'linear') => {
    return `${delay / 1000}s ${timing}`;
  }
  
  private getTransform = (margin: number) => {
    return `matrix(1, 0, 0, 1, 0, ${-100 * margin})`;
  }
  
  play = (spins: number, res: number) => {
    if (spins > 0) {
      const digit = this.state.digit === 9 ? 1 : 9;
      const delay = digit === 1 ? 0 : 500;
      this.setState({
        isStop: false,
        spins: spins,
        digit: digit,
        transition: this.getTransition(delay),
        transform: this.getTransform(digit),
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
    this.setState({
      spins: 0,
      digit: res,
      transition: this.getTransition(delay, 'ease-out'),
      transform: this.getTransform(res),
    });
    setTimeout(() => window.requestAnimationFrame(() => {
      setTimeout(this.props.onStop, 0);
    }), delay);
  }
  
  componentWillReceiveProps(nextProps: SlotProps) {
    if (nextProps.session !== this.props.session) {
      this.play(nextProps.spins, nextProps.digit);
    }
  }

  render() {
    const drumStyle = {
      transition: this.state.transition,
      transform: this.state.transform,
    };
    return (
      <ul style={drumStyle} className={classNames(style.digits)}>
        <li> 1 </li><li> 2 </li><li> 3 </li><li> 4 </li><li> 5 </li><li> 6 </li><li> 7 </li><li> 8 </li><li> 9 </li>
      </ul>
    );
  }
}

export default Slot;
