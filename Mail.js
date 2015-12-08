"use strict";
var mail = {

   loadGmailApi: function() {
      gapi.client.load('gmail', 'v1', mail.getLabels);
   },

   getMessages: function(label) {

      var request = gapi.client.gmail.users.messages.list({
         'userId': 'me',
         'labelIds': label.id,
      });
      request.execute(function(resp) {
         for (var i = 0; i < resp.messages.length; i++) {
            var message = resp.messages[i];
            var request = gapi.client.gmail.users.messages.get({
               'userId': 'me',
               'id': message.id
            });
            request.execute(function(response) {
            var message = response.payload.parts[1].body.data;
               
            if(message === undefined)
            {
              message = response.payload.parts[0].parts[1].body.data;
            }
               
            message = window.atob(message.replace(/-/g, '+').replace(/_/g, '/'));
            
            var nameOfLabel = label.name;
            var mailContent = {
               subject:response.payload.headers[16].value,
               messageText: message,
            };
               
               googleMaps.startGeo(label, mailContent);
            });
         }
      });
      
   },

   getLabels: function() {
      var request = gapi.client.gmail.users.labels.list({
         'userId': 'me'
      });

      request.execute(function(resp) {
         if (resp.labels && resp.labels.length > 0) {
            for (var i = 0; i < resp.labels.length; i++) {
               if (resp.labels[i].name.indexOf("Location/") > -1) {
                  mail.getMessages(resp.labels[i]);
               }
            }
         }
      });
   },
};