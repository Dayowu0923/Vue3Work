<template>
  <div class="main-panel">
    <div class="content">
      <div class="page-inner">
        <div class="page-header">
          <h4 class="page-title">
            <i class="fas fa-code"></i> 基本代碼類別維護
          </h4>
          <ul class="breadcrumbs">
            <li class="nav-home">
              <a href="#"><i class="fas fa-home"></i></a>
            </li>
            <li class="separator"><i class="fas fa-angle-double-right"></i></li>
            <li class="nav-item">代碼作業</li>
            <li class="separator"><i class="fas fa-angle-double-right"></i></li>
            <li class="nav-item">基本代碼類別維護</li>
          </ul>
        </div>
        <div class="card">
          <div class="card-body">
            <div class="form-row">
              <div class="form-group col-lg-3">
                <label>類別代碼：</label>
                <input type="text" class="form-control" />
              </div>
              <div class="form-group col-lg-3">
                <label>類別名稱：</label>
                <input type="text" class="form-control" />
              </div>
              <div class="form-group col-lg-3">
                <label>異動人員：</label>
                <input type="text" class="form-control" />
              </div>
              <div class="form-group col-lg-3">
                <label>異動日期：</label>
                <div
                  class="input-group"
                  id="datetimepicker2"
                  data-target-input="nearest"
                >
                  <input
                    type="text"
                    class="form-control datetimepicker-input"
                    data-target="#datetimepicker2"
                  />
                  <div
                    class="input-group-append"
                    data-target="#datetimepicker2"
                    data-toggle="datetimepicker"
                  >
                    <div class="input-group-text">
                      <i class="far fa-calendar-alt"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div class="d-flex justify-content-between mb-1">
              <div>
                顯示項次：<span class="text-primary">11-20</span> │ 全部：<span
                  class="text-primary"
                  >223</span
                >
              </div>
              <div>
                <button
                  type="submit"
                  class="btn btn-success"
                  data-toggle="modal"
                  data-target="#addnew"
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
                    <th>功能</th>
                  </tr>
                </thead>
                <tr>
                  <td>1</td>
                  <td></td>
                  <td></td>
                  <td>
                    <a href="#" class="btn btn-primary"
                      ><i class="fas fa-pen"></i>編輯</a
                    >
                    <a class="btn btn-danger"
                      ><i class="fas fa-trash-alt"></i>刪除</a
                    >
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td></td>
                  <td></td>
                  <td>
                    <a href="#" class="btn btn-primary"
                      ><i class="fas fa-pen"></i>編輯</a
                    >
                    <a class="btn btn-danger"
                      ><i class="fas fa-trash-alt"></i>刪除</a
                    >
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td></td>
                  <td></td>
                  <td>
                    <a href="#" class="btn btn-primary"
                      ><i class="fas fa-pen"></i>編輯</a
                    >
                    <a class="btn btn-danger"
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
};
</script>
