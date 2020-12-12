$(function(){
  $("#UserSearch__field").on("keyup", function(){
    let input = $("#UserSearch__field").val();
    $.ajax({
      type: "GET",    //HTTPメソッド
      url: "/users",       //users_controllerの、indexアクションにリクエストの送信先を設定する
      dataType: 'json',
      data: input
    })
    .done(function(users) {
      console.log("clear");
    })
    .fail(function() {
      console.log("not clear");
    });
  })
});