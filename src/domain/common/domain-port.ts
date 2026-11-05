export interface DomainPort<TIn, TOut> {
  handleAsync(input: TIn): Promise<TOut>;
}
