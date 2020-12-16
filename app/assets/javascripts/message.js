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
  let reloadMessages = function() {
    let last_message_id = $('.MessageList__messageBox:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.MessageList').append(insertHTML)
      }
    })
    .fail(function() {
      alert('error');
    });

  };
  $(function() {
    setInterval(reloadMessages, 7000);
  });
});