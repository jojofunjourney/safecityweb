// src/types/soda-js.d.ts

declare module "soda-js" {
  export interface SodaConsumerOptions {
    apiToken?: string;
  }

  export class Consumer {
    constructor(domain: string, options?: SodaConsumerOptions);
    query(): Query;
  }

  export class Query {
    withDataset(identifier: string): this;
    limit(limit: number): this;
    where(condition: string): this;
    select(fields: string): this;
    getRows(): {
      on(event: "success", callback: (rows: any[]) => void): this;
      on(event: "error", callback: (error: any) => void): this;
    };
    getQuery(): string;
  }

  const Soda: {
    Consumer: typeof Consumer;
  };

  export default Soda;
}
