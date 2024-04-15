import {
  Column,
  BuderWidget,
  StateValue,
  BuderState,
  State,
  Button,
  Text,
} from "buder";
import { createApp, h, ref, Ref, watch } from "vue";
import HelloWorld from "./helloworld.vue";

class _VueBridge extends BuderWidget {
  component: any;
  props?: StateValue<Record<string, StateValue<any>>>;
  slot?: any;
  elId: string;
  constructor(
    component: any,
    props?: StateValue<Record<string, StateValue<any>>>,
    slot?: any
  ) {
    super();
    this.component = component;
    this.props = props;
    this.slot = slot;
    const randomId = Math.random().toString(36).substring(2, 9);
    this.elId = randomId;
    this.id(this.elId);
  }
  render() {
    const el = super.render();
    function mountEl(
      component: any,
      slot: any,
      el: HTMLElement,
      props?: Record<string, any>
    ) {
      const transformedProps: Record<string, any> = {};
      for (const prop in props) {
        const value = props[prop];
        if (value instanceof BuderState) {
          transformedProps[prop] = value.value;
        } else {
          transformedProps[prop] = value;
        }
      }
      const app = createApp(h(component, transformedProps, slot)).mount(el);
      if (props) {
        // const refProps: Record<string, Ref<any>> = {};
        for (const prop in props) {
          const value = props[prop];
          if (value instanceof BuderState) {
            // const refer = (refProps[prop] = ref(value.value));
            value.init((newValue) => {
              props[prop] = newValue;
              app.$.props[prop] = newValue;
              app.$forceUpdate();
            });
          }
        }
      }
      return app;
    }
    if (this.props instanceof BuderState) {
      const app = mountEl(this.component, this.slot, el, this.props.value);
      this.props.init((props) => {
        app.$.props = props;
        app.$forceUpdate();
      });
    } else {
      mountEl(this.component, this.slot, el, this.props);
    }

    return el;
  }
}

const VueBridge = (
  component: any,
  props?: StateValue<Record<string, StateValue<any>>>,
  slot?: any
) => {
  return new _VueBridge(component, props, slot);
};

const counter = State("0");

Column(
  VueBridge(HelloWorld, { text: counter }),
  Text(counter),
  Button("Increment").event({
    click: () => counter.set(String(Number(counter.value) + 1)),
  }).style({ margin: "10px", padding: "10px", borderRadius: "5px" })
).center.mount("#app");
