import { useState } from 'react';

export default function useStateObject<Type>(initialStateObject: Type) {
  let [state, _setState] = useState(initialStateObject);
  // we intentionally allow setting a prop with any type of value!
  const setState = (prop: string | undefined, value: any = undefined) => {
    state = prop === undefined ? { ...state } : { ...state, [prop]: value };
    _setState(state);
  }
  const toReturn: [Type, Function] = [state, setState]
  return toReturn;
}

