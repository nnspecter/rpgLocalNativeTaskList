export const expValidation = (time: number, totalBoost: number): number => {
    const baseExp = time * 3;
    const totalExp = Math.round(baseExp + (baseExp * totalBoost) / 100);
    return totalExp
}