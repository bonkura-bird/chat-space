$(function(){
  function addUser(user){
    let html = `
                <div class="ChatMember clearfix">
                  <p class="ChatMember__name">${user.name}</p>
                  <div class="ChatMember__add ChatMember__button" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>
                `;
    $("#UserSearchResult").append(html);
  }

  function  addNoUser(){
    let html = `
                <div class="ChatMember clearfix">
                  <p class="ChatMember__name">ユーザーが見つかりません</p>
                </div>
                `;
    $("#UserSearchResult").append(html);
  }

  function  migrateUser(userName, userId){
    let html = `
                <div class="ChatMember">
                  <p class="ChatMember__name">${userName}</p>
                  <input name="group[user_ids][]" type="hidden" value="${userId}" />
                  <div class="ChatMember__remove ChatMember__button">削除</div>
                </div>
                `;
  $(".ChatMembers").append(html)
  console.log(group[user_ids]);
}

  $("#UserSearch__field").on("keyup", function() {
    let input = $("#UserSearch__field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#UserSearchResult").empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          addUser(user);
        });
      }else if (input.length == 0) {
        return false;
      } else {
        addNoUser();
      }
    })
    .fail(function() {
      alert("通信エラーです。ユーザーが表示できません。");
    });
  })

  $("#UserSearchResult").on("click", ".ChatMember__add", function(){
    $(this).parent().remove(".ChatMember");
    let userName = $(this).data("user-name");
    let userId = $(this).data("user-id");
    migrateUser(userName, userId);
  });
});