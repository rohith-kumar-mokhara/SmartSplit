// interact.d.ts
declare module "../../../smart/interact.js" {
    export function createGroup(participants: any[], total_amount: number, payer: string): Promise<void>;
  }
  