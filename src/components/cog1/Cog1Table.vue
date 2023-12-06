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
              <div class="form-group col-lg-3">
                <label>類別代碼：</label>
                <input type="text" v-model="no" class="form-control" />
              </div>
              <div class="form-group col-lg-3">
                <label>類別名稱：</label>
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
                    <th>類別代碼</th>
                    <th>類別名稱</th>
                    <th>更新人員</th>
                    <th>更新時間</th>
                    <th>功能</th>
                  </tr>
                </thead>
                <tr v-for="(item, index) in filterTable" :key="index">
                  <td>{{ index + 1 }}</td>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cog1Table",
  data() {
    return {
      search_name: "",
      search_no: "",
      name: "",
      no: "",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.axios
        .get(this.$apiBaseUrl + "Cog1", {
          headers: { Authorization: `Bearer ${this.$store.state.token}` },
        })
        .then((response) => {
          this.$store.commit("cog1store/fetchData", response.data);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.$swal
              .fire({
                text: "請重新登入",
                icon: "info",
                confirmButtonText: "確定",
                confirmButtonColor: "#3085d6",
              })
              .then(() => {
                this.$store.commit("UserChkNone");
                this.$router.push({ name: "login" });
              });
          } else {
            console.log(error);
            // 處理錯誤
          }
        });
    },
    edit(e) {
      let id = e.currentTarget.id.replace("edit", "");
      let re = this.$store.state.cog1store.mainTable.find(
        (item) => item.id == id
      );
      this.$store.commit("cog1store/serData", re);
      $("#addnew").modal();
    },
    del(e) {
      let id = e.currentTarget.id.replace("del", "");
      console.log(id);
    },
    add() {
      this.$store.commit("cog1store/addData", -1);
      this.$nextTick(() => {
        this.$store.commit("cog1store/addData", 0);
      });
    },
    clearsearch() {
      this.search_no = "";
      this.search_name = "";
      this.no = "";
      this.name = "";
    },
    search() {
      this.search_no = this.no;
      this.search_name = this.name;
    },
  },
  computed: {
    filterTable() {
      let arr = this.$store.state.cog1store.mainTable;
      if (this.search_name !== "") {
        arr = arr.filter((item) => item.name.indexOf(this.search_name) >= 0);
      }
      if (this.search_no !== "") {
        arr = arr.filter((item) => item.no.indexOf(this.search_no) >= 0);
      }
      return arr;
    },
    rows() {
      return this.filterTable.length;
    },
  },
};
</script>
