<template>
  <div class="about">
    <h1>This is mu-table demo!</h1>
    <a
      href="https://github.com/MuGuiLin/mu-table"
      target="_blank"
      rel="noopener noreferrer"
      >https://github.com/MuGuiLin/mu-table</a
    >
    <br />
    <br />
    <mu-table
      :thead="columns"
      :tbody="data"
      :loading="loading"
      @change="change"
      @select="select"
      @changePage="changePage"
      :total="10"
      stripe
      border
      width="1280"
      height="300"
      style="margin: auto"
    ></mu-table>
  </div>
</template>
<script>
import MuTable from "@/components/mu-table";
export default {
  components: {
    MuTable,
  },
  data() {
    return {
      columns: [
        {
          type: "selection",
          width: 80,
          fixed: "left",
        },
        {
          type: "index",
          width: 100,
          fixed: "left",
        },
        {
          title: "姓名",
          width: 120,
          key: "name",
          fixed: "left",
        },
        {
          title: "性别",
          key: "sex",
        },
        {
          title: "年龄",
          key: "age",
          sorter: true,
        },
        {
          title: "手机",
          key: "mobile",
        },
        {
          title: "地址",
          key: "address",
          width: 160,
        },
        {
          title: "状态",
          fixed: "right",
          width: 150,
          key: "status",
          render: (h, params) => {
            const color = ["#01BB90", "#F35353", "#FF8130", "#0099FF"];
            return h(
              "span",
              { style: { color: color[parseInt(Math.random() * 4)] } },
              params.row.status
            );
          },
        },
        {
          title: "日期",
          key: "date",
          fixed: "right",
          width: 200,
          sorter: true,
        },
        {
          title: "操作",
          fixed: "right",
          width: 360,
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  fontSize: "10px",
                },
              },
              [
                h(
                  "mu-button",
                  {
                    props: {
                      type: "primary",
                    },
                    on: {
                      click: () => {
                        this.data[0].name = 6666666666
                        console.log(this.data);
                      },
                    },
                  },
                  "编辑"
                ),
                h(
                  "mu-button",
                  {
                    props: {
                      type: "error",
                      circle: true,
                      // disabled: true,
                    },
                    on: {
                      click: () => {
                        console.log(params);
                      },
                    },
                  },
                  "删除"
                ),
                h(
                  "mu-button",
                  {
                    props: {
                      type: "warning",
                      size: "small",
                      // long: true,
                    },
                    style: {
                      fontSize: "10px",
                    },
                    on: {
                      click: () => {
                        console.log(params);
                      },
                    },
                  },
                  "详情"
                ),
                h(
                  "mu-button",
                  {
                    props: {
                      type: "success",
                      size: "large",
                      circle: true,
                    },
                    on: {
                      click: () => {
                        console.log(params);
                      },
                    },
                  },
                  "查看"
                ),
                h(
                  "mu-button",
                  {
                    props: {
                      type: "ghost",
                    },
                    style: {
                      fontSize: "10px",
                    },
                    on: {
                      click: () => {
                        console.log(params);
                      },
                    },
                  },
                  "其他"
                ),
              ]
            );
          },
        },
      ],
      data: [],
      loading: true,
    };
  },
  created() {
    setTimeout(() => {
      this.data = [
        {
          name: "名字1",
          sex: "男",
          age: 18,
          mobile: "cell phone",
          address: "居住地址居住地址1",
          status: "成功",
          date: "2022-10-01",
        },
        {
          name: "名字2",
          sex: "男",
          age: 31,
          mobile: "cell phone",
          address: "居住地址居住地址2",
          status: "异常",
          date: "2022-10-01",
        },
        {
          name: "名字3",
          sex: "女",
          age: 26,
          mobile: "cell phone",
          address: "居住地址居住地址3",
          status: "失败",
          date: "2022-09-13",
        },
        {
          name: "名字4",
          sex: "女",
          age: 56,
          mobile: "cell phone",
          address: "居住地址居住地址4",
          status: "警告",
          date: "2022-08-20",
        },
        {
          name: "名字5",
          sex: "男",
          age: 9,
          mobile: "cell phone",
          address: "居住地址居住地址5",
          status: "警告",
          date: "2022-08-20",
        },
        {
          name: "名字6",
          sex: "女",
          age: 43,
          mobile: "cell phone",
          address: "居住地址居住地址6",
          status: "警告",
          date: "2022-08-13",
        },
        {
          name: "名字7",
          sex: "男",
          age: 33,
          mobile: "cell phone",
          address: "居住地址居住地址7",
          status: "警告",
          date: "2022-10-10",
        },
        {
          name: "名字8",
          sex: "女",
          age: 25,
          mobile: "cell phone",
          address: "居住地址居住地址8",
          status: "警告",
          date: "2022-09-26",
        },
      ];
      this.loading = false;
    }, 3000);
  },
  methods: {
    change(val, index) {
      console.log("单选：", val, index);
    },
    select(val) {
      console.log("全选：", val);
    },
    changePage(page) {
      console.log("分页：", page);
    },
  },
};
</script>
