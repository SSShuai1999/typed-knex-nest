interface URItoKind<A> {
  Array: Array<A>;
}

interface URItoKind<A> {
  Tree: Tree<A>;
}

interface URItoKind<A> {
  Set: Set<A>;
}

interface URItoKind<A> {
  Promise: Promise<A>;
}

interface URItoKind2<A, B> {
  Map: Map<A, B>;
}

type URIS = keyof URItoKind<unknown>;
type URIS2 = keyof URItoKind2<unknown, unknown>;

type Kind<F extends URIS, A> = URItoKind<A>[F];

type Tree<A> = {
  value: A;
  tag: string;
  children: Tree<A>;
};

interface Mappable<F extends URIS> {
  readonly map: <A, B>(f: (a: A) => B) => (as: Kind<F, A>) => Kind<F, B>;
}

const mappableArray: Mappable<'Array'> = {
  map: (f) => (as) => as.map(f),
};

const mappableSet: Mappable<'Set'> = {
  map: (f) => (as) => new Set(Array.from(as).map(f)),
};
