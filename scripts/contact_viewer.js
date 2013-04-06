// Get all the contacts.
$.get('http://contacts.tinyapollo.com/contacts?key=letitbe',
function(data) {
  var contacts = data.contacts
  for(var i = 0; i < contacts.length; i++) {
    // Add each contact to the list.
    $('#contactList').append('<li data-role="listitem"><a href="ContactDetail.html?id=' + contacts[i]._id + '">' + contacts[i].name + '</a></li>')
  }
},
'json')