import "./matador.css";
import React, { Component } from 'react';

interface MatadorProps {
  applause?: number;
  setMatarodPosition?: (position: number) => void;
  matadorPosition?: number;
}

interface MatadorState {
  lastApplause: number | null | undefined;
}

class OldMatador extends Component<MatadorProps, MatadorState> {
  constructor(props: MatadorProps) {
    super(props);
    this.state = {
      lastApplause: null,
    };
  }

  componentDidMount() {
    const { applause } = this.props;
    const audio = new Audio(`/sounds/applause_${applause}.wav`);
      audio.play();
      console.log(applause);
    document.addEventListener('bullRun', this.handleBullRun as EventListener);
  }

  componentWillUnmount() {
    document.removeEventListener('bullRun', this.handleBullRun as EventListener);
  }

  componentDidUpdate(prevProps: MatadorProps) {
    const { applause } = this.props;
    const { lastApplause } = this.state;
   

    if ( applause !== lastApplause) {
        console.log(applause);
      this.setState({ lastApplause: applause });
    }
  }

  shouldComponentUpdate(nextProps: MatadorProps, nextState: MatadorState) {
    const { applause } = this.props;
    const { lastApplause } = this.state;
        if((applause===3 && lastApplause!==applause)){
            return true
        }
        return false;
  }

  handleBullRun = (event: CustomEvent) => {
    const { matadorPosition, setMatarodPosition } = this.props;
    const bullPosition = event.detail.position;
    if (bullPosition === matadorPosition && matadorPosition) {
      const newPosition = this.getRandomPositionExcludingCurrent(matadorPosition);
      console.log(`Matador is moving from ${matadorPosition} to ${newPosition}`);
      if (setMatarodPosition) setMatarodPosition(newPosition);
    }
  };

  getRandomPositionExcludingCurrent(currentPosition: number) {
    let newPosition;
    do {
      newPosition = Math.floor(Math.random() * 9);
    } while (newPosition === currentPosition);
    return newPosition;
  }

  render() {
    return <div className='matador'></div>;
  }
}

export default OldMatador;
