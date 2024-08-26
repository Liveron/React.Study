export default class Action<T, S> {
  constructor(public type: T, public payload?: S) {}
}
