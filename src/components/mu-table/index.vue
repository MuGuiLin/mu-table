<script>
import MuThead from "./mu-thead.vue";
import MuTbody from "./mu-tbody.vue";
import MuTpage from "./mu-tpage.vue";
import { assist } from "./mu-public";

export default {
  name: "mu-table",
  mixins: [assist],
  components: {
    MuThead,
    MuTbody,
    MuTpage,
  },
  props: {
    thead: {
      type: Array,
      default: function () {
        return [];
      },
    },
    tbody: {
      type: Array,
      default: function () {
        return [];
      },
    },
    width: {
      type: [Number, String],
    },
    height: {
      type: [Number, String],
    },
    border: {
      type: Boolean,
      default: false,
    },
    stripe: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    total: {
      type: [Number, String],
      default: 0,
    },
    page: {
      type: [Number, String],
      default: 1,
    },
  },
  data() {
    return {
      prefix: "mu-table",
      left: 0,
      head: this.setHead(),
      body: this.setBody(),
      checkeAll: false,
      tableWidth: 0,
      columnsWidth: {},
    };
  },
  methods: {
    setHead() {
      let data = [];
      this.thead.forEach((row, index) => {
        const oRow = this.deepCopy(row);
        oRow.sorter && (oRow._sortType = 0);
        oRow._index = index;
        data[index] = oRow;
      });
      return data;
    },
    setBody(ndata) {
      let data = [];
      (this.tbody || ndata).forEach((row, index) => {
        const oRow = this.deepCopy(row);
        oRow._isChecked = false;
        oRow._isHover = false;
        oRow._sortType = 0;
        data[index] = oRow;
      });
      return data;
    },
    isSelectAll() {
      this.checkeAll = this.body?.length
        ? this.body.every(function (o) {
            return o._isChecked;
          })
        : false;
    },
    toggleSelect(index) {
      let data = {};
      for (let i in this.body) {
        if (parseInt(i) === index) data = this.body[i];
      }
      this.body[index]._isChecked = !data._isChecked;
      this.isSelectAll();
      this.$emit("change", data, index);
    },

    selectAll(status) {
      this.body.forEach((o) => {
        o._isChecked = status;
      });
      this.$emit("select", status ? this.body : []);
    },
    sortData(data, type, index) {
      const head = this.head[index];
      const key = head.key;
      data.sort((a, b) => {
        if ("function" === this.typeOf(head?.sorter)) {
          return head.sorter(a[key], b[key], type);
        } else {
          if (1 === type) {
            return a[key] > b[key] ? 1 : -1;
          } else if (2 === type) {
            return a[key] < b[key] ? 1 : -1;
          }
        }
      });
      return data;
    },
    handleSort(index, type) {
      for (let i in this.head) {
        this.head[i].sorter && (this.head[i]._sortType = 0);
      }
      if (type) {
        this.body = this.sortData(this.deepCopy(this.body), type, index);
      }
      this.head[index]._sortType = type;
    },

    handleMouseIn(index) {
      if (this.body[index]._isHover) return;
      this.body[index]._isHover = true;
    },
    handleMouseOut(index) {
      this.body[index]._isHover = false;
    },
    bodyScroll(event) {
      if (this.thead[0].fixed || this.thead[this.thead.length - 1].fixed) {
        this.left = -event.target.scrollLeft;
      }
    },
    winResize() {
      this.$nextTick(() => {
        const allWidth = !this.thead.some((cell) => !cell.width);
        if (allWidth) {
          this.tableWidth = this.thead
            .map((cell) => cell.width)
            .reduce((a, b) => a + b);
        } else {
          this.tableWidth =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth ||
            parseInt(this.getStyle(this.$el, "width")) - 1;
        }
        this.columnsWidth = {};
        this.$nextTick(() => {
          let columnsWidth = {};
          let autoWidthIndex = -1;
          if (allWidth)
            autoWidthIndex = this.cloneColumns.findIndex((cell) => !cell.width);
          if (this.body.length) {
            const $td = this.$refs.tbody.$el
              .querySelectorAll("tbody tr")[0]
              .querySelectorAll("td");
            for (let i = 0; i < $td.length; i++) {
              const column = this.cloneColumns[i];
              let width = parseInt(this.getStyle($td[i], "width"));
              if (i === autoWidthIndex) {
                width = parseInt(this.getStyle($td[i], "width")) - 1;
              }
              if (column.width) width = column.width;
              this.cloneColumns[i]._width = width;
              columnsWidth[column._index] = {
                width: width,
              };
            }
            this.columnsWidth = columnsWidth;
          }
        });
      });
    },
    pagination(page) {
      this.$emit("changePage", page);
    },
  },
  mounted() {
    this.winResize();
    // window.addEventListener("resize", this.winResize, false);
  },
  computed: {
    styles() {
      const style = {};
      if (this.width) style.width = `${this.width}px`;
      return style;
    },
    classs() {
      return [
        `${this.prefix}`,
        {
          [`${this.prefix}-border`]: this.border,
          [`${this.prefix}-stripe`]: this.stripe,
        },
      ];
    },
    headStyle() {
      const style = {};
      if (this.tableWidth !== 0) style.width = `${this.tableWidth}px`;
      style.left = `${this.left}px`;
      return style;
    },
    bodyStyle() {
      const style = {};
      if (this.height !== 0) style.height = `${this.height}px`;
      return style;
    },
    tableStyle() {
      const style = {};
      if (this.tableWidth !== 0) style.width = `${this.tableWidth}px`;
      return style;
    },
  },
  watch: {
    tbody(data) {
      this.body = this.setBody(data);
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.winResize, false);
  },
};
</script>

<template>
  <article class="mu-table-wrapper" :style="styles">
    <section :class="classs">
      <header :class="`${prefix}-head`">
        <mu-thead
          :prefix="prefix"
          :thead="head"
          :tbody="body"
          :style="headStyle"
          :checked="checkeAll"
          class="mu-thead"
        >
        </mu-thead>
      </header>
      <main :class="`${prefix}-body`" :style="bodyStyle" @scroll="bodyScroll">
        <mu-tbody
          ref="tbody"
          :prefix="prefix"
          :thead="head"
          :tbody="body"
          :style="tableStyle"
        ></mu-tbody>
      </main>
      <aside v-if="loading" :class="`${prefix}-load`">
        <div class="tload">加载中</div>
      </aside>
    </section>
    <section v-if="total && body.length" class="mu-tpage">
      <mu-tpage
        prefix="mu-tpage"
        align="right"
        :total="total"
        :page="page"
        :change="pagination"
      ></mu-tpage>
    </section>
  </article>
</template>

<!-- <style lang="less" scoped> -->
<style lang="less">
@import url("./mu-style.less");
</style>
