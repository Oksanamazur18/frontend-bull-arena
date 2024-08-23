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
    this.playApplauseSound();
    document.addEventListener('bullRun', this.handleBullRun as EventListener);
  }

  componentWillUnmount() {
    document.removeEventListener('bullRun', this.handleBullRun as EventListener);
  }

  componentDidUpdate(prevProps: MatadorProps) {
    if (this.props.applause !== prevProps.applause) {
      this.playApplauseSound();
      this.setState({ lastApplause: this.props.applause });
    }
  }

  shouldComponentUpdate(nextProps: MatadorProps, nextState: MatadorState) {
    if (nextProps.applause === 3 && nextProps.applause !== nextState.lastApplause) {
      return true;
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

  playApplauseSound() {
    const { applause } = this.props;
    if (applause !== undefined) {
      const audio = new Audio(`/sounds/applause_${applause}.wav`);
      audio.play();
    }
  }

  render() {
    return <div className='matador'></div>;
  }
}

export default OldMatador;
