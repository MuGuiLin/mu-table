<script>
import { hasParam } from "./mu-public";
const prefix = "mu-btn";

export default {
  name: "mu-botton",
  props: {
    type: {
      validator(value) {
        return hasParam(value, [
          "primary",
          "success",
          "error",
          "warning",
          "ghost",
          "text",
        ]);
      },
    },
    size: {
      validator(value) {
        return hasParam(value, ["small", "large"]);
      },
    },
    long: {
      type: Boolean,
      default: false,
    },
    circle: {
      type: Boolean,
      default: false,
    },
    disabled: Boolean,
    htmlType: {
      default: "button",
      validator(value) {
        return hasParam(value, ["button", "submit", "reset"]);
      },
    },
  },
  computed: {
    className() {
      return [
        `${prefix}`,
        {
          [`${prefix}-${this.type}`]: !!this.type,
          [`${prefix}-${this.size}`]: !!this.size,
          [`${prefix}-long`]: this.long,
          [`${prefix}-circle`]: this.circle,
        },
      ];
    },
  },
  methods: {
    click(event) {
      this.$emit("click", event);
    },
  },
};
</script>

<template>
  <button
    :type="htmlType"
    :class="className"
    :disabled="disabled"
    @click="click"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
button.mu-btn {
  margin: 3px;
  padding: 3px 12px;
  min-height: 25px;
  font-size: 13px;
  background: #eee;
  border: 1px solid #dcdee2;
  border-radius: 3px;
  box-shadow: -2px 0px 6px 0px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  -webkit-appearance: button;
}

button.mu-btn[disabled],
button.mu-btn[disabled] > * {
  color: #c5c8ce;
  background: #f7f7f7;
  cursor: not-allowed;
  /* pointer-events: none; */
}

button.mu-btn:hover {
  opacity: 0.8;
}

button.mu-btn-long {
  display: block;
  width: 100%;
}

button.mu-btn-ghost {
  background: 0 0;
  border-style: dashed;
}

button.mu-btn-circle {
  border-radius: 32px;
}

button.mu-btn-text {
  color: #515a6e;
  background-color: transparent;
  border-color: transparent;
  box-shadow: none;
}

button.mu-btn-text:hover {
  color: #0099ff;
  opacity: 1;
}

button.mu-btn-primary {
  color: #0099ff;
  background: rgba(8, 152, 255, 0.2);
}

button.mu-btn-success {
  color: #01bb90;
  background: rgba(1, 188, 160, 0.2);
}

button.mu-btn-error {
  color: #ed4014;
  background: rgba(258, 66, 20, 0.2);
}

button.mu-btn-warning {
  color: #f90;
  background: rgba(255, 168, 0, 0.2);
}

button.mu-btn-large {
  padding: 5px 16px;
  font-size: 14px;
}

button.mu-btn-small {
  padding: 0px 8px;
  font-size: 12px;
}
</style>
