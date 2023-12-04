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
          <h3 class="modal-title">新增</h3>
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
              <input type="text" class="form-control" />
            </div>
            <div class="form-group col-12">
              <label>類別名稱：</label>
              <input type="text" class="form-control" />
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
          <button type="button" class="btn btn-dark">確定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Cog1Box",
};
</script>
