
import "./matador.css";
import React, { useEffect, useState } from 'react';

interface MatadorProps {
    applause?: number;
    setMatarodPosition?: (position: number) => void;
    matadorPosition?: number;
}

const Matador: React.FC<MatadorProps> = ({ applause, setMatarodPosition, matadorPosition }) => {
    const [lastApplause, setLastApplause] = useState<number | null>(null);

    useEffect(() => {
        const handleBullRun = (event: CustomEvent) => {
            const bullPosition = event.detail.position;
            if (bullPosition === matadorPosition) {
                if (matadorPosition !== undefined) {
                    const newPosition = getRandomPositionExcludingCurrent(matadorPosition);
                    console.log(`Matador is moving from ${matadorPosition} to ${newPosition}`);
                    if (setMatarodPosition !== undefined)
                        setMatarodPosition(newPosition);
                }
            }
        };

        const getRandomPositionExcludingCurrent = (currentPosition: number) => {
            let newPosition;
            do {
                newPosition = Math.floor(Math.random() * 9);
            } while (newPosition === currentPosition);
            return newPosition;
        };

        document.addEventListener('bullRun', handleBullRun as EventListener);

        return () => {
            document.removeEventListener('bullRun', handleBullRun as EventListener);
        };
    }, [matadorPosition, setMatarodPosition]);


    useEffect(() => {
        const audio = new Audio(`/sounds/applause_${applause}.wav`);
        audio.play();
        if (applause === 3 && applause !== lastApplause) {
            setLastApplause(applause);

        }

    }, [applause, lastApplause]);
    const mat = <div className="matador"></div>
    return (
        <div>
          <pre>{mat}</pre>
        </div>
      );
    };

export default React.memo(Matador);


