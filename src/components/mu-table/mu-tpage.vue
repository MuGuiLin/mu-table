<script>
export default {
  name: "mu-tpage",
  props: {
    prefix: String,
    total: {
      type: [Number, String],
      default: 1,
    },
    size: {
      type: [Number, String],
      default: 10,
    },
    page: {
      type: [Number, String],
      default: 1,
    },
    align: {
      type: String,
      default: "right",
    },
    change: Function,
  },
  data() {
    return {
      active: this.page,
    };
  },
  computed: {
    firstPageClasses() {
      return [
        `${this.prefix}-item`,
        {
          [`${this.prefix}-active`]: this.active === 1,
        },
      ];
    },
    lastPageClasses() {
      return [
        `${this.prefix}-item`,
        {
          [`${this.prefix}-active`]: this.active === this.total,
        },
      ];
    },
    prevClasses() {
      return [
        `${this.prefix}-prev`,
        {
          [`${this.prefix}-disabled`]: this.active === 1,
        },
      ];
    },
    nextClasses() {
      return [
        `${this.prefix}-next`,
        {
          [`${this.prefix}-disabled`]: this.active === this.total,
        },
      ];
    },
  },
  methods: {
    isNumber(value) {
      return /^[1-9][0-9]*$/.test(value + "");
    },
    changePage(page) {
      if (page > this.total) {
        page = this.total;
      }
      if (page) {
        this.change(page);
        this.active = page;
      }
    },
    prevPage() {
      const active = this.active;
      if (active <= 1) {
        return false;
      }
      this.changePage(active - 1);
    },
    nextPage() {
      const active = this.active;
      if (active >= this.total) {
        return false;
      }
      this.changePage(active + 1);
    },
    fastPrev() {
      const page = this.active - 5;
      if (page > 0) {
        this.changePage(page);
      } else {
        this.changePage(1);
      }
    },
    fastNext() {
      const page = this.active + 5;
      if (page > this.total) {
        this.changePage(this.total);
      } else {
        this.changePage(page);
      }
    },
    keyDown(e) {
      const key = e.keyCode;
      const condition =
        (key >= 48 && key <= 57) ||
        (key >= 96 && key <= 105) ||
        key == 8 ||
        key == 37 ||
        key == 39;
      if (!condition) {
        e.preventDefault();
      }
    },
    keyUp(e) {
      const key = e.keyCode;
      const val = parseInt(e.target.value);
      if (key === 38) {
        this.prevPage();
      } else if (key === 40) {
        this.nextPage();
      } else if (key == 13) {
        let page = 1;
        if (val > this.total) {
          page = this.total;
        } else if (val <= 0) {
          page = 1;
        } else {
          page = val;
        }
        this.changePage(page);
      }
    },
  },
};
</script>

<template>
  <ul :class="`${prefix}-box`">
    <li :class="prevClasses" title="上一页" @click="prevPage"></li>
    <li :class="firstPageClasses" @click="changePage(1)">1</li>
    <li
      :class="[prefix + '-prevs']"
      v-if="active - 3 > 1"
      title="上一组"
      @click="fastPrev"
    >
      •••
    </li>
    <li
      :class="[prefix + '-item']"
      v-if="active - 2 > 1"
      @click="changePage(active - 2)"
    >
      {{ active - 2 }}
    </li>
    <li
      :class="[prefix + '-item']"
      v-if="active - 1 > 1"
      @click="changePage(active - 1)"
    >
      {{ active - 1 }}
    </li>
    <li
      :class="[prefix + '-item', prefix + '-active']"
      v-if="active != 1 && active != total"
    >
      {{ active }}
    </li>
    <li
      :class="[prefix + '-item']"
      v-if="active + 1 < total"
      @click="changePage(active + 1)"
    >
      {{ active + 1 }}
    </li>
    <li
      :class="[prefix + '-item']"
      v-if="active + 2 < total"
      @click="changePage(active + 2)"
    >
      {{ active + 2 }}
    </li>
    <li
      :class="[prefix + '-nexts']"
      v-if="active + 3 < total"
      title="下一组"
      @click="fastNext"
    >
      •••
    </li>
    <li :class="lastPageClasses" v-if="total > 1" @click="changePage(total)">
      {{ total }}
    </li>
    <li :class="nextClasses" title="下一页" @click="nextPage"></li>
    <li>
      前往<input
        type="text"
        autocomplete="off"
        spellcheck="false"
        :value="active"
        @keydown="keyDown"
        @keyup.enter="keyUp"
        @change="keyUp"
      />页
    </li>
  </ul>
</template>

<style lang="less" scoped>
@color-blue: #0798ff;
@color-gray: #666;
@border-solid-gray: 1px solid #e8e8e8;
@border-solid-boxs: 1px solid #dcdee2;

.mu-tpage {
  &-box {
    margin: 0;
    padding: 5px 0;
    float: right;
    display: flex;
    line-height: 26px;

    > li {
      margin: 5px;
      min-width: 26px;
      height: 26px;
      line-height: 26px;
      font-size: 14px;
      color: @color-gray;
      list-style: none;
      text-align: center;
      vertical-align: middle;
      font-family: Arial;
      font-weight: 500;
      background: white;
      border-radius: 3px;
      border: @border-solid-boxs;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      cursor: pointer;

      &:hover {
        color: @color-blue;
        border-color: @color-blue;

        &::after {
          border-color: @color-blue;
        }
      }

      > input {
        margin: auto 5px;
        padding: 0 4px;
        width: 50px;
        height: 26px;
        text-align: center;
        border-radius: 3px;
        border: @border-solid-boxs;
        outline: none;
      }

      &:last-child,
      &:last-child:hover {
        color: @color-gray;
        border: none;
        background: none;
      }
    }

    .mu-tpage-prev {
      position: relative;

      &::after {
        content: "";
        position: absolute;
        top: 8px;
        left: 11px;
        width: 10px;
        height: 10px;
        border: 1px solid #666;
        border-left-width: 0;
        border-bottom-width: 0;
        transform: matrix(-0.71, 0.71, 0.71, 0.71, 0, 0);
      }
    }

    .mu-tpage-next {
      position: relative;

      &::after {
        content: "";
        position: absolute;
        top: 8px;
        right: 11px;
        width: 10px;
        height: 10px;
        border: 1px solid #666;
        border-left-width: 0;
        border-bottom-width: 0;
        transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
        // transform          : matrix(0.71, -0.71, 0.71, 0.71, 0, 0); // top
        // transform          : matrix(0.71, 0.71, 0.71, -0.71, 0, 0); // botton
      }
    }

    .mu-tpage-active {
      color: white !important;
      font-size: 15px !important;
      font-weight: bold !important;
      border-color: @color-blue !important;
      background: @color-blue !important;
    }

    .mu-tpage-disabled {
      border-color: #dcdee2 !important;
      cursor: not-allowed;

      &::after {
        border-color: #dcdee2 !important;
      }
    }
  }
}
</style>
