<template>
  <div
    class="modal hide fade"
    id="addnew"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
      <div class="modal-content">
        <div class="modal-header text-white bg-primary">
          <h3 class="modal-title">
            {{ this.$store.state.cog1store.edit_id == 0 ? "新增" : "修改" }}
          </h3>
          <button
            type="button"
            class="close text-white"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-row">
            <div class="form-group col-12">
              <label>類別代碼：</label>
              <input type="text" v-model="txt_no" class="form-control" />
            </div>
            <div class="form-group col-12">
              <label>類別名稱：</label>
              <input type="text" v-model="txt_name" class="form-control" />
            </div>
          </div>
        </div>
        <div class="modal-footer text-center">
          <button
            type="button"
            class="btn btn-outline-dark"
            data-dismiss="modal"
            aria-label="Close"
          >
            取消
          </button>
          <button type="button" class="btn btn-dark" @click="save">確定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Cog1Box",
  data() {
    return {
      txt_name: "",
      txt_no: "",
    };
  },
  computed: {
    serData() {
      return this.$store.state.cog1store.edit_id;
    },
  },
  watch: {
    serData(old_value) {
      if (old_value === 0) {
        this.txt_no = "";
        this.txt_name = "";
      } else {
        this.txt_no = this.$store.state.cog1store.sel_data.no;
        this.txt_name = this.$store.state.cog1store.sel_data.name;
      }
    },
  },
  methods: {
    save() {
      let err = "";
      if (this.txt_no === "") err += "請輸入類別代碼<br>";
      if (this.txt_name === "") err += "請輸入類別名稱<br>";
      if (err !== "") {
        this.$showAlertThen(err, "info", () => {});
        return false;
      }
      const Postdata = {
        no: this.txt_no,
        name: this.txt_name,
        id: this.$store.state.cog1store.edit_id,
      };
      // 構建請求配置
      const config = {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      };
      const isEdit = this.$store.state.cog1store.edit_id !== 0;
      const uri =
        this.$apiBaseUrl +
        (isEdit ? `Cog1/${this.$store.state.cog1store.edit_id}` : "Cog1");
      // 根據是創建還是更新來選擇 HTTP 方法
      const requestMethod = isEdit ? this.axios.put : this.axios.post;

      requestMethod(uri, Postdata, config)
        .then(() => {
          this.$showAlertThen("操作成功", "success", () => {
            this.$store.commit("cog1store/changeData", 1);
            $("#addnew").modal("hide");
          });
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 401) {
              this.$showAlertThen("請重新登入", "info", () => {
                this.$store.commit("UserChkNone");
                this.$router.push({ name: "login" });
              });
            }
          }
        });
    },
  },
};
</script>
