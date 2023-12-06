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
    ser_data() {
      return this.$store.state.cog1store.edit_id;
    },
  },
  watch: {
    ser_data(old_value) {
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
      const Postdata = {
        no: this.txt_no,
        name: this.txt_name,
        id: this.$store.state.cog1store.edit_id,
      };
      const uri =
        this.$store.state.cog1store.edit_id == 0
          ? this.$apiBaseUrl + "Post/Cog1"
          : this.$apiBaseUrl +
            "Put/Cog1/" +
            this.$store.state.cog1store.edit_id;
      this.axios
        .post(uri, Postdata)
        .then((response) => {
          this.$store.commit("UserChk", response.data);
          this.$swal
            .fire({
              text: "登入成功",
              icon: "success",
              confirmButtonText: "確定",
              confirmButtonColor: "#3085d6",
            })
            .then(() => {
              this.$router.push({ name: "cog1" });
            });
        })
        .catch((error) => {
          this.$store.commit("UserChkNone");
          if (error.response.status === 400 || error.response.status === 401) {
            this.$swal.fire({
              text: error.response.data,
              icon: "error",
              confirmButtonText: "確定",
              confirmButtonColor: "#3085d6",
            });
          } else {
            console.log(error);
            // 處理錯誤
          }
          this.refreshCaptcha();
          this.captchatxt = "";
          this.account = "";
          this.password = "";
        });
    },
  },
};
</script>
