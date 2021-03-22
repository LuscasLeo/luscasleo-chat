import React, { useEffect, useState } from 'react';
import { TypingStage } from './types';
interface Props {
  element: keyof JSX.IntrinsicElements;
  stages: TypingStage[];
}

const Typing: React.FC<Props> = ({ stages, element: Element, children }) => {
  const [text, setText] = useState('');
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const stage = stages[stageIndex];
    if (!stage) return;
  }, [stageIndex]);

  return <Element>{text}</Element>;
};

export default Typing;
