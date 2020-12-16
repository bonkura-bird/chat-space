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
        $('.MessageList').animate({ scrollTop: $('.MessageList')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };

  setInterval(reloadMessages, 7000);
});