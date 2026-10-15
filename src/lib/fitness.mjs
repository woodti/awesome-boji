/** Validate numeric input without silently treating empty strings as zero. */
export function numberInRange(value, min, max, label) {
  if (value === null || value === undefined || String(value).trim() === '')
    throw new Error(`请填写${label}`);
  const n = Number(value);
  if (!Number.isFinite(n) || n < min || n > max) throw new Error(`${label}需在 ${min}–${max} 之间`);
  return n;
}

export function calculateEnergy({ weight, height, age, sex, activity }) {
  const w = numberInRange(weight, 30, 250, '体重（kg）');
  const h = numberInRange(height, 130, 220, '身高（cm）');
  const a = numberInRange(age, 18, 80, '年龄');
  if (!['male', 'female'].includes(sex)) throw new Error('请选择公式参数');
  const factor = Number(activity);
  if (![1.2, 1.375, 1.55, 1.725].includes(factor)) throw new Error('请选择活动水平');
  const resting = 10 * w + 6.25 * h - 5 * a + (sex === 'male' ? 5 : -161);
  return { resting: Math.round(resting), total: Math.round(resting * factor) };
}

export function calculateProtein(weight) {
  const w = numberInRange(weight, 30, 250, '体重（kg）');
  return { low: Math.round(w * 1.4), high: Math.round(w * 2) };
}

/** @type {Record<string, {A: string[], B: string[]}>} */
const workoutSets = {
  home: {
    A: ['squat', 'incline-pushup', 'glute-bridge', 'dead-bug'],
    B: ['glute-bridge', 'incline-pushup', 'squat', 'dead-bug'],
  },
  band: {
    A: ['squat', 'incline-pushup', 'band-row', 'dead-bug'],
    B: ['glute-bridge', 'band-row', 'incline-pushup', 'dead-bug'],
  },
  dumbbell: {
    A: ['goblet-squat', 'floor-press', 'dumbbell-row', 'dead-bug'],
    B: ['rdl', 'dumbbell-row', 'floor-press', 'dead-bug'],
  },
  gym: {
    A: ['leg-press', 'chest-press', 'lat-pulldown', 'dead-bug'],
    B: ['rdl', 'lat-pulldown', 'chest-press', 'dead-bug'],
  },
};

export function generatePlan({ days = 2, equipment = 'home', duration = 35 }) {
  if (![2, 3].includes(Number(days))) throw new Error('请选择每周两次或三次');
  if (!Object.hasOwn(workoutSets, equipment)) throw new Error('请选择器械条件');
  if (![20, 35, 50].includes(Number(duration))) throw new Error('请选择训练时长');
  const count = Number(duration) === 20 ? 3 : 4;
  const sets = Number(duration) === 50 ? 3 : 2;
  const schedules = Number(days) === 2 ? [0, 3] : [0, 2, 4];
  return {
    days: Number(days),
    equipment,
    duration: Number(duration),
    sets,
    sessions: schedules.map((day, index) => ({
      day,
      label: index % 2 === 0 ? 'A' : 'B',
      exercises: workoutSets[equipment][index % 2 === 0 ? 'A' : 'B'].slice(0, count),
    })),
    notice:
      equipment === 'home'
        ? '纯徒手版本缺少有效的上肢拉动作。条件允许时，可用安全固定的弹力带补充；不要用门把手或不稳固家具代替。'
        : '先用轻阻力熟悉动作；弹力带需检查磨损与专用固定点，器械首次使用请确认调节和安全装置。',
  };
}

export function formatTimer(seconds) {
  const safe = Math.max(0, Math.floor(Number(seconds) || 0));
  return `${String(Math.floor(safe / 60)).padStart(2, '0')}:${String(safe % 60).padStart(2, '0')}`;
}
