import * as React from 'react';
import * as style from './style.css';
import NumberFormat from 'react-number-format';
import Button from '@material-ui/core/Button';

export interface ChanceProps {
  chance: number;
  setChance: (chance: number) => any;
}

export interface ChanceState {
  value: number;
}

export class Chance extends React.Component<ChanceProps, ChanceState> {
  constructor(props?: ChanceProps, context?: any) {
    super(props, context);
    this.state = {
      value: props.chance || 0,
    };
  }

  private handleClickSet = (e: React.SyntheticEvent<any>) => {
    this.props.setChance(this.state.value);
  }

  valueFormat = (val) => {
    if (val <= 100) {
      return val + '%';
    } else {
      return this.state.value + '%';
    }
  }

  handleValueChange = (e) => {
    if (e.floatValue <= 100) {
      this.setState({ value: e.floatValue })
    }
  }

  render() {
    return (
      <div>
        <h2 className={style.title}>Set a chance to win</h2>
        <NumberFormat
          value={this.state.value}
          format={this.valueFormat}
          onValueChange={this.handleValueChange}
          className={style.numberInput}
         />
        <Button variant="outlined" onClick={this.handleClickSet}>Set</Button>
      </div>
    );
  }
}

export default Chance;
