import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateEnergy,
  calculateProtein,
  generatePlan,
  formatTimer,
} from '../src/lib/fitness.mjs';

test('Mifflin reference cases use unrounded REE for TDEE', () => {
  assert.deepEqual(
    calculateEnergy({ weight: 70, height: 175, age: 30, sex: 'male', activity: 1.2 }),
    { resting: 1649, total: 1979 },
  );
  assert.deepEqual(
    calculateEnergy({ weight: 60, height: 165, age: 30, sex: 'female', activity: 1.55 }),
    { resting: 1320, total: 2046 },
  );
});
test('reject missing, infinite, underage and unsupported activity input', () => {
  const base = { weight: 70, height: 175, age: 30, sex: 'male', activity: 1.2 };
  for (const weight of ['', null, undefined, 'NaN', Infinity, -1, 251])
    assert.throws(() => calculateEnergy({ ...base, weight }));
  assert.throws(() => calculateEnergy({ ...base, age: 17 }));
  assert.throws(() => calculateEnergy({ ...base, activity: 5 }));
  assert.throws(() => calculateEnergy({ ...base, sex: 'unknown' }));
});
test('protein units and decimal rounding', () => {
  assert.deepEqual(calculateProtein(70), { low: 98, high: 140 });
  assert.deepEqual(calculateProtein(65.5), { low: 92, high: 131 });
  assert.throws(() => calculateProtein(''));
});
test('every supported plan respects equipment and nonconsecutive scheduling', () => {
  const equipmentMap = {
    home: ['squat', 'incline-pushup', 'glute-bridge', 'dead-bug'],
    band: ['squat', 'incline-pushup', 'glute-bridge', 'dead-bug', 'band-row'],
    dumbbell: ['goblet-squat', 'rdl', 'floor-press', 'dumbbell-row', 'dead-bug'],
    gym: ['leg-press', 'chest-press', 'lat-pulldown', 'rdl', 'dead-bug'],
  };
  for (const days of [2, 3])
    for (const equipment of Object.keys(equipmentMap))
      for (const duration of [20, 35, 50]) {
        const plan = generatePlan({ days, equipment, duration });
        assert.equal(plan.sessions.length, days);
        plan.sessions.forEach((session, i) => {
          if (i) assert.ok(session.day - plan.sessions[i - 1].day >= 2);
          assert.equal(session.exercises.length, duration === 20 ? 3 : 4);
          session.exercises.forEach((id) => assert.ok(equipmentMap[equipment].includes(id)));
        });
        assert.equal(plan.sets, duration === 50 ? 3 : 2);
      }
  assert.match(generatePlan({ equipment: 'home' }).notice, /缺少/);
  for (const options of [{ days: 7 }, { equipment: '__proto__' }, { duration: 19 }])
    assert.throws(() => generatePlan(options));
});
test('timer formatting handles expiry and invalid values', () => {
  assert.equal(formatTimer(90), '01:30');
  assert.equal(formatTimer(0), '00:00');
  assert.equal(formatTimer(-10), '00:00');
  assert.equal(formatTimer(NaN), '00:00');
});
