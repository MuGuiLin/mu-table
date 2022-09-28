<script>
import { column } from "./mu-public";
import MuCells from "./mu-cells.vue";

export default {
  name: "mu-tbody",
  mixins: [column],
  components: {
    MuCells,
  },
  props: {
    prefix: String,
    colWidth: Object,
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
    fixed: {
      type: [Boolean, String],
      default: false,
    },
    columnsWidth: Object,
  },
  methods: {
    enter(i) {
      this.$parent.handleMouseIn(i);
    },
    leave(i) {
      this.$parent.handleMouseOut(i);
    },
  },
};
</script>

<template>
  <table border="0" cellspacing="0" cellpadding="0">
    <colgroup>
      <col v-for="(o, i) in thead" :key="i" :width="setCellWidth(o, i)" />
    </colgroup>
    <tbody :class="`${prefix}-tbody`" v-if="tbody.length">
      <tr
        v-for="(row, i) in tbody"
        :key="i"
        :class="row._isHover && 'tr-hover'"
        @mouseenter.stop="enter(i)"
        @mouseleave.stop="leave(i)"
      >
        <td
          v-for="(col, j) in thead"
          :key="j"
          :class="col.fixed ? `fixed-${col.fixed}` : ''"
          :style="setCellStyle(thead, col, j)"
        >
          <mu-cells
            :row="row"
            :col="col"
            :key="j"
            :index="i"
            :checked="row._isChecked"
          ></mu-cells>
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr class="no-data">
        <td rowspan="1" :colspan="thead.length">暂无数据</td>
      </tr>
    </tbody>
  </table>
</template>