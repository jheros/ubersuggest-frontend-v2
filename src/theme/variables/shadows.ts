const customShadows = ['0px 10px 32px rgba(20, 20, 20, 0.08)', '-6px 10px 32px rgba(20, 20, 20, 0.08)'];

export const shadows = [...customShadows, ...Array(25 - customShadows.length).fill('')];
