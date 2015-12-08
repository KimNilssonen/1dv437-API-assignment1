"use strict";
var auth = {
    
  CLIENT_ID:'689705054643-gcua6k348mvtk949m1nmj67lf12aqhss.apps.googleusercontent.com',
  
  SCOPES:['https://mail.google.com/'],
  
   checkAuth:function() {
    gapi.auth.authorize(
      {
        'client_id':auth.CLIENT_ID,
        'scope': auth.SCOPES.join(' '),
        'immediate': true
      }, auth.handleAuthResult);
  },
  
    handleAuthClick:function(event) {
    gapi.auth.authorize(    
      {client_id: auth.CLIENT_ID, scope: auth.SCOPES, immediate: false, authuser:""},
      auth.handleAuthResult);
    return false;
  },

  /**
   * Handle response from authorization server.
   *
   * @param {Object} authResult Authorization result.
   */
  handleAuthResult:function(authResult) {
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error)
    {
      // Hide auth UI, then load client library.
      authorizeDiv.style.display = 'none';
      mail.loadGmailApi();
      //mailMap.main();
    } 
    else 
    {
      // Show auth UI, allowing the user to initiate authorization by
      // clicking authorize button.
      authorizeDiv.style.display = 'inline';
    }
  },

};