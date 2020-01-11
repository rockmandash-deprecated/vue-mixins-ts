import Vue, { VueConstructor, ComponentOptions } from 'vue';

type VueMixin = VueConstructor | ComponentOptions<never>;

type UnionToIntersection<U> = (U extends any
? (k: U) => void
: never) extends (k: infer I) => void
  ? I
  : never;

type ExtractInstance<T> = T extends VueConstructor<infer V>
  ? V
  : T extends ComponentOptions<infer V>
  ? V
  : never;

type MixedVueConstructor<Mixins extends VueMixin[]> = Mixins extends (infer T)[]
  ? VueConstructor<UnionToIntersection<ExtractInstance<T>> & Vue>
  : never;

function mixins<Mixins extends VueMixin[]>(
  ...mixins: Mixins
): MixedVueConstructor<Mixins> {
  return Vue.extend({ mixins: mixins as any }) as any;
}

export { mixins };
