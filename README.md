# vue-mixins-ts

## Description

1. This library has utility function `mixins()` to help you write type safe components.
2. You can easily type `this.mixin...` in your component, and you'll see all the property you can use.
3. All the mixins are factory, you can pass custom properties like debounce and throttle (by lodash).
4. SSR, Nuxt.js Compatible

❌ namespace clashing -> fixed by prefixing mixin keyword ✅

❌ unclear property sources -> fixed by TypeScript ✅

## Usage

`yarn add vue-mixins-ts`

`npm install vue-mixins-ts`

## Docs

### Sensors

- [`mixinWindowSize`](./src/mixins/sensors/mixinWindowSize/Example.vue) &mdash; tracks `Window` dimensions.
- [`mixinMedia`](./src/mixins/sensors/mixinMedia/Example.vue) &mdash; tracks state of a CSS media query.
- [`mixinMousePositionAtPage`](./src/mixins/sensors/mixinMousePositionAtPage/Example.vue) &mdash; tracks state of mouse position.
- [`mixinPageLeave`](./src/mixins/sensors/mixinPageLeave/Example.vue) &mdash; triggers when mouse leaves page boundaries.