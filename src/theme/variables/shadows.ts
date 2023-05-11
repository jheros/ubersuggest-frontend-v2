export const shadows = {
  shadowA: '0px 10px 32px rgba(20, 20, 20, 0.08)',
  shadowB: '-6px 10px 32px rgba(20, 20, 20, 0.08)',
  shadowC: '0px 20px 29px 0px rgba(207, 67, 20, 0.5)',
};

export type IShadowsVariants = keyof typeof shadows;
export type IShadows = {
  [variant in IShadowsVariants]: string;
};
