export type Movement = {
  id: string;
  name: string;
  en: string;
  group: string;
  equipment: string;
  cue: string;
  steps: string[];
  easier: string;
};
export const movements: Movement[] = [
  {
    id: 'squat',
    name: '徒手深蹲',
    en: 'SQUAT',
    group: '下肢',
    equipment: '徒手',
    cue: '脚跟稳，膝盖跟随脚尖方向。',
    steps: [
      '双脚站在舒适宽度，重心保持稳定。',
      '屈髋屈膝下蹲，只到自己能控制的深度。',
      '平稳站起，不急着锁死膝关节。',
    ],
    easier: '使用牢固的椅子做坐站练习。',
  },
  {
    id: 'incline-pushup',
    name: '高位俯卧撑',
    en: 'PUSH',
    group: '上肢推',
    equipment: '徒手',
    cue: '身体成一条线，让胸靠近支撑面。',
    steps: [
      '双手撑在固定、不会滑动的台面。',
      '收住躯干，屈肘让胸部靠近台面。',
      '推回起点，避免塌腰或耸肩。',
    ],
    easier: '提高支撑高度，或从墙面开始。',
  },
  {
    id: 'glute-bridge',
    name: '臀桥',
    en: 'BRIDGE',
    group: '下肢',
    equipment: '徒手',
    cue: '从臀部发力，不用腰向上顶。',
    steps: [
      '仰卧屈膝，双脚踩稳地面。',
      '收紧臀部抬起骨盆，避免腰部过度后仰。',
      '停顿后有控制地放下。',
    ],
    easier: '减小抬起幅度，先找臀部发力感。',
  },
  {
    id: 'dead-bug',
    name: '死虫式',
    en: 'CORE',
    group: '核心',
    equipment: '徒手',
    cue: '四肢动，躯干保持安稳。',
    steps: [
      '仰卧，手臂举起，髋膝屈曲。',
      '呼气，缓慢伸展对侧手臂和腿。',
      '在腰部保持可控的前提下回到起点，换侧。',
    ],
    easier: '手臂不动，只做脚跟轻触地面。',
  },
  {
    id: 'band-row',
    name: '弹力带划船',
    en: 'ROW',
    group: '上肢拉',
    equipment: '弹力带',
    cue: '先确认固定点，拉向躯干两侧。',
    steps: [
      '检查弹力带是否破损，并使用专用安全固定点。',
      '肩部放松，屈肘向后拉，不借身体后仰发力。',
      '控制弹力带回程，保持呼吸。',
    ],
    easier: '换更轻的弹力带，减少拉伸幅度。',
  },
  {
    id: 'dumbbell-row',
    name: '单臂哑铃划船',
    en: 'ROW',
    group: '上肢拉',
    equipment: '哑铃',
    cue: '躯干不转，用手肘带动。',
    steps: [
      '一只手支撑在牢固台面，保持背部自然。',
      '另一只手将哑铃拉向髋部附近。',
      '缓慢放下，完成后换侧。',
    ],
    easier: '用更轻重量，优先保持躯干稳定。',
  },
  {
    id: 'goblet-squat',
    name: '高脚杯深蹲',
    en: 'SQUAT',
    group: '下肢',
    equipment: '哑铃',
    cue: '重量靠近胸口，保持重心稳定。',
    steps: ['双手将轻哑铃抱在胸前。', '屈髋屈膝下蹲，膝盖顺着脚尖方向。', '在可控深度内平稳站起。'],
    easier: '先练徒手深蹲，再加入负重。',
  },
  {
    id: 'rdl',
    name: '哑铃罗马尼亚硬拉',
    en: 'HINGE',
    group: '下肢',
    equipment: '哑铃',
    cue: '臀部向后，哑铃贴近腿。',
    steps: [
      '双膝微屈，哑铃放在大腿前侧。',
      '臀部向后移动，背部保持自然，不追求触地。',
      '感到大腿后侧拉伸且仍可控制时，回到站姿。',
    ],
    easier: '不持重量，先练习臀部向后触墙。',
  },
  {
    id: 'chest-press',
    name: '器械推胸',
    en: 'PRESS',
    group: '上肢推',
    equipment: '健身房',
    cue: '先调座椅，背部贴稳靠垫。',
    steps: [
      '请现场人员确认器械调节方式，手柄位于舒适高度。',
      '选轻重量，平稳向前推，不猛锁肘。',
      '缓慢回到舒适位置，不让配重片撞击。',
    ],
    easier: '减小负荷和动作幅度。',
  },
  {
    id: 'lat-pulldown',
    name: '高位下拉',
    en: 'PULL',
    group: '上肢拉',
    equipment: '健身房',
    cue: '拉向身前，不向颈后拉。',
    steps: [
      '调好固定垫，握距以舒适为准。',
      '躯干稳定，将手柄拉向上胸方向。',
      '缓慢回程，不借大幅后仰甩动。',
    ],
    easier: '降低配重，先熟悉肩胛和手臂的配合。',
  },
  {
    id: 'leg-press',
    name: '器械腿举',
    en: 'LEGS',
    group: '下肢',
    equipment: '健身房',
    cue: '臀背贴垫，只做到可控深度。',
    steps: [
      '先向现场人员确认安全锁和停止方式。',
      '脚踩稳踏板，缓慢屈膝，不让骨盆卷起离垫。',
      '平稳推回，不猛锁膝。',
    ],
    easier: '减轻配重，或改做徒手坐站练习。',
  },
  {
    id: 'floor-press',
    name: '哑铃地板卧推',
    en: 'PRESS',
    group: '上肢推',
    equipment: '哑铃',
    cue: '上臂轻触地面，不反弹。',
    steps: [
      '选容易控制的重量，仰卧，双脚踩稳。',
      '肘部在舒适角度下放，上臂轻触地面。',
      '平稳向上推，避免哑铃碰撞。',
    ],
    easier: '换更轻重量，或改做高位俯卧撑。',
  },
];
