$(function(){

  function buildHTML(message){
    if (message.image) {
      let html = `<div class="MessageList__messageBox" data-message-id=${message.id}>
                    <div class="MessageList__name">
                    ${message.user_name}
                      <div class="MessageList__date">
                      ${message.created_at}
                      </div>
                    </div>
                    <p class="MessageList__message">
                    ${message.body}
                    </p>
                    <img class="Message__image" src="${message.image}">
                  </div>`
       return html;
    } else {
      let html = `<div class="MessageList__messageBox" data-message-id=${message.id}>
                    <div class="MessageList__name">
                    ${message.user_name}
                      <div class="MessageList__date">
                      ${message.created_at}
                      </div>
                    </div>
                    <p class="MessageList__message">
                    ${message.body}
                    </p>
                  </div>`
      return html;
    };
  }
  $(".Form").on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.MessageList').append(html);
      $('.Form')[0].reset();
      $('.MessageList').animate({ scrollTop: $('.MessageList')[0].scrollHeight});
      $('.Form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('.Form__submit').prop('disabled', false);
    });
  });
});