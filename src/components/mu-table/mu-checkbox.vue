<script>
const prefix = "mu-checkbox";
export default {
  name: prefix,
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    change(event) {
      if (this.disabled) {
        return false;
      }
      this.$parent.change(event.target.checked);
    },
  },
};
</script>

<template>
  <input
    type="checkbox"
    class="mu-checkbox"
    :checked="checked"
    :disabled="disabled"
    @change="change"
  />
</template>

<style scoped lang="less">
.mu-checkbox {
  position: relative;
  margin: 5px;
  width: 16px;
  height: 16px;
  font-size: 14px;
  border: 0;
  background: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

input[type="checkbox"].mu-checkbox:after {
  content: "";
  position: absolute;
  top: -1px;
  left: -1px;
  display: block;
  width: 16px;
  height: 16px;
  color: white;
  border-radius: 3px;
  visibility: visible;
  background-color: white;
  border: 1px solid #dcdee2;
}

input[type="checkbox"].mu-checkbox:checked::before {
  content: "";
  position: absolute;
  top: -1px;
  left: -1px;
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 3px;
  border-color: #0798ff;
  background-color: #0798ff;
}

input[type="checkbox"].mu-checkbox:checked:after {
  content: "";
  position: absolute;
  top: 2px;
  left: 5px;
  display: table;
  width: 4px;
  height: 8px;
  border: 2px solid white;
  border-top: 0;
  border-left: 0;
  border-radius: 0;
  background-color: #0798ff;
  transform: rotate(45deg);
}
</style>
