/**
 * Placeholder photography (Unsplash). Swap these IDs for the studio's own
 * images — or point `photo()` at local assets — without touching any component.
 */
export const PHOTOS = {
  concert: '1429962714451-bb934ecdc4ec',
  monochromeKiss: '1460978812857-470ed1c77af0',
  cake: '1464349095431-e9a21285b5f3',
  rings: '1465495976277-4387d4b0b4c6',
  aisle: '1469371670807-013ccf25f16a',
  roadPortrait: '1478146896981-b80fe463b330',
  firstDance: '1481653125770-b78c206c59d4',
  photographer: '1492562080023-ab3db95bfbce',
  confettiCrowd: '1492684223066-81342ee5ff30',
  avatarWoman: '1494790108377-be9c29b29330',
  avatarMan: '1500648767791-00dcc994a43e',
  reception: '1511285560929-80b456fea0bc',
  heartHands: '1516589178581-6cd7833ae3b2',
  table: '1519225421980-715cb0215aed',
  warmBouquet: '1519741497674-611481863552',
  holdingHands: '1520854221256-17451cc331bf',
  chairs: '1522673607200-164d1b6ce486',
  gazebo: '1523438885200-e635ba2c371e',
  bouquet: '1525258946800-98cfd641d0de',
  toast: '1527529482837-4698179dc6ce',
  outdoorBouquet: '1529636798458-92182e662485',
  balloons: '1530103862676-de8c9debad1d',
  portraitPink: '1531746020798-e6953c6e8e04',
  walkingCouple: '1532712938310-34cb3982ef74',
  stageConfetti: '1533174072545-7a4b6ad7a6c3',
  avatarWoman2: '1544005313-94ddf0286df2',
  veil: '1546032996-6dfacbacbf3f',
  birthday: '1558636508-e0db3814bd1d',
  confettiKiss: '1583939003579-730e3918a45a',
  coupleBouquet: '1591604466107-ec97de577aff',
  hillCouple: '1604017011826-d3b4c23f8914',
} as const;

export type PhotoKey = keyof typeof PHOTOS;

const BASE = 'https://images.unsplash.com/photo-';

/** Resized, cropped (when `height` is given) and compressed image URL. */
export function photo(key: PhotoKey, width: number, height?: number): string {
  const crop = height ? `&h=${height}` : '';
  return `${BASE}${PHOTOS[key]}?auto=format&fit=crop&q=68&w=${width}${crop}`;
}

/** `srcset` string for the given widths. */
export function photoSet(key: PhotoKey, widths: readonly number[]): string {
  return widths.map((w) => `${photo(key, w)} ${w}w`).join(', ');
}
