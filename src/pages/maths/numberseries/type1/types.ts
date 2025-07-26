type PatternResult = {
  pattern: number[];
  missingIndex: number;
  correctAnswer: number;
  type: string;
  options: number[];
  timer: number;
};

export const increasedMultiply = (): PatternResult => {
  const k = Math.floor(Math.random() * 100); // initial random base
  const p = Math.random() * 50 + 1; // step

  const pattern: number[] = [k];
  for (let i = 1; i < 6; i++) {
    pattern[i] = pattern[i - 1] + Math.floor(p) * i;
  }

  const missingIndex = Math.floor(Math.random() * 6);
  const correctAnswer = pattern[missingIndex];

  const opts = new Set<number>();
  opts.add(correctAnswer);
  while (opts.size < 4) {
    const fake = correctAnswer + Math.floor(Math.random() * 21) - 10;
    if (fake !== correctAnswer) opts.add(fake);
  }

  return {
    pattern,
    missingIndex,
    correctAnswer,
    type: "increasedMultiply",
    options: Array.from(opts).sort(() => 0.5 - Math.random()),
    timer: 30,
  };
};
export const simpleSum = () => {
  const k = Math.floor(Math.random() * 100);
  const c = Math.floor(Math.random() * 9) + 1;
  const newPattern: number[] = [k];

  for (let i = 1; i < 6; i++) {
    newPattern[i] = newPattern[i - 1] + c;
  }

  const missIndex = Math.floor(Math.random() * 6);
  const answer = newPattern[missIndex];

  const opts = new Set<number>();
  opts.add(answer);
  while (opts.size < 4) {
    const fake = answer + Math.floor(Math.random() * 11) - 5;
    if (fake !== answer) opts.add(fake);
  }

  return {
    pattern: newPattern,
    missingIndex: missIndex,
    correctAnswer: answer,
    type: "simpleSum",
    options: Array.from(opts).sort(() => 0.5 - Math.random()),
    timer: 30,
  };
};
export const simpleSquare = () => {
  const k = Math.floor(Math.random() * 100);
  const c = Math.floor(Math.random() * 9) + 1;
  const newPattern: number[] = [k];

  for (let i = 1; i < 6; i++) {
    const l = c + i;
    newPattern[i] = newPattern[i - 1] + l * l;
  }

  const missIndex = Math.floor(Math.random() * 6);
  const answer = newPattern[missIndex];

  const opts = new Set<number>();
  opts.add(answer);
  while (opts.size < 4) {
    const fake = answer + Math.floor(Math.random() * 11) - 5;
    if (fake !== answer) opts.add(fake);
  }

  return {
    pattern: newPattern,
    missingIndex: missIndex,
    correctAnswer: answer,
    type: "simpleSquare",

    options: Array.from(opts).sort(() => 0.5 - Math.random()),
    timer: 30,
  };
};

export const increasedSquare = () => {
  const k = Math.floor(Math.random() * 100);
  const c = Math.floor(Math.random() * 9) + 1;
  const d = Math.floor(Math.random() * 9) + 1;
  const newPattern: number[] = [k+d];

  for (let i = 1; i < 6; i++) {
    const l = c + i;
    newPattern[i] = k + (d + 1) + l * l;
  }

  const missIndex = Math.floor(Math.random() * 6);
  const answer = newPattern[missIndex];

  const opts = new Set<number>();
  opts.add(answer);
  while (opts.size < 4) {
    const fake = answer + Math.floor(Math.random() * 11) - 5;
    if (fake !== answer) opts.add(fake);
  }

  return {
    pattern: newPattern,
    missingIndex: missIndex,
    correctAnswer: answer,
    type: "increasedSquare",
    options: Array.from(opts).sort(() => 0.5 - Math.random()),
    timer: 30,
  };
};
export const allFunctions = [
  increasedMultiply,
  simpleSum,
  simpleSquare,
//   increasedSquare,
];
