import {
  Column,
  BuderWidget,
} from "buder";
import { createApp } from "vue";
import HelloWorld from "./helloworld.vue";

class _VueBridge extends BuderWidget {
  component: any;
  props: any;
  elId: string;
  constructor(component: any, props?: any) {
    super();
    this.component = component;
    this.props = props;
    const randomId = Math.random().toString(36).substring(2, 9);
    this.elId = randomId;
    this.id(this.elId);
  }
  render() {
    const el = super.render();
    createApp(this.component, this.props).mount(el);
    return el;
  }
}

const VueBridge = (component: any, props?: any) => {
  return new _VueBridge(component, props);
};

Column(VueBridge(HelloWorld, { text: "Hello, World!111" })).mount("#app");
