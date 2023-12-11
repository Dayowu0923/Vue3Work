<template>
  <div class="main-panel">
    <div class="content">
      <div class="page-inner">
        <div class="page-header">
          <h4 class="page-title">
            <i class="fas fa-code"></i> {{ this.$store.getters.SubTitle }}
          </h4>
          <ul class="breadcrumbs">
            <li class="nav-home">
              <a href="#"><i class="fas fa-home"></i></a>
            </li>
            <li class="separator"><i class="fas fa-angle-double-right"></i></li>
            <li class="nav-item">{{ this.$store.getters.MainTitle }}</li>
            <li class="separator"><i class="fas fa-angle-double-right"></i></li>
            <li class="nav-item">{{ this.$store.getters.SubTitle }}</li>
          </ul>
        </div>
        <div class="card">
          <div class="card-body">
            <div class="form-row">
              <div class="form-group col-lg-4">
                <label>代碼類別：</label>
                <v-select
                  :options="MainDrop"
                  placeholder="請選擇"
                  label="name"
                  v-model="type"
                  :clearable="false"
                  :reduce="(option) => option.id"
                >
                  <template #no-options>没有選項</template>
                  <template #no-results>没有找到此關鍵字選項</template>
                </v-select>
              </div>

              <div class="form-group col-lg-4">
                <label>基本代碼：</label>
                <input type="text" v-model="no" class="form-control" />
              </div>
              <div class="form-group col-lg-4">
                <label>基本代碼名稱：</label>
                <input type="text" v-model="name" class="form-control" />
              </div>
            </div>
            <div class="text-center m-2">
              <button
                type="button"
                class="btn btn-outline-dark"
                @click="clearsearch"
              >
                <i class="fas fa-times"></i>清除重填
              </button>
              <button
                type="button"
                class="btn btn-primary ml-3"
                @click="search"
              >
                <i class="fas fa-search"></i>查詢
              </button>
            </div>
            <hr />
            <div class="d-flex justify-content-between mb-1">
              <div></div>
              <div>
                <button
                  type="submit"
                  class="btn btn-success"
                  data-toggle="modal"
                  data-target="#addnew"
                  @click="add"
                >
                  <i class="fas fa-plus"></i>新增
                </button>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>NO.</th>
                    <th>代碼</th>
                    <th>代碼類別</th>
                    <th>代碼名稱</th>
                    <th>更新人員</th>
                    <th>更新時間</th>
                    <th>功能</th>
                  </tr>
                </thead>
                <tr v-for="(item, index) in PageViewer" :key="index">
                  <td>{{ index + 1 + (page - 1) * 10 }}</td>
                  <td>{{ item.mname }}</td>
                  <td>{{ item.no }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.uuser }}</td>
                  <td>{{ item.udate }}</td>
                  <td>
                    <a
                      @click="edit"
                      :id="'edit' + item.id"
                      class="btn btn-primary"
                      ><i class="fas fa-pen"></i>編輯</a
                    >
                    <a
                      @click="del"
                      :id="'del' + item.id"
                      class="btn btn-danger ml3"
                      ><i class="fas fa-trash-alt"></i>刪除</a
                    >
                  </td>
                </tr>
              </table>
              <div class="pager" v-if="rows > 0">
                <div class="btn btn-primary" v-if="page != 1" @click="page = 1">
                  第一頁
                </div>
                <div
                  class="btn btn-primary"
                  v-if="page != 1"
                  @click="page != 1 ? page-- : page"
                >
                  上一頁
                </div>
                <PaginateMo
                  v-model="page"
                  :page-count="pageCount"
                  :page-range="10"
                  :margin-pages="0"
                  :prev-text="'上一頁'"
                  :next-text="'下一頁'"
                  :container-class="''"
                  :active-class="'active'"
                  :page-class="''"
                  :page-link-class="'normal'"
                  :prev-class="'dsn'"
                  :prev-link-class="'dsn'"
                  :next-class="'dsn'"
                  :next-link-class="'dsn'"
                  :break-view-class="'dsn'"
                  :break-view-link-class="'dsn'"
                >
                </PaginateMo>
                <div
                  class="btn btn-primary"
                  @click="page != pageCount ? page++ : pageCount"
                  v-if="page != pageCount"
                >
                  下一頁
                </div>
                <div
                  class="btn btn-primary"
                  @click="page = pageCount"
                  v-if="page != pageCount"
                >
                  最末頁
                </div>
                共 {{ rows }} 筆
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CogItemTable",
  data() {
    return {
      search_name: "",
      search_no: "",
      name: "",
      no: "",
      search_type: "",
      type: "",
      page: 1,
      totalcount: 0,
    };
  },
  created() {
    this.fetchData();
    this.fetchDdl();
  },
  watch: {
    changedata(value) {
      if (value === 1) {
        this.fetchData();
        this.$store.commit("cogitemstore/changeData", 0);
      }
    },
  },
  methods: {
    fetchDdl() {
      this.axios
        .get(this.$apiBaseUrl + "Cog1", {
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        })
        .then((response) => {
          this.$store.commit("cogitemstore/fetchDdl", response.data);
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 401) {
              this.$showAlertThen("請重新登入", "info", () => {
                this.$store.commit("UserChkNone");
                this.$router.push({ name: "login" });
              });
            } else {
              console.log(error);
              // 處理錯誤
            }
          }
        });
    },
    fetchData() {
      this.axios
        .get(this.$apiBaseUrl + "CogItem", {
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        })
        .then((response) => {
          this.$store.commit("cogitemstore/fetchData", response.data);
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 401) {
              this.$showAlertThen("請重新登入", "info", () => {
                this.$store.commit("UserChkNone");
                this.$router.push({ name: "login" });
              });
            } else {
              console.log(error);
              // 處理錯誤
            }
          }
        });
    },
    edit(e) {
      let id = e.currentTarget.id.replace("edit", "");
      let re = this.$store.state.cogitemstore.mainTable.find(
        (item) => item.id == id
      );
      this.$store.commit("cogitemstore/serData", re);
      $("#addnew").modal();
    },
    del(e) {
      let id = e.currentTarget.id.replace("del", "");
      this.$showConfirmationDialog("您確定是否刪除").then((result) => {
        if (result.isConfirmed) {
          this.axios
            .delete(this.$apiBaseUrl + "CogItem/" + id, {
              headers: { Authorization: `Bearer ${this.$store.state.token}` },
            })
            .then(() => {
              this.$showAlertThen("操作成功", "success", () => {
                this.fetchData();
              });
            })
            .catch((error) => {
              if (error.response.status === 401) {
                this.$showAlertThen("請重新登入", "info", () => {
                  this.$store.commit("UserChkNone");
                  this.$router.push({ name: "login" });
                });
              } else {
                console.log(error);
                // 處理錯誤
              }
            });
        }
      });
    },
    add() {
      this.$store.commit("cogitemstore/addData", -1);
      this.$nextTick(() => {
        this.$store.commit("cogitemstore/addData", 0);
      });
    },
    clearsearch() {
      this.page = 1;
      this.search_no = "";
      this.search_name = "";
      this.search_type = "";
      this.no = "";
      this.name = "";
      this.type = "";
    },
    search() {
      this.page = 1;
      this.search_no = this.no;
      this.search_name = this.name;
      this.search_type = this.type;
    },
  },
  computed: {
    filterTable() {
      let arr = this.$store.state.cogitemstore.mainTable;
      if (this.search_name !== "") {
        arr = arr.filter((item) => item.name.indexOf(this.search_name) >= 0);
      }
      if (this.search_no !== "") {
        arr = arr.filter((item) => item.no.indexOf(this.search_no) >= 0);
      }
      if (this.search_type !== "") {
        arr = arr.filter((item) => item.mid == this.search_type);
      }
      return arr;
    },
    MainDrop() {
      let arr = this.$store.state.cogitemstore.ddl;
      return arr;
    },
    PageViewer() {
      let arr = this.filterTable;
      let page = (this.page - 1) * 10;
      let pageN = this.page * 10;
      arr = arr.slice(page, pageN);
      return arr;
    },
    rows() {
      return this.filterTable.length;
    },
    changedata() {
      return this.$store.state.cogitemstore.change;
    },
    pageCount() {
      return Math.ceil(this.rows / this.$store.state.pagecount);
    },
  },
};
</script>
